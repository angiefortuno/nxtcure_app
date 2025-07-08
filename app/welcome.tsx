import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WelcomeScreen = () => {
  const safeInset = useSafeAreaInsets();
  const router = useRouter();

  const handleSignUp = () => {
    router.replace('/signup');
  };

  const HandleSignIn = () => {
    Alert.alert('To be Implemented', 'Sign in section is yet to be implemented to the app flow');
  };

  return (
    <View style={styles.container}>
      {/* Top : Image + Title */}
      <View style={styles.topHalf}>
        <Image
          source={require('../assets/images/welcome.png')}
          style={[styles.imageContainer, { paddingTop: safeInset.top }]}
          resizeMode='contain'
        />

        <View style={styles.titleContainer}>
          <ThemedText allowFontScaling={false} type='title'>Your journey, supported{'\n'}every step</ThemedText>
        </View>
      </View>

      {/* Middle : Logo */}
      <Image
        source={require('../assets/images/nxtcure-logo.png')}
        style={styles.logoContainer}
        resizeMode='contain'
      />

      {/* Bottom : Sign Up & Sign In */}
      <View
        style={[styles.bottomHalf, { paddingBottom: safeInset.bottom || 30 }]}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={handleSignUp}>
          <ThemedText allowFontScaling={false} type='link' style={styles.buttonText}>Get Started</ThemedText>
        </TouchableOpacity>

        <ThemedText
          allowFontScaling={false}
          type='subtitle'>
          Already have an account?{' '}
          <ThemedText
            allowFontScaling={false}
            type='link'
            onPress={HandleSignIn}>
            Sign In
          </ThemedText>
        </ThemedText>
      </View>
    </View>
  );
};

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFF5',
  },
  topHalf: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  bottomHalf: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  imageContainer: {
    flex: 2,
    backgroundColor: '#DBA283',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%'
  },
  logoContainer: {
    flex: 1,
    backgroundColor: '#FDFFF5',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%'
  },
  titleContainer: {
    flex: 1.5,
    backgroundColor: '#FDFFF5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },
  button: {
    backgroundColor: '#908DDC',
    paddingVertical: 16,
    paddingHorizontal: 100,
    borderRadius: 30,
    width: '90%',
  },
  buttonText: {
    color: '#FDFFF5',
    textAlign: 'center',
  },
  signInText: {
    color: '#000',
    fontSize: 16,
  },
  signInLink: {
    fontWeight: '600',
    color: '#000',
  },
});

export default WelcomeScreen;

export const options = {
  headerShown: false,
};
