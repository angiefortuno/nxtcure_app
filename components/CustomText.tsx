import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

export default function CustomText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[styles.text, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#4A739C',
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    // fontVariant: ['discretionaryLigatures'], // Uncomment if supported
  },
}); 