import React from "react";
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const keyInfo = [
  {
    label: "New York City",
    sub: "Location",
    img: require("../assets/images/nyc.png"),
  },
  {
    label: "Phase 3",
    sub: "Trial Phase",
    img: require("../assets/images/trial.png"),
  },
  {
    label: "12 Months",
    sub: "Duration",
    img: require("../assets/images/cal.png"),
  },
  {
    label: "Up to $5,000",
    sub: "Compensation",
    img: require("../assets/images/cash.png"),
  },
];

const steps = [
  {
    icon: <Ionicons name="search-outline" size={20} color="#4B5563" />,
    title: "Screening",
    desc: "Initial assessment and tests",
  },
  {
    icon: <MaterialCommunityIcons name="pill" size={20} color="#4B5563" />,
    title: "Treatment",
    desc: "Receive trial medication",
  },
  {
    icon: <Ionicons name="calendar-outline" size={20} color="#4B5563" />,
    title: "Follow-up",
    desc: "Regular check-ups",
  },
];

const TrialDetailsScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Top Navigation */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.push('/trials')}>
            <Ionicons name="arrow-back-outline" size={24} color="#181A20" />
          </TouchableOpacity>
          <Ionicons name="share-outline" size={22} color="#181A20" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Phase 3 Trial for Advanced Lung Cancer</Text>

        {/* Match Row */}
        <View style={styles.matchRow}>
          <Text style={styles.matchText}>92% Match</Text>
          <View style={styles.greenDot} />
        </View>

        {/* Key Information */}
        <Text style={styles.sectionHeader}>Key Information</Text>
        {keyInfo.map((item, idx) => (
          <View key={idx} style={styles.keyInfoRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.keyInfoLabel}>{item.label}</Text>
              <Text style={styles.keyInfoSub}>{item.sub}</Text>
            </View>
            <Image source={item.img} style={styles.keyInfoImg} resizeMode="cover" />
          </View>
        ))}

        {/* Eligibility Requirements */}
        <View style={styles.eligibilityBox}>
          <View style={styles.eligibilityHeader}>
            <Text style={styles.eligibilityTitle}>Eligibility Requirements</Text>
            <Ionicons name="chevron-down" size={18} color="#181A20" />
          </View>
          <Text style={styles.eligibilityText}>
            Patients with advanced non-small cell lung cancer, aged 18 or older, with specific genetic markers, and who have not received prior systemic therapy for advanced disease.
          </Text>
        </View>

        {/* What to Expect */}
        <Text style={styles.sectionHeader}>What to Expect</Text>
        <View style={styles.expectRow}>
          {/* Icon column with dashed line between icons */}
          <View style={styles.iconColumn}>
            {/* Dashed line between icons */}
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

        {/* CTA Buttons */}
        <TouchableOpacity style={styles.ctaPrimary} onPress={() => router.push('/express-interest')}>
          <Text style={styles.ctaPrimaryText}>Express Interest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctaSecondary}>
          <Text style={styles.ctaSecondaryText}>Save for Later</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
    marginBottom: 8,
    textAlign: 'left',
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  matchText: {
    fontSize: 15,
    color: '#181A20',
    fontFamily: 'PlusJakartaSans-Regular',
    marginRight: 8,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
    marginBottom: 10,
    marginTop: 10,
  },
  keyInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  keyInfoLabel: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
    marginBottom: 2,
  },
  keyInfoSub: {
    fontSize: 14,
    color: '#59738C',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  keyInfoImg: {
    width: 72,
    height: 48,
    borderRadius: 12,
    marginLeft: 12,
  },
  eligibilityBox: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    borderRadius: 16,
    marginBottom: 18,
    backgroundColor: '#fff',
  },
  eligibilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eligibilityTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
    flex: 1,
  },
  eligibilityText: {
    fontSize: 14,
    color: '#4b5563',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  expectRow: {
    flexDirection: 'row',
    marginBottom: 18,
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
    fontSize: 15,
    color: '#6B7280',
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 0,
  },
  ctaPrimary: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 32,
    backgroundColor: '#908DDC',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  ctaPrimaryText: {
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  ctaSecondary: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 32,
    backgroundColor: '#F1F4F6',
    alignItems: 'center',
    marginBottom: 0,
  },
  ctaSecondaryText: {
    color: '#181A20',
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    textAlign: 'center',
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
});

export default TrialDetailsScreen; 