import React from 'react';
import { Stack } from 'expo-router';

export default function AppEntry() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  )
}