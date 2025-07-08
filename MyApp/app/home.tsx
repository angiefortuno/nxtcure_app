import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '@/components/CustomText';
import BottomNav from '@/components/BottomNav';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <CustomText style={styles.headerTitle}>Home</CustomText>
        <Ionicons name="settings-outline" size={24} color="#0D141C" style={styles.headerIcon} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Main Card */}
        <View style={styles.card}>
          <CustomText style={styles.welcomeText}>
            Welcome back, Sophia
          </CustomText>

          <Image
            source={require('../assets/images/overview.png')}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.overviewSection}>
            <CustomText style={styles.overviewTitle}>Today's Overview</CustomText>
            <CustomText style={styles.overviewSubtitle}>Appointments, medications, and more</CustomText>
            <CustomText style={styles.upcomingText}>2 upcoming</CustomText>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.primaryButton}>
              <CustomText style={styles.primaryButtonText}>Log Symptoms</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <CustomText style={styles.secondaryButtonText}>Ask AI</CustomText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.findTrialsButton}>
            <CustomText style={styles.findTrialsText}>Find Trials</CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
};

export default HomeScreen;

export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    paddingTop: 10,
    paddingBottom: 80,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 16,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    // flex: 1,
  },
  headerIcon: {
    position: 'absolute',
    paddingLeft: 16,
    paddingRight: 16,
    right: 0,
    top: 0,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
    width: 'auto',
    alignSelf: 'stretch',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginTop: 12,
    marginBottom: 12,
    flexWrap: 'wrap',
    minWidth: 0,
    alignSelf: 'auto',
    textAlign: 'left',
  },
  image: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    marginBottom: 18,
    backgroundColor: '#F7F8FA',
    alignSelf: 'stretch',
  },
  overviewSection: {
    marginBottom: 18,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 2,
  },
  overviewSubtitle: {
    fontSize: 16,
    color: '#4A739C',
    fontFamily: 'PlusJakartaSans-Regular',
    marginBottom: 2,
  },
  upcomingText: {
    fontSize: 16,
    color: '#4A739C',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#A99AF7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    flex: 1,
    alignItems: 'center',
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Bold',
    alignContent: 'center',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#F1F4FA',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    flex: 1,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#0D141C',
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Bold',
    alignContent: 'center',
    fontSize: 16,
  },
  findTrialsButton: {
    backgroundColor: '#F1F4FA',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  findTrialsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
  },
}); 