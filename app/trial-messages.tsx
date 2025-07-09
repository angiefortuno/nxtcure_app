import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'expo-router';

const tabs = ['All', 'Documents', 'Appointments', 'Updates'];
const messages = [
  {
    name: 'Dr. Emily Carter',
    avatar: require('../assets/images/doctor1.png'),
    message: "Hi Sarah, I've attached the consent form for your review.",
    time: '10:30 AM',
  },
  {
    name: 'Dr. Michael Chen',
    avatar: require('../assets/images/doctor2.png'),
    message: 'Your next appointment is scheduled for Tuesday, July',
    time: 'Yesterday',
  },
  {
    name: 'Dr. Olivia Davis',
    avatar: require('../assets/images/doctor3.png'),
    message: 'Please submit the requested documents by the end of the',
    time: '2 days ago',
  },
  {
    name: 'Dr. David Lee',
    avatar: require('../assets/images/doctor4.png'),
    message: 'We have an update on your trial progress. Please check',
    time: '3 days ago',
  },
];

export default function TrialMessagesScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color="#181A20" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Trial Communications</Text>
        <Ionicons name="notifications-outline" size={22} color="#181A20" />
      </View>
      {/* Tabs */}
      <View style={styles.tabsRow}>
        {tabs.map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabBtn}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>
      {/* Messages List */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {messages.map((msg, idx) => (
          <View key={idx} style={styles.msgRow}>
            <Image source={msg.avatar} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.msgName}>{msg.name}</Text>
              <Text style={styles.msgText}>{msg.message}</Text>
            </View>
            <Text style={styles.msgTime}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Floating + Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={32} color="#59738C" />
      </TouchableOpacity>
      <BottomNav activeTab="/trials" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 16,

  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
    marginBottom: 20,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    borderBottomWidth: 1,
    borderColor: '#F1F4F6',
    paddingHorizontal: 0,
    justifyContent: 'space-between',
  },
  tabBtn: {
    alignItems: 'center',
    paddingBottom: 8,
    flex: 1,
  },
  tabText: {
    fontSize: 15,
    color: '#A0A3B1',
    fontFamily: 'PlusJakartaSans-Bold',
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#181A20',
  },
  tabUnderline: {
    width: 24,
    height: 3,
    backgroundColor: '#908DDC',
    borderRadius: 2,
    marginTop: 4,
  },
  msgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  msgName: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
    marginBottom: 2,
  },
  msgText: {
    fontSize: 14,
    color: '#59738C',
    fontFamily: 'PlusJakartaSans-Regular',
    marginBottom: 2,
    marginRight: 14,
  },
  msgTime: {
    fontSize: 13,
    color: '#A0A3B1',
    fontFamily: 'PlusJakartaSans-Regular',
    marginLeft: 12,
    alignSelf: 'flex-start',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F1F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
}); 