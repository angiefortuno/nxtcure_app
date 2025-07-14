import React, { useState, useEffect } from 'react';
import { ScrollView, View, TextInput, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '@/components/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BottomNav from '@/components/BottomNav';

// Backend URL
const BACKEND_URL = 'https://waterqueue.et.r.appspot.com';

// Type definitions
interface Trial {
  nct_id: string;
  title: string;
  condition: string;
  summary: string;
  inclusion: string;
  exclusion: string;
  country: string;
  status: string;
  phase: string;
  enrollment: string;
  contact_name: string;
  contact_role: string;
  contact_phone: string;
  contact_email: string;
  lead_sponsor: string;
  sponsor_type: string;
  similarity: number;
  distance?: number;
}

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
  const router = useRouter();
  const params = useLocalSearchParams();
  const [trialsData, setTrialsData] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get form data from URL parameters
  const cancerType = params.cancerType as string;
  const gender = params.gender as string;
  const state = params.state as string;
  const city = params.city as string;

  // Create patient description from form data
  const patientDescription = cancerType && gender && city && state 
    ? `Patient with ${cancerType} cancer, ${gender} gender, located in ${city}, ${state}`
    : "Patient with breast cancer, female gender, located in New York, New York"; // fallback

  useEffect(() => {
    fetchTrials();
  }, [patientDescription]);

  const fetchTrials = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientDescription }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setTrialsData(data.matches || []);
      } else {
        setError('Failed to fetch trials');
      }
    } catch (err) {
      setError('Network error');
      console.error('Error fetching trials:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDistance = (distance?: number): string => {
    if (!distance) return 'Distance N/A';
    return `${Math.round(distance)} miles`;
  };

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
            onSubmitEditing={() => router.push('/find-trials')}
          />
        </View>

        {/* Recommended for You */}
        <CustomText style={styles.sectionTitle}>Recommended for You</CustomText>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <CustomText style={styles.loadingText}>Loading trials...</CustomText>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <CustomText style={styles.errorText}>{error}</CustomText>
            <TouchableOpacity style={styles.retryButton} onPress={fetchTrials}>
              <CustomText style={styles.retryButtonText}>Retry</CustomText>
            </TouchableOpacity>
          </View>
        ) : trialsData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <CustomText style={styles.emptyText}>No trials found</CustomText>
          </View>
        ) : (
          trialsData.map((trial, idx) => (
            <TouchableOpacity key={idx} style={styles.trialCard} onPress={() => router.push('/trial-details')}>
              <View style={{ flex: 1 }}>
                <CustomText style={styles.trialTitle}>{trial.title}</CustomText>
                <CustomText style={styles.trialMeta}>
                  {`${formatDistance(trial.distance)} · ${trial.status || 'Status N/A'}`}
                </CustomText>
                {trial.condition && (
                  <CustomText style={styles.trialCondition}>{trial.condition}</CustomText>
                )}
              </View>
              <Image
                source={require('../assets/images/patient.png')}
                style={styles.trialImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))
        )}

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          {buttons.map((label, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.actionButton}
              onPress={label === 'My Applications' ? () => router.push('/my-applications') : label === 'My Trial Messages' ? () => router.push('/trial-messages') : undefined}
            >
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
    paddingTop: 16,
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
    fontWeight: '700',
    color: '#181A20',
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
    fontWeight: '700',
    color: '#181A20',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#181A20',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#181A20',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#007AFF',
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    fontFamily: 'PlusJakartaSans-Regular',
    marginBottom: 12,
  },
  retryButton: {
    padding: 14,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  trialCondition: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
  },
}); 