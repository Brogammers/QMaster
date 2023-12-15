import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './Onboarding';
import SignUp from './SignUp';
import Login from './Login';
import Loading from './SplashScreen';

export const unstable_settings = {
  initialRouteName: 'Onboarding',
};


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
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }, [error]);

  if (!loaded || showLoading) {
    return <Loading />;
  }

  return (
    <RootLayoutNav />
  );
}


function RootLayoutNav() {
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator> 
  );
}
