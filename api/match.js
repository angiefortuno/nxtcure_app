import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import usCities from './usCities.js';

const FALLBACK_KEYWORDS = [
    'heart', 'cardiac', 'cardiovascular', 'failure', 'disease', 'attack',
    'arrhythmia', 'fibrillation', 'coronary', 'artery', 'valve', 'chamber',
    'ventricle', 'atrium', 'myocardial', 'infarction', 'angina', 'hypertension',
    'blood pressure', 'cholesterol', 'diabetes', 'obesity', 'smoking'
];

function extractKeywords(text) {
    const words = text.toLowerCase().split(/\s+/);
    return words.filter(word => 
        FALLBACK_KEYWORDS.some(keyword => 
            word.includes(keyword) || keyword.includes(word)
        )
    );
}

function simpleKeywordMatch(patientDescription, trialsData) {
    const patientKeywords = extractKeywords(patientDescription);
    const matches = [];
    
    for (const trial of trialsData) {
        const trialText = [
            trial.Condition || '',
            trial.BriefTitle || '',
            trial.BriefSummary || '',
            trial.InclusionCriteria || ''
        ].join(' ').toLowerCase();
        
        const matchingKeywords = patientKeywords.filter(keyword =>
            trialText.includes(keyword)
        );
        
        if (matchingKeywords.length > 0) {
            const score = matchingKeywords.length / patientKeywords.length;
            matches.push({
                nct_id: trial.NCTId || null,
                title: trial.BriefTitle || null,
                condition: trial.Condition || null,
                summary: trial.BriefSummary || null,
                inclusion: trial.InclusionCriteria || null,
                exclusion: trial.ExclusionCriteria || null,
                country: trial.LocationCountry || null,
                status: trial.OverallStatus || null,
                phase: trial.Phase || null,
                enrollment: trial.EnrollmentCount || null,
                contact_name: trial.ContactName || null,
                contact_role: trial.ContactRole || null,
                contact_phone: trial.ContactPhone || null,
                contact_email: trial.ContactEmail || null,
                lead_sponsor: trial.LeadSponsor || null,
                sponsor_type: trial.SponsorType || null,
                similarity: score
            });
        }
    }
    
    return matches
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5);
}

// Haversine formula to calculate distance between two coordinates
function haversineDistance(lat1, lon1, lat2, lon2) {
  function toRad(x) { return x * Math.PI / 180; }
  const R = 3958.8; // Earth radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c); // Return rounded distance in miles
}

// Helper function to normalize city/state names for better matching
function normalizeLocation(location) {
    if (!location) return '';
    return location.toLowerCase()
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/[^\w\s]/g, ''); // Remove special characters
}

// Enhanced city coordinates lookup with better matching
function getCityCoords(city, state) {
    if (!city || !state) return null;
    
    const normalizedCity = normalizeLocation(city);
    const normalizedState = normalizeLocation(state);
    
    // First try exact match
    let match = usCities.find(c => 
        normalizeLocation(c.name) === normalizedCity && 
        normalizeLocation(c.state) === normalizedState
    );
    
    // If no exact match, try partial matches
    if (!match) {
        match = usCities.find(c => 
            normalizeLocation(c.name).includes(normalizedCity) || 
            normalizedCity.includes(normalizeLocation(c.name)) ||
            normalizeLocation(c.state).includes(normalizedState) ||
            normalizedState.includes(normalizeLocation(c.state))
        );
    }
    
    // If still no match, try state-only match for major cities
    if (!match && normalizedCity) {
        match = usCities.find(c => 
            normalizeLocation(c.state) === normalizedState &&
            (normalizeLocation(c.name).includes(normalizedCity) || 
                normalizedCity.includes(normalizeLocation(c.name)))
        );
    }
    
    return match ? { lat: match.lat, lon: match.lon } : null;
}

