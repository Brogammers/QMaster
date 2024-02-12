import React, { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
// import * as AuthContextHook from '@/ctx/AuthContext';
import { SessionProvider, useAuth } from '@/ctx/AuthContext';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import SplashScreen from './SplashScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    InterBold: require('../assets/fonts/static/Inter-Bold.ttf'),
    JostBold: require('../assets/fonts/static/Jost-Bold.ttf'),
    JostReg: require('../assets/fonts/static/Jost-Regular.ttf'),
    IstokBold: require('../assets/fonts/static/IstokWeb-Bold.ttf'),
  });

  const { session } = useAuth(); // Use useAuth to get the session

  const [showLoading, setShowLoading] = useState(true);

  // useEffect(() => {
  //   if (error) throw error;

  //   const timer = setTimeout(() => {
  //     setShowLoading(false);
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [error]);

  // useEffect(() => {
  //   if (session !== null && session !== undefined) {
  //     setShowLoading(false);
  //   }
  // }, [session]);

  useEffect(() => {
    if (error) throw error;

    if (session !== null && session !== undefined) {
      setShowLoading(false);
    } else {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, session]);

  if (showLoading || !loaded) {
    return <SplashScreen />;
  }

  return (
    <RootLayoutNav />
  );
}


function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </Provider>
      {/* <QueuePage /> */}
    </GestureHandlerRootView>
  );
}