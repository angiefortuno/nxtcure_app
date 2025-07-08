import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';

export default function MatchMeScreen() {
  const [condition, setCondition] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [matches, setMatches] = useState<any[]>([]);

  const handleMatch = async () => {
    const userQuery = `${gender}, ${age}, ${condition}`;
    try {
      const response = await fetch('http://localhost:8000/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userQuery }),
      });
      const data = await response.json();
      setMatches(data.matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setMatches([]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Match Me with a Clinical Trial</Text>

      <TextInput
        style={styles.input}
        placeholder="Cancer type (e.g. lung, breast)"
        value={condition}
        onChangeText={setCondition}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Gender (male, female)"
        value={gender}
        onChangeText={setGender}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholderTextColor="#999"
      />

      <Button title="Find Trials" onPress={handleMatch} />

      {matches.length > 0 && (
        <Text style={styles.resultsText}>Found {matches.length} trials:</Text>
      )}

      <FlatList
        data={matches}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.BriefTitle}</Text>
            <Text style={styles.cardText}>
              {item.BriefSummary?.slice(0, 100) || 'No description available'}...
            </Text>
            <Text style={styles.cardLocation}>Location: {item.LocationCity || 'N/A'}, {item.LocationState || 'N/A'}</Text>
            <Text style={styles.cardPhase}>Phase: {item.Phase || 'N/A'}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  resultsText: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardText: {
    marginVertical: 4,
    color: '#555',
  },
  cardLocation: {
    fontSize: 12,
    color: '#666',
  },
  cardPhase: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
}); 