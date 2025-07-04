import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import Loader from '@/components/Loader';

export default function IndexScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      router.replace('/welcome');
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return null;
}

export const options = {
  headerShown: false,
};
