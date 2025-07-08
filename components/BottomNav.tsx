import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import CustomText from '@/components/CustomText';

const tabs = [
  { name: 'Home', icon: 'home', route: '/home' },
  { name: 'Trials', icon: 'flask', route: '/trials' },
  { name: 'Calendar', icon: 'calendar', route: '/calendar' },
  { name: 'Groups', icon: 'people', route: '/groups' },
  { name: 'Profile', icon: 'person', route: '/profile' },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.wrapper}>
      <View style={styles.bottomNav}>
        {tabs.map(tab => {
          const isActive = pathname === tab.route;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.navItem}
              onPress={() => {
                if (pathname !== tab.route) {
                  router.push(tab.route as any);
                }
              }}
              accessibilityRole="button"
              accessibilityLabel={tab.name}
            >
              <Ionicons
                name={tab.icon as any}
                size={24}
                color={isActive ? '#0D141C' : '#4A739C'}
              />
              <CustomText style={isActive ? styles.navLabelActive : styles.navLabel}>
                {tab.name}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navLabel: {
    fontSize: 12,
    color: '#4A739C',
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 4,
  },
  navLabelActive: {
    fontSize: 12,
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans-Bold',
    marginTop: 4,
  },
}); 