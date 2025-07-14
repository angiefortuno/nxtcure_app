import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const screen = Dimensions.get('window');

const WelcomeScreen = () => {
  const safeInset = useSafeAreaInsets();
  const router = useRouter();

  const handleSignUp = () => {
    router.replace ('/signup');
  }

  const handleSignIn = () => {
    Alert.alert('To be Implemented', 'Sign in section is yet to be implemented to the app flow');
  };

  return (
    <View style={styles.container}>
      {/* Top Illustration Section */}
      <View style={styles.illustrationSection}>
        <View style={styles.illustrationBg}>
          <Image
            source={require('../assets/images/welcome.png')}
            style={styles.illustration}
            resizeMode='contain'
          />
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={[styles.title, { fontFamily: 'PlusJakartaSans-Bold' }]}>Your journey, supported{"\n"}every step</Text>
      </View>

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Image
          source={require('../assets/images/nxtcure-logo.png')}
          style={styles.logo}
          resizeMode='contain'
        />
      </View>

      {/* Button and Sign In Section */}
      <View style={[styles.bottomSection, { paddingBottom: safeInset.bottom || 30 }]}> 
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleSignUp}
        >
          <Text style={[styles.buttonText, { fontFamily: 'PlusJakartaSans-SemiBold' }]}>Get Started</Text>
        </TouchableOpacity>

        <Text style={[styles.signInText, { fontFamily: 'PlusJakartaSans-Regular' }]}>Already have an account?{' '}
          <Text
            style={[styles.signInLink, { fontFamily: 'PlusJakartaSans-Bold' }]}
            onPress={handleSignIn}
          >
            Sign In
          </Text>
        </Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFF5',
    justifyContent: 'flex-start',
  },
  illustrationSection: {
    height: screen.height * 0.36,
    width: '100%',
    backgroundColor: '#E6B89C', // peach/tan background
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  illustrationBg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  illustration: {
    width: '80%',
    height: '90%',
  },
  titleSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#181A20',
    lineHeight: 36,
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 110,
    height: 110,
  },
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#908DDC',
    paddingVertical: 16,
    borderRadius: 30,
    width: '90%',
    marginBottom: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FDFFF5',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  signInText: {
    color: '#181A20',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
  },
  signInLink: {
    fontWeight: '700',
    color: '#181A20',
  },
});

export default WelcomeScreen;

export const options = {
  headerShown: false,
};
