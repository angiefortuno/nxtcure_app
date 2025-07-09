import React from 'react';
import { ScrollView, View, TextInput, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '@/components/CustomText';
import BottomNav from '@/components/BottomNav';
import { SafeAreaView } from 'react-native-safe-area-context';

const trendingData = [
  {
    profileName: 'Liam Carter',
    postContent: 'Just Finished my first round of chemo! Feeling a bit tired but optimisti. Thanks for all the support!',
    likes: '23',
    comments: '5',
    img: require('../assets/images/patient.png'),
  },
  {
    profileName: 'Sophia Bennett',
    postContent: 'Celebrating 6 months in remission! This joureny has been tough, but I am grateful for every day.',
    likes: '45',
    comments: '12',
    img: require('../assets/images/caregiver.png'),
  },
  {
    profileName: 'Ethan Walker',
    postContent: 'Sharing a photo from my recent hike. Nature has been my therapy during this process. Stay strong, everyone!',
    likes: '38',
    comments: '3',
    img: require('../assets/images/overview.png'),
  },
];

const categories = [
  { label: 'By Cancer Type', icon: 'medkit-outline' },
  { label: 'By Location', icon: 'location-outline' },
  { label: 'By Phase', icon: 'git-network-outline' },
];

const buttons = [
  'Share your Story',
  'View Stories',
];


const suggestedData = [
  {
    profileName: 'Treatment Support',
    postContent: 'Connect with others undergoing similar treatments',
    likes: '23',
    comments: '5',
    img: require('../assets/images/patient.png'),
  },
  {
    profileName: 'Side Effect Management',
    postContent: 'Share experiences and tips for managing side effects',
    likes: '45',
    comments: '12',
    img: require('../assets/images/caregiver.png'),
  },
];

const GroupScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <CustomText style={styles.headerTitle}>Community</CustomText>
	{/*TODO: Change to Chat Icon   <Ionicons name="options-outline" size={20} color="#4B5563" /> */}
                 </View>

        {/* Trending Feed */}
        {trendingData.map((trending, idx) => (
          <View key={idx} style={styles.trendingCard}>
            <View style={{ flex: 1 }}>
              <CustomText style={styles.trendingTitle}>{trending.profileName}</CustomText>
              <CustomText style={styles.trendingMeta}>{`${trending.postContent} \n ${trending.likes} · ${trending.comments}`}</CustomText>
            </View>
            <Image
              source={trending.img}
              style={styles.trendingImage}
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

        {/* Suggested Groups */}
        <CustomText style={styles.sectionTitle}>Suggested Groups</CustomText>
        {/* Trending Feed */}
        {suggestedData.map((suggested, idx) => (
          <View key={idx} style={styles.suggestedCard}>
            <Image
              source={suggested.img}
              style={styles.suggestedImage}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <CustomText style={styles.suggestedTitle}>{suggested.profileName}</CustomText>
              <CustomText style={styles.suggestedMeta}>{`${suggested.postContent}`}</CustomText>
            </View>
          </View>
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
};

export default GroupScreen;

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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 12,
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
  trendingCard: {
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
  trendingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 2,
  },
  trendingMeta: {
    fontSize: 15,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  trendingImage: {
    height: 120,
    width: 120,
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
    backgroundColor: '#908DDC',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
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
  suggestedCard: {
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
  suggestedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 2,
  },
  suggestedMeta: {
    fontSize: 15,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  suggestedImage: {
    height: 70,
    width: 70,
    borderRadius: 12,
    marginLeft: 12,
  },
}); 