function enhancedKeywordMatch(patientDescription, trialsData) {
    const patientWords = patientDescription.toLowerCase().split(/\s+/);
    const matches = [];
    
    // Extract cancer type from patient description
    const cancerTypes = [
        'breast cancer', 'lung cancer', 'brain cancer', 'colon cancer', 'prostate cancer',
        'pancreatic cancer', 'stomach cancer', 'blood cancer', 'liver cancer', 'ovarian cancer',
        'cervical cancer', 'bladder cancer', 'kidney cancer', 'thyroid cancer', 'skin cancer',
        'melanoma', 'leukemia', 'lymphoma', 'multiple myeloma', 'sarcoma'
    ];
    
    const mentionedCancerType = cancerTypes.find(cancerType => 
        patientDescription.toLowerCase().includes(cancerType)
    );
    
    // Extract user location from patient description
    const locationMatch = patientDescription.match(/located in ([^,]+), ([^,]+)/i);
    let userCity = null, userState = null;
    if (locationMatch) {
        userCity = locationMatch[1].trim();
        userState = locationMatch[2].trim();
    }
    
    // Get user coordinates
    const userCoords = getCityCoords(userCity, userState);
    
    for (const trial of trialsData) {
        const trialText = [
            trial['Cancer Type'] || '',
            trial['Trial Name'] || '',
            trial['Location'] || '',
            trial['Status'] || ''
        ].join(' ').toLowerCase();
        
        const trialWords = trialText.split(/\s+/);
        
        let score = 0;
        let exactMatches = 0;
        let partialMatches = 0;
        
        for (const patientWord of patientWords) {
            if (patientWord.length < 3) continue;
            
            for (const trialWord of trialWords) {
                if (trialWord.length < 3) continue;
                
                if (patientWord === trialWord) {
                    exactMatches++;
                    score += 2;
                } else if (trialWord.includes(patientWord) || patientWord.includes(trialWord)) {
                    partialMatches++;
                    score += 1;
                }
            }
        }
        
        // Boost score for exact cancer type match
        if (mentionedCancerType && trial['Cancer Type'] && 
            trial['Cancer Type'].toLowerCase().includes(mentionedCancerType)) {
            score += 10; // Significant boost for exact cancer type match
        }
        
        // Penalize non-matching cancer types when a specific cancer type is mentioned
        if (mentionedCancerType && trial['Cancer Type'] && 
            !trial['Cancer Type'].toLowerCase().includes(mentionedCancerType)) {
            score = score * 0.1; // Reduce score significantly for non-matching cancer types
        }
        
        if (score > 0) {
            const normalizedScore = score / (patientWords.length * 2);
            
            // Calculate distance if we have user coordinates
            let distance = null;
            if (userCoords && trial['Location']) {
                const locationParts = trial['Location'].split(',').map(s => s.trim());
                if (locationParts.length >= 2) {
                    const trialCity = locationParts[0];
                    const trialState = locationParts[1];
                    const trialCoords = getCityCoords(trialCity, trialState);
                    if (trialCoords) {
                        distance = haversineDistance(userCoords.lat, userCoords.lon, trialCoords.lat, trialCoords.lon);
                    }
                }
            }
            
            matches.push({
                nct_id: trial['Trial ID'] || null,
                title: trial['Trial Name'] || null,
                condition: trial['Cancer Type'] || null,
                summary: '',
                inclusion: '',
                exclusion: '',
                country: trial['Location'] || null,
                status: trial['Status'] || null,
                phase: '',
                enrollment: '',
                contact_name: trial['Contact Info'] || null,
                contact_role: '',
                contact_phone: '',
                contact_email: '',
                lead_sponsor: '',
                sponsor_type: '',
                similarity: Math.min(normalizedScore, 1),
                distance: distance
            });
        }
    }
    
    // Filter out low-scoring matches when a specific cancer type is mentioned
    let filteredMatches = matches;
    if (mentionedCancerType) {
        filteredMatches = matches.filter(match =>
            match.condition && match.condition.toLowerCase().includes(mentionedCancerType)
        );
    }
    
    return filteredMatches
        .sort((a, b) => {
            // If both have distance, sort by distance first
            if (a.distance !== null && b.distance !== null) {
                return a.distance - b.distance;
            }
            // If only one has distance, prioritize the one with distance
            if (a.distance !== null && b.distance === null) {
                return -1;
            }
            if (a.distance === null && b.distance !== null) {
                return 1;
            }
            // If neither has distance, sort by similarity score
            return b.similarity - a.similarity;
        });
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { patientDescription, topK = 5, similarityThreshold = 0.3 } = req.body;
        
        if (!patientDescription) {
            return res.status(400).json({ error: 'Patient description is required' });
        }
        
        const csvPath = path.join(process.cwd(), 'trials.csv');
        
        if (!fs.existsSync(csvPath)) {
            console.error('Trials CSV file not found at:', csvPath);
            // Return a fallback response instead of crashing
            return res.status(200).json({
                matches: [
                    {
                        nct_id: "DEMO-001",
                        title: "Demo Clinical Trial for Cancer Treatment",
                        condition: "Cancer",
                        summary: "This is a demonstration trial. Please ensure trials.csv is properly deployed.",
                        inclusion: "Contact your administrator",
                        exclusion: "N/A",
                        country: "United States",
                        status: "Recruiting",
                        phase: "Phase 2",
                        enrollment: "100",
                        contact_name: "Demo Contact",
                        contact_role: "Study Coordinator",
                        contact_phone: "555-1234",
                        contact_email: "demo@example.com",
                        lead_sponsor: "Demo Sponsor",
                        sponsor_type: "Industry",
                        similarity: 0.8
                    }
                ],
                total_found: 1,
                method: 'fallback_demo',
                message: 'Using demo data - trials.csv not found on server'
            });
        }
        
        const trialsData = [];
        
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvPath)
                .pipe(csv())
                .on('data', (row) => trialsData.push(row))
                .on('end', resolve)
                .on('error', reject);
        });
        
        const matches = enhancedKeywordMatch(patientDescription, trialsData);
        
        const response = {
            matches: matches,
            total_found: matches.length,
            method: 'enhanced_keyword'
        };
        
        res.status(200).json(response);
        
    } catch (error) {
        console.error('Error in match endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
} 