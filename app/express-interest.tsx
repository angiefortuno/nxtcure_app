import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const options = {
  availability: ['Yes', 'No'],
  motivation: ['Access to new treatments', 'Help advance medical research', 'Other'],
  contact: ['Email', 'Phone', 'Both'],
};

export default function ExpressInterestScreen() {
  const [availability, setAvailability] = useState('');
  const [motivation, setMotivation] = useState('');
  const [contact, setContact] = useState('');
  const [why, setWhy] = useState('');
  const navigation = useRouter();

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32, flexGrow: 1 }}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Ionicons name="close" size={24} color="#181A20" />
          <Text style={styles.topBarTitle}>Show Your Interest</Text>
          <View style={{ width: 24 }} />
        </View>
        {/* Progress Bar */}
        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>

        {/* Availability */}
        <View style={styles.sectionSpacing}>
          <Text style={styles.sectionHeader}>Availability</Text>
          <Text style={styles.sectionSub}>Are you available to participate in a clinical trial?</Text>
          <View style={styles.radioGroup}>
            {options.availability.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[styles.radioOption, availability === opt && styles.radioOptionSelected]}
                onPress={() => setAvailability(opt)}
                activeOpacity={0.7}
              >
                <Text style={styles.radioLabel}>{opt}</Text>
                <View style={[styles.radioCircle, availability === opt && styles.radioCircleSelected]}>
                  {availability === opt && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Motivation */}
        <View style={styles.sectionSpacing}>
          <Text style={styles.sectionHeader}>Motivation</Text>
          <Text style={styles.sectionSub}>What motivates you to participate in a clinical trial?</Text>
          <View style={styles.radioGroup}>
            {options.motivation.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[styles.radioOption, motivation === opt && styles.radioOptionSelected]}
                onPress={() => setMotivation(opt)}
                activeOpacity={0.7}
              >
                <Text style={styles.radioLabel}>{opt}</Text>
                <View style={[styles.radioCircle, motivation === opt && styles.radioCircleSelected]}>
                  {motivation === opt && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Medical Records */}
        <View style={styles.sectionSpacing}>
          <Text style={styles.sectionHeader}>Medical Records</Text>
          <Text style={styles.sectionSub}>Upload your medical records (optional)</Text>
          <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.7}>
            <Text style={styles.uploadBtnText}>Upload Records</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Preference */}
        <View style={styles.sectionSpacing}>
          <Text style={styles.sectionHeader}>Contact Preference</Text>
          <Text style={styles.sectionSub}>How would you prefer to be contacted?</Text>
          <View style={styles.radioGroup}>
            {options.contact.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[styles.radioOption, contact === opt && styles.radioOptionSelected]}
                onPress={() => setContact(opt)}
                activeOpacity={0.7}
              >
                <Text style={styles.radioLabel}>{opt}</Text>
                <View style={[styles.radioCircle, contact === opt && styles.radioCircleSelected]}>
                  {contact === opt && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Why are you interested? */}
        <View style={styles.sectionSpacing}>
          <Text style={styles.sectionHeader}>Why are you interested?</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder=""
            value={why}
            onChangeText={setWhy}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.push('/application-submitted')}>
          <Text style={styles.submitBtnText}>Submit Application</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: '#F1F4F6',
    borderRadius: 3,
    marginBottom: 18,
  },
  progressBarFill: {
    width: '30%',
    height: 6,
    backgroundColor: '#D1D5DB',
    borderRadius: 3,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#181A20',
    marginTop: 18,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 13,
    color: '0F141A',
    fontFamily: 'PlusJakartaSans-Regular',
    marginBottom: 8,
    marginTop: 8,
  },
  radioGroup: {
    marginBottom: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F4F6',
    justifyContent: 'space-between',
  },
  radioOptionSelected: {
    borderColor: '#908DDC',
    backgroundColor: '#F4F2FD',
  },
  radioLabel: {
    fontSize: 13,
    color: '#181A20',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  radioCircleSelected: {
    borderColor: '#908DDC',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#908DDC',
  },
  uploadBtn: {
    backgroundColor: '#F1F4F6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  uploadBtnText: {
    color: '#181A20',
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 13,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    minHeight: 80,
    fontSize: 15,
    color: '#181A20',
    fontFamily: 'PlusJakartaSans-Regular',
    padding: 12,
    marginBottom: 18,
    backgroundColor: '#fff',
  },
  submitBtn: {
    backgroundColor: '#908DDC',
    borderRadius: 32,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 15,
  },
  sectionSpacing: {
    marginBottom: 28,
  },
}); 