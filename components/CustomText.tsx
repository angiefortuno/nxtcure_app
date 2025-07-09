import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle, Platform } from 'react-native';

interface CustomTextProps extends TextProps {
  weight?: 'regular' | 'bold';
}

export default function CustomText(props: CustomTextProps) {
  // Determine font family based on weight prop or style.fontWeight
  let fontFamily = Platform.select({
    web: 'Plus Jakarta Sans, sans-serif',
    default: 'PlusJakartaSans-Regular',
  });
  if (
    props.weight === 'bold' ||
    (props.style && (Array.isArray(props.style)
      ? (props.style as (TextStyle | undefined)[]).filter(Boolean).some((s) => s?.fontWeight === 'bold' || s?.fontWeight === '700')
      : (props.style as TextStyle)?.fontWeight === 'bold' || (props.style as TextStyle)?.fontWeight === '700'))
  ) {
    fontFamily = Platform.select({
      web: 'Plus Jakarta Sans, sans-serif',
      default: 'PlusJakartaSans-Bold',
    });
  }

  return (
    <Text
      {...props}
      style={[styles.text, { fontFamily }, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#4A739C',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    // fontVariant: ['discretionaryLigatures'], // Uncomment if supported
  },
}); 