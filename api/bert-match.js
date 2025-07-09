process.env.TRANSFORMERS_CACHE = '/tmp/transformers_cache';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { pipeline } from '@xenova/transformers';
import usCities from './usCities.js';

let model = null;
let trialEmbeddings = null;
let trialsMap = null;

async function initializeMatcher() {
  if (model && trialEmbeddings && trialsMap) {
    return; // Already initialized
  }

  // Load the model
  model = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

  // Load pre-computed trial embeddings
  const embeddingsPath = path.join(process.cwd(), 'trial_embeddings.json');
  const embeddingsData = fs.readFileSync(embeddingsPath, 'utf8');
  trialEmbeddings = JSON.parse(embeddingsData);

  // Load trial data to map Trial ID back to trial info
  const csvPath = path.join(process.cwd(), 'trials.csv');
  const csvData = fs.readFileSync(csvPath, 'utf8');
  const parsed = Papa.parse(csvData, { header: true, skipEmptyLines: true });
  
  trialsMap = new Map();
  for (const trial of parsed.data) {
    trialsMap.set(trial["Trial ID"], trial);
  }

  // Add logging
  console.log('Backend working directory:', process.cwd());
  console.log('Loaded trials:', trialsMap.size);
  console.log('Loaded embeddings:', Object.keys(trialEmbeddings).length);
  console.log('First 5 embedding keys:', Object.keys(trialEmbeddings).slice(0, 5));
  console.log('First 5 trial IDs:', Array.from(trialsMap.keys()).slice(0, 5));
}

function meanPool(embeddings) {
  const avg = new Array(embeddings[0].length).fill(0);
  for (const vec of embeddings) {
    for (let d = 0; d < vec.length; d++) {
      avg[d] += vec[d];
    }
  }
  for (let d = 0; d < avg.length; d++) {
    avg[d] /= embeddings.length;
  }
  return avg;
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Helper: get city coordinates
function getCityCoords(city, state) {
  if (!city || !state) return null;
  const match = usCities.find(
    c => c.name.toLowerCase() === city.toLowerCase() && c.state.toLowerCase() === state.toLowerCase()
  );
  return match ? { lat: match.lat, lon: match.lon } : null;
}

// Haversine formula
function haversineDistance(lat1, lon1, lat2, lon2) {
  function toRad(x) { return x * Math.PI / 180; }
  const R = 3958.8; // miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { patientDescription } = req.body;
    if (!patientDescription) {
      return res.status(400).json({ error: 'Patient description is required' });
    }

    await initializeMatcher();

    // Compute patient embedding
    const patientEmbeddingTokens = await model(patientDescription, { pooling: 'mean', normalize: true });
    const patientEmbedding = patientEmbeddingTokens.data;
    
    const nctIds = Object.keys(trialEmbeddings);
    console.log('First 5 nctIds used for matching:', nctIds.slice(0, 5));

    // Compute similarities
    const similarities = nctIds.map(nctId => {
        const trialEmbedding = trialEmbeddings[nctId];
        return cosineSimilarity(patientEmbedding, trialEmbedding);
    });

    // Get all matches with positive similarity, sorted by score
    // Use different thresholds based on the input type
    // History method (short text) gets lower threshold, manual method (detailed) gets higher threshold
    const isHistoryMethod = !req.body.manualData || Object.keys(req.body.manualData).length === 0;
    const SIMILARITY_THRESHOLD = 0.6;
    const allResults = similarities
      .map((score, idx) => ({ score, idx }))
      .filter(item => item.score >= SIMILARITY_THRESHOLD)
      .sort((a, b) => b.score - a.score);

    console.log(`Total trials processed: ${similarities.length}`);
    console.log(`Trials above threshold ${SIMILARITY_THRESHOLD}: ${allResults.length}`);
    if (allResults.length > 0) {
      console.log('Top 3 similarity scores:', allResults.slice(0, 3).map(r => r.score));
    }

    // Extract location and travel distance from request (if present)
    let userCity = null, userState = null, userCountry = null, userTravel = null;
    if (req.body && req.body.manualData) {
      userCity = req.body.manualData.city;
      userState = req.body.manualData.state;
      userCountry = req.body.manualData.country;
      userTravel = req.body.manualData.travelDistance;
    }

    // Get user coordinates
    const userCoords = getCityCoords(userCity, userState);

    // Debug logging
    console.log('User input:', { userCity, userState, userCountry, userCondition: req.body?.manualData?.condition });
    if (userCoords) {
      console.log('User coordinates:', userCoords);
    } else {
      console.log('User coordinates not found for', userCity, userState);
    }

    let matches = allResults.map(item => {
        const nctId = nctIds[item.idx];
        const trial = trialsMap.get(nctId);
        if (!trial) return null;
        // Debug: print the raw trial object and Location field
        console.log('Raw trial object:', trial);
        console.log('Location field:', trial["Location"]);
        // Extract trial city/state from Location (assume format: City, State, ...)
        let trialCity = null, trialState = null;
        if (trial["Location"]) {
          const locParts = trial["Location"].split(",").map(s => s.trim());
          if (locParts.length >= 2) {
            trialCity = locParts[0];
            trialState = locParts[1];
          }
        }
        let dist = null;
        if (userCoords && trialCity && trialState) {
          const trialCoords = getCityCoords(trialCity, trialState);
          if (trialCoords) {
            dist = haversineDistance(userCoords.lat, userCoords.lon, trialCoords.lat, trialCoords.lon);
          }
        }
        return {
          trialId: trial["Trial ID"] || '',
          condition: trial["Cancer Type"] || '',
          trialName: trial["Trial Name"] || '',
          location: trial["Location"] && trial["Location"].trim() ? trial["Location"] : 'Not specified',
          contactInfo: trial["Contact Info"] || '',
          status: trial["Status"] || '',
          distance: dist
        };
    }).filter(Boolean);
    // Sort by condition match first, then by distance
    matches = matches.sort((a, b) => {
      const userCondition = (req.body?.manualData?.condition || '').toLowerCase().trim();
      const aCondition = (a.condition || '').toLowerCase().trim();
      const bCondition = (b.condition || '').toLowerCase().trim();
      
      // Check if conditions match exactly
      const aExactMatch = aCondition === userCondition;
      const bExactMatch = bCondition === userCondition;
      
      // If one has exact match and other doesn't, prioritize exact match
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      
      // If both have same match status, sort by distance (if location provided) or similarity score
      if (userCoords) {
        return (a.distance ?? 99999) - (b.distance ?? 99999);
      } else {
        return b.score - a.score;
      }
    });

    // Filter by condition if provided, then return matches
    let finalMatches = matches;
    if (req.body?.manualData?.condition) {
      const userCondition = req.body.manualData.condition.toLowerCase().trim();
      finalMatches = matches.filter(trial => {
        const trialCondition = (trial.condition || '').toLowerCase().trim();
        return trialCondition.includes(userCondition) || userCondition.includes(trialCondition);
      });
    }

    console.log('Number of matches returned:', finalMatches.length);
    return res.json({ matches: finalMatches });

  } catch (error) {
    console.error('Error in bert-match endpoint:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
} 