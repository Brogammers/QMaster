import React, { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
// import * as AuthContextHook from '@/ctx/AuthContext';
import { AuthProvider } from '@/ctx/AuthContext';
import { useFonts } from 'expo-font';
import AppEntry from './(app)/(tabs)/_layout';
import Search from './Search';


export default function RootLayout() {
  const [loaded, error] = useFonts({
    InterBold: require('../assets/fonts/static/Inter-Bold.ttf'),
    JostBold: require('../assets/fonts/static/Jost-Bold.ttf'),
    JostReg: require('../assets/fonts/static/Jost-Regular.ttf'),
    IstokBold: require('../assets/fonts/static/IstokWeb-Bold.ttf'),
  });

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (error) throw error;

    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!loaded || showLoading) {
    return null;
  }

  return (
    <RootLayoutNav />
  );
}


function RootLayoutNav() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
    
  );
}