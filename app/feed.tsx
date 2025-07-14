import React from 'react';
import { ScrollView, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/CustomText';
import BottomNav from '@/components/BottomNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const profiles = [
  { name: 'Sarah', age: 40, img: require('../assets/images/profile1.png') },
  { name: 'Mark', age: 50, img: require('../assets/images/profile2.png') },
  { name: 'Emily', age: 30, img: require('../assets/images/profile3.png') },
  { name: 'David', age: 60, img: require('../assets/images/profile4.png') },
];

const categories = ['Newly Diagnosed', 'In Treatment', 'Survivors'];

const stories = [
  {
    name: "Emily's Story",
    type: 'Breast Cancer',
    detail: 'Stage 2, Chemotherapy',
    img: require('../assets/images/emily.png'),
  },
  {
    name: "David's Journey",
    type: 'Lung Cancer',
    detail: 'Stage 3, Radiation Therapy',
    img: require('../assets/images/david.png'),
  },
  {
    name: "Maria's Fight",
    type: 'Leukemia',
    detail: 'Remission, Post-Treatment',
    img: require('../assets/images/maria.png'),
  },
];

const FeedScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#0D141C" />
        </TouchableOpacity>
        <CustomText style={styles.headerTitle}>Inspiring Stories</CustomText>
      </View>

      <View style={styles.content}>
        {/* Horizontal Profiles */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profileScroll}>
          {profiles.map((profile, idx) => (
            <View key={idx} style={styles.profileItem}>
              <Image source={profile.img} style={styles.profileImage} />
              <CustomText style={styles.profileName}>{profile.name}, {profile.age}</CustomText>
            </View>
          ))}
        </ScrollView>

        {/* Categories */}
        <CustomText style={styles.sectionTitle}>Categories</CustomText>
        <View style={styles.categoryContainer}>
          {categories.map((category, idx) => (
            <TouchableOpacity key={idx} style={styles.categoryButton}>
              <CustomText style={styles.categoryText}>{category}</CustomText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stories */}
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 180 }} 
            >
            {stories.map((story, idx) => (
                <View key={idx} style={styles.storyCard}>
                <View style={styles.storyRow}>
                    <View style={styles.storyTextBlock}>
                    <CustomText style={styles.storyType}>{story.type}</CustomText>
                    <CustomText style={styles.storyTitle}>{story.name}</CustomText>
                    <CustomText style={styles.storyDetail}>{story.detail}</CustomText>
                    </View>
                    <Image source={story.img} style={styles.storyImage} />
                </View>
                </View>
            ))}
        </ScrollView>
      </View>

      {/* CTA Button */}
      <TouchableOpacity style={styles.shareButton} onPress={() => router.push('/createPost')}>
        <CustomText style={styles.shareButtonText}>Share Your Story</CustomText>
      </TouchableOpacity>

      <BottomNav />
    </SafeAreaView>
  );
};

export default FeedScreen;

export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 18,
    marginBottom: 16,
  },
  headerIcon: {
    position: 'absolute',
    left: 16,
    top: 0,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#0D141C',
    marginBottom: 4,
  },
  profileScroll: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  profileItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  profileImage: {
    width: 120,
    height: 200,
    borderRadius: 16,
    marginBottom: 6,
  },
  profileName: {
    fontSize: 14,
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
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#0D141C',
  },
  storyCard: {
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

    storyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

    storyTextBlock: {
    flex: 1,
    paddingRight: 12,
  },

    storyImage: {
    width: 120,
    height: 60,
    borderRadius: 12,
  },
  storyContent: {
    flex: 1,
  },
  storyType: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: 2,
  },
  storyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 2,
  },
  storyDetail: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  shareButton: {
    position: 'absolute',
    bottom: 100,
    right : 20,
    alignSelf: 'center',
    backgroundColor: '#908DDC',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 24,
    zIndex: 10,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
