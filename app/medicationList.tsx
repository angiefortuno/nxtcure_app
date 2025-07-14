import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'expo-router';
import { currentMedications } from '@/types/agenda'; 
import { ThemedText } from '@/components/ThemedText';
import { medicineImageMap } from '@/utils/agendaUtils';

const MedicationList = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color="#181A20" />
        </TouchableOpacity>
        <ThemedText type="header" style={styles.headerTitle}>
          My Medications
        </ThemedText>
        <View style={{ width: 24 }} />
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ThemedText type='subtitleBold' style={styles.sectionTitle}>
          Current Medications
        </ThemedText>

        {currentMedications.map((med, idx) => (
          <View key={idx} style={styles.medCard}>
            <View style={{ flex: 1 }}>
              <ThemedText type="subtitleLight" style={{ marginBottom: 2 }}>
                Next dose: {med.nextDose}
              </ThemedText>
              <ThemedText type='subtitleBold'>{med.name}</ThemedText>
              <ThemedText type="subtitleLight">{med.dosage}</ThemedText>
              <TouchableOpacity style={styles.takeNowBtn}>
                <ThemedText type='subtitle'>Take Now</ThemedText>
              </TouchableOpacity>
            </View>
            <Image source={medicineImageMap[med.name as keyof typeof medicineImageMap]} style={styles.medImage} />
          </View>
        ))}

        {/* Refill Reminders */}
        <ThemedText type="subtitleBold" style={styles.sectionTitle}>
          Refill Reminders
        </ThemedText>

        {currentMedications.map((med, idx) => (
          <View key={idx} style={styles.refillRow}>
            <View style={styles.refillIcon}>
              <MaterialCommunityIcons name="pill" size={20} color="#0D141C" />
            </View>
            <View>
              <ThemedText type="subtitleBold">{med.name}</ThemedText>
              <ThemedText type="subtitleLight">Refill in {med.refillDate}</ThemedText>
            </View>
          </View>
        ))}

        <View style={{ height: 24 }} />

      </ScrollView>
      {/* Action Buttons */}
        <TouchableOpacity style={styles.secondaryBtn}>
          <ThemedText type='subtitleBold'>
            Add Medication
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn}>
          <ThemedText type='subtitleBold'>
            Log Side Effects
          </ThemedText>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MedicationList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 22,
    marginTop: 8,
    marginBottom: 12,
  },
  medCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  medImage: {
    width: 100,
    height: 100,
    marginLeft: 12,
  },
  takeNowBtn: {
    marginTop: 6,
    backgroundColor: '#E5E7EB',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  takeNowText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0D141C',
  },
  refillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap : 10,
    paddingVertical: 12,
  },
  refillIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8EDF5'
  },
  secondaryBtn: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
});
