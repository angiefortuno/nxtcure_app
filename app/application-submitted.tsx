import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const steps = [
  {
    icon: <Ionicons name="search-outline" size={20} color="#4B5563" />,
    title: 'Application Review',
    desc: 'Our team will review your application within 2 business days.',
  },
  {
    icon: <Ionicons name="call-outline" size={20} color="#4B5563" />,
    title: 'Eligibility Screening',
    desc: 'If you meet the initial criteria, we\'ll schedule a screening call.',
  },
  {
    icon: <Ionicons name="checkmark-done-outline" size={20} color="#4B5563" />,
    title: 'Trial Enrollment',
    desc: 'Upon successful screening, you\'ll be enrolled in the trial.',
  },
];

export default function ApplicationSubmittedScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Ionicons name="close" size={24} color="#181A20" />
          <Text style={styles.topBarTitle}>Application Submitted</Text>
          <View style={{ width: 24 }} />
        </View>
        {/* Checkmark Image */}
        <Image source={require('../assets/images/checkmark.png')} style={styles.checkImgFull} resizeMode="cover" />
        {/* Title */}
        <Text style={styles.header}>Application Submitted!</Text>
        {/* Steps */}
        <View style={styles.stepsRow}>
          <View style={styles.iconColumn}>
            <View style={styles.dashedLineAbsolute} />
            {steps.map((step, idx) => (
              <View key={idx} style={styles.iconWrapper}>
                <View style={styles.iconBg}>{step.icon}</View>
              </View>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            {steps.map((step, idx) => (
              <View key={idx} style={[styles.stepRow, idx === steps.length - 1 && { marginBottom: 0 }]}> 
                <View style={styles.stepTextBlock}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDesc}>{step.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* Contact Section */}
        <Text style={styles.contactHeader}>Contact</Text>
        <View style={styles.contactCard}>
          <Text style={styles.contactName}>Dr. Amelia Harper</Text>
          <Text style={styles.contactRole}>Lead Researcher</Text>
        </View>
        <View style={styles.contactInfoRow}>
          <View style={styles.contactInfoIcon}><Ionicons name="mail-outline" size={18} color="#181A20" /></View>
          <View style={styles.contactInfoTextBlock}>
            <Text style={styles.contactInfoMain}>amelia.harper@research.org</Text>
            <Text style={styles.contactInfoSub}>Email</Text>
          </View>
        </View>
        <View style={styles.contactInfoRow}>
          <View style={styles.contactInfoIcon}><Ionicons name="call-outline" size={18} color="#181A20" /></View>
          <View style={styles.contactInfoTextBlock}>
            <Text style={styles.contactInfoMain}>(555) 123–4567</Text>
            <Text style={styles.contactInfoSub}>Phone</Text>
          </View>
        </View>
        {/* Buttons */}
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/my-applications')}><Text style={styles.primaryBtnText}>All Applications</Text></TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn}><Text style={styles.secondaryBtnText}>Check Messages</Text></TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/trials')}><Text style={styles.secondaryBtnText}>Find More Trials</Text></TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}><Text style={styles.shareBtnText}>Share</Text></TouchableOpacity>
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
  },
  checkImgFull: {
    width: '100%',
    height: 380,
    borderRadius: 20,
    marginBottom: 18,
    marginTop: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
    marginBottom: 18,
    textAlign: 'center',
  },
  stepsRow: {
    flexDirection: 'row',
    marginBottom: 38,
    marginTop: 28,
    alignItems: 'flex-start',
  },
  iconColumn: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    height: 132, // 3 icons * 44px each
    marginTop: 0,
    marginBottom: 0,
  },
  iconWrapper: {
    width: 32,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  iconBg: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  dashedLineAbsolute: {
    position: 'absolute',
    left: 15,
    top: 44 / 2,
    width: 2,
    height: 44 * 2,
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 1,
    zIndex: 1,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    minHeight: 36,
  },
  stepTextBlock: {
    flex: 1,
    marginLeft: 0,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
    marginBottom: 0,
  },
  stepDesc: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 0,
  },
  contactHeader: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
    marginTop: 18,
    marginBottom: 4,
  },
  contactCard: {
    marginBottom: 8,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
  },
  contactRole: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  contactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F4F6',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  contactInfoIcon: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfoTextBlock: {
    flex: 1,
    marginLeft: 8,
  },
  contactInfoMain: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
  },
  contactInfoSub: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  primaryBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 32,
    backgroundColor: '#908DDC',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 8,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
  },
  secondaryBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 32,
    backgroundColor: '#F1F4F6',
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryBtnText: {
    color: '#181A20',
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
  },
  shareBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  shareBtnText: {
    color: '#181A20',
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
  },
}); 