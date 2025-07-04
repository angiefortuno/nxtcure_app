import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Welcome to NxtCure</ThemedText>
        <ThemedText type="subtitle">Your health journey, managed.</ThemedText>
      </View>

      <View style={styles.content}>
        <ThemedView style={styles.card}>
          <ThemedText type="defaultSemiBold">Your Dashboard</ThemedText>
          <ThemedText>This is where your personalized content will appear.</ThemedText>
        </ThemedView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#f4f4f8',
  },
  header: {
    marginBottom: 24,
  },
  content: {
    flex: 1,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
});
