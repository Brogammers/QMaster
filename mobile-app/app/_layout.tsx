import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './Onboarding';
import SignUp from './SignUp';
import Login from './Login';
import Loading from './SplashScreen';
import EmailVerification from './EmailVerification';
import Home from './(tabs)/_layout';
import { useAuth } from '@/hooks/useAuth';
import { SessionProvider } from '@/ctx/AuthContext';   // Added this import
import SplashScreen from './SplashScreen';
import { ErrorBoundary } from 'expo-router';   // Added this import

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present
  initialRouteName: 'index',   // Adjusted initial route name as needed
};

// Prevent the splash screen from auto-hiding before asset loading is complete
// SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

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
    return <Loading />;
  }

  return (
    <SessionProvider>
      <RootLayoutNav />
    </SessionProvider>
  );
}


function RootLayoutNav() {
  const { authInitialized, user } = useAuth();

  return (
    <Stack.Navigator initialRouteName="EmailVerification" screenOptions={{ headerShown: false }}>
      {/* Common screens */}
      <Stack.Group>
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Group>

      {/* Screens for logged in users */}
      <Stack.Group>
        <Stack.Screen name='_layout' component={Home} />
      </Stack.Group>
    </Stack.Navigator> 
  );
}

