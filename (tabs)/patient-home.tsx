import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width } = Dimensions.get('window');

const cancerCategories = [
  { label: 'Breast Cancer', trials: 18, icon: 'heart.fill', bg: '#FDECEF' },
  { label: 'Lung Cancer', trials: 12, icon: 'lungs.fill', bg: '#E8F5E9' },
  { label: 'Prostate Cancer', trials: 10, icon: 'person.fill', bg: '#E3F2FD' },
  { label: 'Skin Cancer', trials: 8, icon: 'sun.max.fill', bg: '#FFF3E0' },
];

export default function PatientHome() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <IconSymbol name="person.crop.circle.fill" size={48} color="#3949AB" />
        </View>
        <View>
          <Text style={styles.welcome}>Hello,</Text>
          <Text style={styles.username}>Manavi</Text>
        </View>
      </View>

      {/* Category */}
      <Text style={styles.sectionTitle}>Select Cancer Type</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
        {cancerCategories.map((cat, idx) => (
          <View key={idx} style={[styles.categoryCard, { backgroundColor: cat.bg }]}> 
            <IconSymbol name={cat.icon} size={32} color="#3949AB" style={{ marginBottom: 8 }} />
            <Text style={styles.categoryLabel}>{cat.label}</Text>
            <Text style={styles.categoryCount}>{cat.trials} trials</Text>
          </View>
        ))}
      </ScrollView>

      {/* Match Me Card */}
      <Text style={styles.sectionTitle}>Match with a Trial</Text>
      <View style={styles.matchCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.matchTitle}>Personalized Trial Matching</Text>
          <Text style={styles.matchSubtitle}>
            Get connected with the most suitable ongoing cancer clinical trials
          </Text>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => router.push('/(tabs)/matchme')}
          >
            <Text style={styles.registerText}>Match Me Now</Text>
          </TouchableOpacity>
        </View>
        <IconSymbol name="stethoscope" size={64} color="#3949AB" style={styles.doctorIcon} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E8EAF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  welcome: {
    fontSize: 16,
    color: '#888',
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  categoryCard: {
    marginRight: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: 140,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 13,
    color: '#666',
  },
  matchCard: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#E8EAF6',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  matchSubtitle: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  registerBtn: {
    backgroundColor: '#3949AB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  registerText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  doctorIcon: {
    marginLeft: 12,
  },
}); 