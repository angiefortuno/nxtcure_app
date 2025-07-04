import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <Image
         source={require('../assets/images/welcome.png')}          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomHalf}>
        <Text style={styles.title}>Your journey, supported{'\n'}every step</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/signup')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.signInText}>
          Already have an account?{' '}
          <Text style={styles.signInLink} onPress={() => router.replace('/')}>Sign In</Text>
        </Text>
      </View>
    </View>
  );
};

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topHalf: {
    flex: 1.2,
    backgroundColor: '#D4A37C', // Background color from the image
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: screen.width * 0.8,
    height: screen.height * 0.45,
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 100,
    borderRadius: 30,
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  signInText: {
    color: '#000',
    fontSize: 14,
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
