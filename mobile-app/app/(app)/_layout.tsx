import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useSession } from '@/ctx/AuthContext';
import SplashScreen from '../SplashScreen';

export default function AppEntry() {
  const { session } = useSession();

  // if (isLoading) {
  //   return <SplashScreen />;
  // }

  if (!session) {
    return <Redirect href="/(auth)/Onboarding" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
}
