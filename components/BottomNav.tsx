import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import CustomText from '@/components/CustomText';

const tabs = [
  { name: 'Home', icon: 'home', routes: ['/home'] },
  { name: 'Trials', icon: 'flask', routes: ['/trials'] },
  { name: 'Calendar', icon: 'calendar', routes: ['/calendar'] },
  { name: 'Groups', icon: 'people', routes: ['/groups', '/feed'] },
  { name: 'Profile', icon: 'person', routes: ['/profile'] },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.wrapper}>
      <View style={styles.bottomNav}>
        {tabs.map(tab => {
          const isActive = tab.routes.includes(pathname);
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.navItem}
              onPress={() => {
                if (!tab.routes.includes(pathname)) {
                  // Always navigate to the first route for the tab
                  router.push(tab.routes[0] as any);
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