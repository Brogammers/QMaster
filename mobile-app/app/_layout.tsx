import React, { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
import { SessionProvider } from '@/ctx/AuthContext';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import SplashScreen from './SplashScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from "@/ctx/ThemeContext";
import { CartProvider } from '@/ctx/CartContext';
import { GoogleAuthProvider } from '@/ctx/GoogleAuthContext';

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

  if (showLoading || !loaded) {
    return <SplashScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SessionProvider>
          <GoogleAuthProvider>
            <ThemeProvider>
              <CartProvider>
                <Slot />
              </CartProvider>
            </ThemeProvider>
          </GoogleAuthProvider>
        </SessionProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}