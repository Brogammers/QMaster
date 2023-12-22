import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './Onboarding';
import SignUp from './SignUp';
import Login from './Login';
import EmailVerification from './EmailVerification';
import Home from './(tabs)/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import History from './(tabs)/History';
import Account from './(tabs)/Account';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


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
    return <MainUI />;
  }

  return (
    <MainUI />
  );
}


function Authentication() {
  return (
    <Stack.Navigator initialRouteName="EmailVerification" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function MainUI() {
  return (
    <NavigationContainer independent>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          tabBarActiveTintColor: '#00FFFF',
          tabBarInactiveTintColor: '#FAFAFA',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#17222D',
            height: 60,
            display: 'flex',
            justifyContent: 'space-around',
            paddingBottom: 10,
            paddingTop: 10,
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo name="home" size={24} color={focused ? '#00FFFF' : '#FAFAFA'} />
            )
          }} />
        <Tab.Screen name="History"
          component={History}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome name="history" size={24} color={focused ? '#00FFFF' : '#FAFAFA'} />
            )
          }} />
        <Tab.Screen name="Account"
          component={Account}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name="account" size={24} color={focused ? '#00FFFF' : '#FAFAFA'} />
            )
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
