import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const RoleSelectionScreen = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      // TODO: Update this to your actual next screen route
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>I am a...</Text>

      {/* Patient */}
      <TouchableOpacity
        style={[{ marginBottom: 20 }, selectedRole === 'Patient' && styles.selectedBox]}
        onPress={() => handleSelect('Patient')}
      >
        <Image
          source={require('../assets/images/patient.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.roleTitle}>Patient</Text>
        <Text style={styles.roleDesc}>
          I have been diagnosed with cancer and am seeking treatment options.
        </Text>
      </TouchableOpacity>

      {/* Caregiver */}
      <TouchableOpacity
        style={[{ marginBottom: 20 }, selectedRole === 'Caregiver' && styles.selectedBox]}
        onPress={() => handleSelect('Caregiver')}
      >
        <Image
          source={require('../assets/images/caregiver.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.roleTitle}>Caregiver</Text>
        <Text style={styles.roleDesc}>
          I am supporting someone diagnosed with cancer and helping them find resources.
        </Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedRole && { opacity: 0.5 },
        ]}
        onPress={() => {
          if (selectedRole === 'Patient') {
            router.replace('/journey');
          } else if (selectedRole === 'Caregiver') {
            router.replace('/'); // TODO: Update to caregiver journey route
          }
        }}
        disabled={!selectedRole}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: width - 100,
    height: 150,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 12,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#000',
  },
  roleDesc: {
    fontSize: 14,
    color: '#4B5563',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  selectedBox: {
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#EEF5FF',
    borderRadius: 16,
    padding: 8,
  },
});

export default RoleSelectionScreen;

export const options = {
  headerShown: false,
}; 