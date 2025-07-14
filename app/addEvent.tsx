import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '@/components/CustomText';
import BottomNav from '@/components/BottomNav';
import { useRouter } from 'expo-router';

const AddEventScreen = () => {
  const router = useRouter();
  const [reminder, setReminder] = useState('1 hour before');

  const reminders = ['1 hour before', '1 day before', '1 week before'];

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    style={{ flex: 1 }}
    >
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Header */}
            <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} color="#0D141C" />
            </TouchableOpacity>
            <CustomText style={styles.headerTitle}>New Appointment</CustomText>
            <View style={{ width: 28 }} /> {/* placeholder for spacing */}
            </View>

            {/* Scrollable Form */}
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Dropdown-like Inputs */}
            <TouchableOpacity style={styles.dropdown}>
                <CustomText style={styles.dropdownText}>Appointment Type</CustomText>
                <Ionicons name="chevron-down-outline" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.dropdown}>
                <CustomText style={styles.dropdownText}>Doctor/Facility</CustomText>
                <Ionicons name="chevron-down-outline" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Date & Time */}
            <TextInput placeholder="Date" placeholderTextColor="#9CA3AF" style={styles.input} />
            <TextInput placeholder="Time" placeholderTextColor="#9CA3AF" style={styles.input} />

            {/* Location with icon */}
            <View style={styles.inputWithIcon}>
                <TextInput
                placeholder="Location"
                placeholderTextColor="#9CA3AF"
                style={styles.inputText}
                />
                <Ionicons name="location-outline" size={18} color="#9CA3AF" />
            </View>

            {/* Notes */}
            <TextInput
                placeholder="Notes"
                placeholderTextColor="#9CA3AF"
                style={[styles.input, styles.notesInput]}
                multiline
                numberOfLines={4}
            />

            {/* Reminders */}
            <CustomText style={styles.reminderTitle}>Reminders</CustomText>
            {reminders.map((label) => (
                <TouchableOpacity
                key={label}
                style={styles.radioOption}
                onPress={() => setReminder(label)}
                >
                <Ionicons
                    name={reminder === label ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color="#6366F1"
                />
                <CustomText style={styles.reminderText}>{label}</CustomText>
                </TouchableOpacity>
            ))}

            {/* Spacer for buttons */}
            <View style={{ height: 120 }} />
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.footerButtons}>
                <TouchableOpacity style={styles.saveButton}>
                    <CustomText style={styles.buttonText}>Save Appointment</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton}>
                    <CustomText style={styles.buttonText}>Cancel</CustomText>
                </TouchableOpacity>
            </View>
        <BottomNav />
        </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddEventScreen;

export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#0D141C',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  dropdownText: {
    fontSize: 15,
    color: '#9CA3AF',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#0D141C',
    marginBottom: 16,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#0D141C',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 10,
    color: '#0D141C',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  reminderText: {
    marginLeft: 12,
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#0D141C',
  },
  footerButtons: {
    position: 'absolute',
    bottom: 90,
    width: '100%',
    paddingHorizontal: 16,
  },
  saveButton: {
    backgroundColor: '#908DDC',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#0D141C',
  },
});
