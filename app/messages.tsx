import React from 'react';
import { ScrollView, View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const userMessages = [
  {
    name: 'Dr. Emily Carter',
    meta: "Hi, I'm here to help you with any questions or concerns you may have",
    img: require('../assets/images/user1.png'),
    route: null,
  },
  {
    name: 'Liam Harper',
    meta: "I'm feeling a bit overwhelmed with all the information. Can you help me",
    img: require('../assets/images/user2.png'),
    route: null,
  },
  {
    name: 'Sophia Bennett',
    meta: "I've been experiencing some side effects. Is this normal?",
    img: require('../assets/images/user3.png'),
    route: null,
  },
  {
    name: 'Noah Thompson',
    meta: "I'm having trouble keeping track of my appointments and medications.",
    img: require('../assets/images/user4.png'),
    route: null,
  },
];

const supportUser = {
  name: 'Dr. Olivia Reed',
  meta: "I'm here to help you with any questions or concerns you may have",
  img: require('../assets/images/support_user1.png'),
  route: null,
};

const MessagesScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style = {styles.headerIcon} onPress={() => router.push('/groups')}>
            <Ionicons name="arrow-back" size={24} color="#0D141C" />
          </TouchableOpacity>
          <CustomText style={styles.headerTitle}>Messages</CustomText>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            placeholder="Search Messages"
            placeholderTextColor="#6B7280"
            style={styles.searchInput}
          />
        </View>

        {/* User Messages */}
        {userMessages.map((user, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.userCard}
            onPress={() => {
              if (user.route) {
                router.push(user.route as any);
              }
            }}>
            <Image source={user.img} style={styles.userImage} />
            <View style={{ flex: 1 }}>
              <CustomText style={styles.userTitle}>{user.name}</CustomText>
              <CustomText style={styles.userMeta}>{user.meta}</CustomText>
            </View>
            <View style={styles.greenDot} />
          </TouchableOpacity>
        ))}

        {/* Support Buddy Section */}
        <CustomText style={styles.sectionTitle}>Support Buddy</CustomText>
        <TouchableOpacity style={styles.userCard}>
          <Image source={supportUser.img} style={styles.userImage} />
          <View style={{ flex: 1 }}>
            <CustomText style={styles.userTitle}>{supportUser.name}</CustomText>
            <CustomText style={styles.userMeta}>{supportUser.meta}</CustomText>
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={28} color="#fff" />
        <CustomText style={styles.createChatText}>Start New Conversation</CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MessagesScreen;

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
    left: 0,
    top: 0
  },
  createChatText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 2,
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
    borderRadius: 8,
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    gap: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 2,
  },
  userMeta: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34D399',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 26,
    height: 56,
    borderRadius: 28,
    paddingHorizontal : 16,
    backgroundColor: '#908DDC',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});
