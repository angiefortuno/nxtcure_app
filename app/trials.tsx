import React from 'react';
import { ScrollView, View, TextInput, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/CustomText';
import BottomNav from '@/components/BottomNav';
import { SafeAreaView } from 'react-native-safe-area-context';

const trialsData = [
  {
    title: 'Trial for Lung Cancer',
    match: '85% match',
    distance: '10 miles',
    phase: 'Phase 3',
    img: require('../assets/images/patient.png'),
  },
  {
    title: 'Trial for Breast Cancer',
    match: '80% match',
    distance: '15 miles',
    phase: 'Phase 2',
    img: require('../assets/images/caregiver.png'),
  },
  {
    title: 'Trial for Colon Cancer',
    match: '75% match',
    distance: '20 miles',
    phase: 'Phase 1',
    img: require('../assets/images/overview.png'),
  },
];

const categories = [
  { label: 'By Cancer Type', icon: 'medkit-outline' },
  { label: 'By Location', icon: 'location-outline' },
  { label: 'By Phase', icon: 'git-network-outline' },
];

const buttons = [
  'View All Recommendations',
  'My Applications',
  'My Trial Messages',
];

const ClinicalTrialsScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Ionicons name="location-outline" size={20} color="#4B5563" />
          <CustomText style={styles.headerTitle}>Clinical Trials</CustomText>
          <Ionicons name="options-outline" size={20} color="#4B5563" />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Search by trial name"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        {/* Recommended for You */}
        <CustomText style={styles.sectionTitle}>Recommended for You</CustomText>
        {trialsData.map((trial, idx) => (
          <View key={idx} style={styles.trialCard}>
            <View style={{ flex: 1 }}>
              <CustomText style={styles.trialTitle}>{trial.title}</CustomText>
              <CustomText style={styles.trialMeta}>{`${trial.match} · ${trial.distance} · ${trial.phase}`}</CustomText>
            </View>
            <Image
              source={trial.img}
              style={styles.trialImage}
              resizeMode="cover"
            />
          </View>
        ))}

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          {buttons.map((label, idx) => (
            <TouchableOpacity key={idx} style={styles.actionButton}>
              <CustomText style={styles.actionButtonText}>{label}</CustomText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Categories */}
        <CustomText style={styles.sectionTitle}>Categories</CustomText>
        <View style={styles.categoriesRow}>
          {categories.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.categoryButton}>
              <Ionicons name={item.icon as any} size={18} color="#4B5563" style={{ marginRight: 8 }} />
              <CustomText style={styles.categoryLabel}>{item.label}</CustomText>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
};

export default ClinicalTrialsScreen;

export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 24,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 12,
  },
  trialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  trialTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 2,
  },
  trialMeta: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  trialImage: {
    height: 48,
    width: 80,
    borderRadius: 12,
    marginLeft: 12,
  },
  buttonGroup: {
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginRight: 8,
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 15,
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Regular',
    fontWeight: '500',
  },
}); 