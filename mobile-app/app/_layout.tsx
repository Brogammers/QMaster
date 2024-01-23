import React, { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
// import * as AuthContextHook from '@/ctx/AuthContext';
import { SessionProvider } from '@/ctx/AuthContext';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import SplashScreen from './SplashScreen';


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
    return <SplashScreen />;
  }

  return (
    <RootLayoutNav />
  );
}


function RootLayoutNav() {
  return (
    <Provider store={store}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </Provider>
  );
}