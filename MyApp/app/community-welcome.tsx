import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CommunityWelcomeScreen = () => {
  const [checks, setChecks] = useState<{
    respect: boolean;
    support: boolean;
    positivity: boolean;
  }>({
    respect: false,
    support: false,
    positivity: false,
  });

  const toggleCheck = (key: 'respect' | 'support' | 'positivity') => {
    setChecks({ ...checks, [key]: !checks[key] });
  };

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Full-width Image (no margin, no border radius) */}
        <Image
          source={require('../assets/images/community.png')}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Rest of the UI */}
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Welcome to our{"\n"}community</Text>
          <View style={styles.checkboxContainer}>
            <Pressable style={styles.checkboxRow} onPress={() => toggleCheck('respect')}>
              <View style={[styles.checkbox, checks.respect && styles.checkedBox]}>
                {checks.respect && <Ionicons name="checkmark" size={12} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>
                Be respectful and considerate of others.
              </Text>
            </Pressable>

            <Pressable style={styles.checkboxRow} onPress={() => toggleCheck('support')}>
              <View style={[styles.checkbox, checks.support && styles.checkedBox]}>
                {checks.support && <Ionicons name="checkmark" size={12} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>
                Offer support and encouragement to{"\n"}fellow members.
              </Text>
            </Pressable>

            <Pressable style={styles.checkboxRow} onPress={() => toggleCheck('positivity')}>
              <View style={[styles.checkbox, checks.positivity && styles.checkedBox]}>
                {checks.positivity && <Ionicons name="checkmark" size={12} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>
                Maintain a positive and hopeful attitude.
              </Text>
            </Pressable>
          </View>

          <Text style={styles.linkText}>
            By joining, you agree to our community guidelines
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Join Community</Text>
          </TouchableOpacity>

          <View style={styles.pagination}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 260,
  },
  innerContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    width: '100%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 3,
  },
  checkedBox: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
    lineHeight: 22,
  },
  linkText: {
    color: '#2563EB',
    textAlign: 'left',
    width: '100%',
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 28,
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007AFF',
    width: 8,
    height: 8,
  },
});

export default CommunityWelcomeScreen;

export const options = {
  headerShown: false,
};
