import React from 'react';
import { Stack ,Redirect } from 'expo-router';
import { useSession } from '@/ctx/AuthContext';
import { Text } from '@/components/Themed';


export default function AppEntry() {
  const { session, isLoading } = useSession();
  
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/Onboarding" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  )
}
