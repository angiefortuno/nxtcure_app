import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
<<<<<<< HEAD
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
=======
  const color = useThemeColor({ light: lightColor ?? '#000', dark: darkColor ?? '#000' }, 'text');
>>>>>>> 872b1e662735c0072ea683f31cfb3f368bfba71e

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
<<<<<<< HEAD

=======
>>>>>>> 872b1e662735c0072ea683f31cfb3f368bfba71e
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
<<<<<<< HEAD
=======
    fontFamily: 'PlusJakartaSans_400Regular',
>>>>>>> 872b1e662735c0072ea683f31cfb3f368bfba71e
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
<<<<<<< HEAD
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
=======
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  link: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
});

>>>>>>> 872b1e662735c0072ea683f31cfb3f368bfba71e
