import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs = ['All', 'Pending', 'Accepted', 'Declined'];
const applications = [
  {
    status: 'Pending',
    title: 'Lung Cancer Trial CA',
    next: 'Screening',
    date: '07/15/2024',
    img: require('../assets/images/scan-1.png'),
  },
  {
    status: 'Accepted',
    title: 'Lung Cancer Trial NJ',
    next: 'Enrollment',
    date: '06/20/2024',
    img: require('../assets/images/scan-2.png'),
  },
  {
    status: 'Declined',
    title: 'Lung Cancer Trial MN',
    next: 'None',
    date: '05/10/2024',
    img: require('../assets/images/scan-3.png'),
  },
];

export default function MyApplicationsScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.push('/trial-details')}>
            <Ionicons name="arrow-back-outline" size={24} color="#181A20" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>My Trial Applications</Text>
          <View style={{ width: 24 }} />
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
        {/* Applications List */}
        {applications.filter(app => activeTab === 'All' || app.status === activeTab).map((app, idx) => (
          <View key={idx} style={styles.appRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.status, app.status === 'Pending' ? styles.pending : app.status === 'Accepted' ? styles.accepted : styles.declined]}>{app.status}</Text>
              <Text style={styles.appTitle}>{app.title}</Text>
              <Text style={styles.nextStep}>Next Step: {app.next}</Text>
              <View style={styles.datePill}><Text style={styles.dateText}>Applied: {app.date}</Text></View>
            </View>
            <Image source={app.img} style={styles.appImg} resizeMode="cover" />
          </View>
        ))}
        {/* Find More Trials Button */}
        <TouchableOpacity style={styles.findBtn} onPress={() => router.push('/trials')}>
          <Ionicons name="search-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.findBtnText}>Find More Trials</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNav activeTab="/trials" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
    marginBottom: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    borderBottomWidth: 1,
    borderColor: '#F1F4F6',
  },
  tabBtn: {
    marginRight: 24,
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 18,
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
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  status: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 2,
  },
  pending: {
    color: '#4B7BE5',
  },
  accepted: {
    color: '#22c55e',
  },
  declined: {
    color: '#A0A3B1',
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
    marginBottom: 2,
  },
  nextStep: {
    fontSize: 13,
    color: '#59738C',
    fontFamily: 'PlusJakartaSans-Regular',
    marginBottom: 6,
  },
  datePill: {
    backgroundColor: '#F1F4F6',
    borderRadius: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 2,
  },
  dateText: {
    fontSize: 13,
    color: '#181A20',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  appImg: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginLeft: 16,
    backgroundColor: '#000',
  },
  findBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#908DDC',
    borderRadius: 32,
    paddingVertical: 18,
    marginTop: 8,
    marginBottom: 16,
  },
  findBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
  },
}); 