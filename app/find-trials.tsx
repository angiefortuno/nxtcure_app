import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomText from '@/components/CustomText';
import BottomNav from '@/components/BottomNav';

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
    <SafeAreaView style={styles.container}>
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
        <CustomText style={styles.sortText}>
          Sort by <CustomText style={styles.sortLink}>Relevance</CustomText>
        </CustomText>
      </View>

      {/* Trial List */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 20, flexGrow: 1 }}>
        {trials.map((trial, index) => (
          <TouchableOpacity key={index} style={styles.trialItem} onPress={() => router.push('/trial-details')}>
            <View>
              <CustomText style={styles.trialTitle}>{trial.name}</CustomText>
              <CustomText style={styles.trialHospital}>Hospital: {trial.hospital}</CustomText>
            </View>
            <CustomText style={styles.matchPercent}>{trial.match}%</CustomText>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomNav activeTab="/trials" />
    </SafeAreaView>
  );
}

export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingLeft:10,
    paddingRight:10,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#181A20',
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
    flex: 1,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    padding: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 18,
    marginHorizontal: 0,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 18,
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
    fontFamily: 'PlusJakartaSans-Regular',
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    marginHorizontal: 0,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#181A20',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  sortText: {
    fontSize: 15,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'right',
  },
  sortLink: {
    color: '#59738C',
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  trialList: {
    paddingHorizontal: 20,
  },
  trialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  trialTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#181A20',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  trialHospital: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  matchPercent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'PlusJakartaSans-Bold',
  },
}); 