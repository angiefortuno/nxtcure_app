import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomText from '@/components/CustomText';

const trials = [
  { name: 'Trial for Breast Cancer', hospital: 'City Cancer Center', match: 95 },
  { name: 'Trial for Breast Cancer', hospital: 'Hope Medical Center', match: 92 },
  { name: 'Trial for Breast Cancer', hospital: 'City Cancer Center', match: 88 },
  { name: 'Trial for Breast Cancer', hospital: 'Hope Medical Center', match: 85 },
  { name: 'Trial for Breast Cancer', hospital: 'City Cancer Center', match: 82 },
  { name: 'Trial for Breast Cancer', hospital: 'Hope Medical Center', match: 78 },
];

export default function FindTrialsScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} color="#111827" onPress={() => router.push('/trials')} />
        <CustomText style={styles.headerTitle}>Find a trial</CustomText>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search by condition or keyword"
          style={styles.searchInput}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <View style={styles.filterPill}>
          <CustomText style={styles.filterText}>Breast Cancer</CustomText>
        </View>
        <View style={styles.filterPill}>
          <CustomText style={styles.filterText}>Stage 3</CustomText>
        </View>
      </View>

      {/* Result Count & Sort */}
      <View style={styles.sortRow}>
        <CustomText style={styles.resultsCount}>12 trials found</CustomText>
        <CustomText style={styles.sortText}>Sort by <CustomText style={{ fontWeight: '600', fontFamily: 'PlusJakartaSans-Bold' }}>Relevance</CustomText></CustomText>
      </View>

      {/* Trial List */}
      <ScrollView contentContainerStyle={styles.trialList}>
        {trials.map((trial, index) => (
          <View key={index} style={styles.trialItem}>
            <View>
              <CustomText style={styles.trialTitle}>{trial.name}</CustomText>
              <CustomText style={styles.trialHospital}>Hospital: {trial.hospital}</CustomText>
            </View>
            <CustomText style={styles.matchPercent}>{trial.match}%</CustomText>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Tab */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={22} color="#9CA3AF" />
          <CustomText style={styles.navLabel}>Home</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="flask" size={22} color="#111827" />
          <CustomText style={[styles.navLabel, styles.activeNavLabel]}>Trials</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={22} color="#9CA3AF" />
          <CustomText style={styles.navLabel}>Calendar</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people-outline" size={22} color="#9CA3AF" />
          <CustomText style={styles.navLabel}>Groups</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#9CA3AF" />
          <CustomText style={styles.navLabel}>Profile</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 10,
  },
  filterPill: {
    backgroundColor: '#F1F5F9',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  filterText: {
    fontSize: 14,
    color: '#111827',
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  sortText: {
    fontSize: 14,
    color: '#6B7280',
  },
  trialList: {
    paddingBottom: 90,
  },
  trialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  trialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  trialHospital: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  matchPercent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  activeNavLabel: {
    color: '#111827',
    fontWeight: '600',
  },
}); 