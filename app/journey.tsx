import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  TextInput,
} from 'react-native';
import { Menu, Provider, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import cancerTypesJson from '../assets/data/cancer_types.json';
import usStates from '../api/usStates';
import usCities from '../api/usCities';

// Set your backend URL here for local development
const BACKEND_URL = 'https://waterqueue.et.r.appspot.com'; // <-- Using new deployed GCP backend

const JourneyScreen = () => {
  const [cancerType, setCancerType] = useState('');
  const [gender, setGender] = useState('');
  const [cancerMenuVisible, setCancerMenuVisible] = useState(false);
  const [genderMenuVisible, setGenderMenuVisible] = useState(false);
  const router = useRouter();
  const [cancerTypes] = useState<string[]>(cancerTypesJson);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [stateMenuVisible, setStateMenuVisible] = useState(false);
  const [cityMenuVisible, setCityMenuVisible] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result.canceled) {
        console.log('Selected file:', result.assets[0].name);
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  // Restore city filtering by selected state (case-insensitive, trimmed)
  const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();
  const filteredCities = state
    ? usCities.filter(cityObj => normalize(cityObj.state) === normalize(state)).map(cityObj => cityObj.name)
    : [];

  const handleNext = async () => {
    // Navigate to trials page with form data
    const params = new URLSearchParams({
      cancerType,
      gender,
      state,
      city
    });
    router.replace(`/trials?${params.toString()}`);
  };

  // Dropdown open handlers to ensure only one is open at a time
  const openCancerMenu = () => {
    setCancerMenuVisible(true);
    setGenderMenuVisible(false);
    setStateMenuVisible(false);
    setCityMenuVisible(false);
  };
  const openGenderMenu = () => {
    setCancerMenuVisible(false);
    setGenderMenuVisible(true);
    setStateMenuVisible(false);
    setCityMenuVisible(false);
  };
  const openStateMenu = () => {
    setCancerMenuVisible(false);
    setGenderMenuVisible(false);
    setStateMenuVisible(true);
    setCityMenuVisible(false);
  };
  const openCityMenu = () => {
    setCancerMenuVisible(false);
    setGenderMenuVisible(false);
    setStateMenuVisible(false);
    setCityMenuVisible(true);
  };

  return (
    <Provider>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace('/role-selection')}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Tell us about your journey</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>Cancer Type</Text>
          <Menu
            visible={cancerMenuVisible}
            onDismiss={() => setCancerMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={styles.dropdown}
                onPress={openCancerMenu}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <Text style={{ color: '#181A20', fontSize: 16, fontWeight: '400', flex: 1 }}>
                    {cancerType ? cancerType : 'Select Cancer Type'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#A0AEC0" style={{ marginLeft: 8 }} />
                </View>
              </TouchableOpacity>
            }
            contentStyle={{ borderRadius: 16, backgroundColor: '#fff', elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
          >
            {cancerTypes.map(type => (
              <Menu.Item
                key={type}
                onPress={() => { setCancerType(type); setCancerMenuVisible(false); }}
                title={type}
                titleStyle={{ fontSize: 14, color: '#181A20', fontWeight: cancerType === type ? '700' : '400' }}
                style={{ backgroundColor: cancerType === type ? '#EEF2FF' : '#fff', borderRadius: 10, marginVertical: 2, marginHorizontal: 6 }}
                leadingIcon={cancerType === type ? () => <Ionicons name="checkmark" size={18} color="#4F8EF7" /> : undefined}
              />
            ))}
          </Menu>

          <Text style={styles.label}>Gender</Text>
          <Menu
            visible={genderMenuVisible}
            onDismiss={() => setGenderMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={styles.dropdown}
                onPress={openGenderMenu}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <Text style={{ color: '#181A20', fontSize: 16, fontWeight: '400', flex: 1 }}>
                    {gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : 'Select Gender'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#A0AEC0" style={{ marginLeft: 8 }} />
                </View>
              </TouchableOpacity>
            }
            contentStyle={{ borderRadius: 16, backgroundColor: '#fff', elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
          >
            <Menu.Item onPress={() => { setGender('male'); setGenderMenuVisible(false); }} title="Male" titleStyle={{ fontSize: 14, color: '#181A20', fontWeight: gender === 'male' ? '700' : '400' }} style={{ backgroundColor: gender === 'male' ? '#EEF2FF' : '#fff', borderRadius: 10, marginVertical: 2, marginHorizontal: 6 }} leadingIcon={gender === 'male' ? () => <Ionicons name="checkmark" size={18} color="#4F8EF7" /> : undefined} />
            <Menu.Item onPress={() => { setGender('female'); setGenderMenuVisible(false); }} title="Female" titleStyle={{ fontSize: 14, color: '#181A20', fontWeight: gender === 'female' ? '700' : '400' }} style={{ backgroundColor: gender === 'female' ? '#EEF2FF' : '#fff', borderRadius: 10, marginVertical: 2, marginHorizontal: 6 }} leadingIcon={gender === 'female' ? () => <Ionicons name="checkmark" size={18} color="#4F8EF7" /> : undefined} />
            <Menu.Item onPress={() => { setGender('other'); setGenderMenuVisible(false); }} title="Other" titleStyle={{ fontSize: 14, color: '#181A20', fontWeight: gender === 'other' ? '700' : '400' }} style={{ backgroundColor: gender === 'other' ? '#EEF2FF' : '#fff', borderRadius: 10, marginVertical: 2, marginHorizontal: 6 }} leadingIcon={gender === 'other' ? () => <Ionicons name="checkmark" size={18} color="#4F8EF7" /> : undefined} />
          </Menu>

          {/* State Dropdown */}
          <Text style={styles.label}>State</Text>
          <Menu
            visible={stateMenuVisible}
            onDismiss={() => setStateMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={styles.dropdown}
                onPress={openStateMenu}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <Text style={{ color: '#181A20', fontSize: 16, fontWeight: '400', flex: 1 }}>
                    {state ? state : 'Select State'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#A0AEC0" style={{ marginLeft: 8 }} />
                </View>
              </TouchableOpacity>
            }
            contentStyle={{ borderRadius: 16, backgroundColor: '#fff', elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
          >
            {usStates.map(s => (
              <Menu.Item
                key={s.name}
                onPress={() => { setState(s.name); setStateMenuVisible(false); setCity(''); }}
                title={s.name}
                titleStyle={{ fontSize: 14, color: '#181A20', fontWeight: state === s.name ? '700' : '400' }}
                style={{ backgroundColor: state === s.name ? '#EEF2FF' : '#fff', borderRadius: 10, marginVertical: 2, marginHorizontal: 6 }}
                leadingIcon={state === s.name ? () => <Ionicons name="checkmark" size={18} color="#4F8EF7" /> : undefined}
              />
            ))}
          </Menu>

          {/* City Dropdown */}
          <Text style={styles.label}>City</Text>
          <Menu
            visible={cityMenuVisible}
            onDismiss={() => setCityMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={styles.dropdown}
                onPress={openCityMenu}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <Text style={{ color: '#181A20', fontSize: 16, fontWeight: '400', flex: 1 }}>
                    {city ? city : 'Select City'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#A0AEC0" style={{ marginLeft: 8 }} />
                </View>
              </TouchableOpacity>
            }
            contentStyle={{ borderRadius: 16, backgroundColor: '#fff', elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
          >
            {filteredCities.length === 0 ? (
              <Menu.Item title="No cities available" disabled />
            ) : (
              filteredCities.map(cityName => (
                <Menu.Item
                  key={cityName}
                  onPress={() => { setCity(cityName); setCityMenuVisible(false); }}
                  title={cityName}
                  titleStyle={{ fontSize: 14, color: '#181A20', fontWeight: city === cityName ? '700' : '400' }}
                  style={{ backgroundColor: city === cityName ? '#EEF2FF' : '#fff', borderRadius: 10, marginVertical: 2, marginHorizontal: 6 }}
                  leadingIcon={city === cityName ? () => <Ionicons name="checkmark" size={18} color="#4F8EF7" /> : undefined}
                />
              ))
            )}
          </Menu>

          {/* Upload Button */}
          <TouchableOpacity style={styles.uploadBtn} onPress={handleDocumentPick}>
            <Ionicons name="document-outline" size={18} color="#000" />
            <Text style={styles.uploadText}>Upload medical records</Text>
          </TouchableOpacity>
        </View>

        {/* Dots */}
        <View style={styles.pagination}>
          <TouchableOpacity onPress={() => router.replace('/role-selection')}>
            <View style={styles.dot} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace('/journey')}>
            <View style={[styles.dot, styles.activeDot]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace('/community-welcome')}>
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>

        {/* Bottom Button */}
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
        {saveMessage ? (
          <Text style={{ textAlign: 'center', color: saveMessage === 'Saved!' ? 'green' : 'red', marginTop: 8 }}>{saveMessage}</Text>
        ) : null}
      </View>
    </Provider>
  );
};

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    marginTop: 14,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#F8FAFC',
    width: '100%',
    alignItems: 'flex-start',
    // shadowColor: '#000',
    // shadowOpacity: 0.06,
    // shadowRadius: 8,
    // shadowOffset: { width: 0, height: 2 },
    // elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#181A20',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  uploadBtn: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '500',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  nextBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default JourneyScreen;

export const options = {
  headerShown: false,
};
