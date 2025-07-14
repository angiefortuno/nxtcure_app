import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'subtitleLight' | 'subtitleBold' | 'link' | 'header' | 'overviewTitles';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor ?? '#000', dark: darkColor ?? '#000' }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'subtitleLight' ? styles.subtitleLight : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'header' ? styles.header : undefined,
        type === 'overviewTitles' ? styles.overviewTitles : undefined,
        type === 'subtitleBold' ? styles.subtitleBold : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  defaultSemiBold: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  header : {
    fontSize : 20,
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans_700Bold',
    textAlign: 'center'
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  overviewTitles: {
    fontSize: 26,
    fontFamily: 'PlusJakartaSans_700Bold',
    textAlign: 'left',
    color: '#0D141C',
    marginBottom: 10
  },
  subtitleBold: {
    fontSize : 18,
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans_700Bold'
  },
  subtitleLight: {
    fontSize : 14,
    color: '#4A6B9C',
    fontFamily: 'PlusJakartaSans_400Regular'
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 26,
    color: '#0D141C',
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  link: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
});

