import React from 'react';
import { ScrollView, View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomText from '@/components/CustomText';
import BottomNav from '@/components/BottomNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

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
    route: null
  },
  {
    profileName: 'Side Effect Management',
    postContent: 'Share experiences and tips for managing side effects',
    likes: '45',
    comments: '12',
    route: null
  },
];

const GroupScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <CustomText style={styles.headerTitle}>Community</CustomText>
          <TouchableOpacity style={styles.headerIcon} onPress={() => router.push('/messages')}>
            <MaterialCommunityIcons name="comment-text-outline" size={24} color="#0D141C" /> 
          </TouchableOpacity>
	        
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
        {suggestedData.map((suggested, idx) => {
          
          return(
            <TouchableOpacity 
              key={idx}
              style = {styles.suggestedCard}
              onPress = {() => {
                if (suggested.route) {
                  router.push(suggested.route as any);
                }
              }}>

              <View style = {styles.suggestedIcon}>
                <Ionicons name = 'people-outline' size = {28} color= "#0D141C"/>
              </View>

              <View style={{ flex: 1 }}>
                <CustomText style={styles.suggestedTitle}>{suggested.profileName}</CustomText>
                <CustomText style={styles.suggestedMeta}>{`${suggested.postContent}`}</CustomText>
              </View>
            </TouchableOpacity>
          );
        })}

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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginTop: 18,
      marginBottom: 10,
  },
  headerIcon : {
    position: 'absolute',
    paddingLeft: 16,
    paddingRight: 16,
    right: 0,
    top: 0
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
    borderRadius: 24,
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
    gap: 10
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
  suggestedIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#E8EDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 
