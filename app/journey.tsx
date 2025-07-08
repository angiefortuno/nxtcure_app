import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import { Menu, Provider, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';

const JourneyScreen = () => {
  const [cancerType, setCancerType] = useState('');
  const [gender, setGender] = useState('');
  const [cancerMenuVisible, setCancerMenuVisible] = useState(false);
  const [genderMenuVisible, setGenderMenuVisible] = useState(false);
  const router = useRouter();

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
              <Button
                mode="outlined"
                style={styles.dropdown}
                onPress={() => setCancerMenuVisible(true)}
                contentStyle={{ justifyContent: 'flex-start' }}
                labelStyle={{ color: cancerType ? '#000' : '#999' }}
              >
                {cancerType ? cancerType : 'Select Cancer Type'}
              </Button>
            }
          >
            <Menu.Item onPress={() => { setCancerType('Breast Cancer'); setCancerMenuVisible(false); }} title="Breast Cancer" />
            <Menu.Item onPress={() => { setCancerType('Lung Cancer'); setCancerMenuVisible(false); }} title="Lung Cancer" />
            <Menu.Item onPress={() => { setCancerType('Colon Cancer'); setCancerMenuVisible(false); }} title="Colon Cancer" />
          </Menu>

          <Text style={styles.label}>Gender</Text>
          <Menu
            visible={genderMenuVisible}
            onDismiss={() => setGenderMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                style={styles.dropdown}
                onPress={() => setGenderMenuVisible(true)}
                contentStyle={{ justifyContent: 'flex-start' }}
                labelStyle={{ color: gender ? '#000' : '#999' }}
              >
                {gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : 'Select Gender'}
              </Button>
            }
          >
            <Menu.Item onPress={() => { setGender('male'); setGenderMenuVisible(false); }} title="Male" />
            <Menu.Item onPress={() => { setGender('female'); setGenderMenuVisible(false); }} title="Female" />
            <Menu.Item onPress={() => { setGender('other'); setGenderMenuVisible(false); }} title="Other" />
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
        <TouchableOpacity style={styles.nextBtn} onPress={() => router.replace('/community-welcome')}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
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
