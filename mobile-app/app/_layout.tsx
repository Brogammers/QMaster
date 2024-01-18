import React, { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '@/ctx/AuthContext';
import { useFonts } from 'expo-font';


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

// function MainUI() {
//   return (
//     <NavigationContainer independent>
//       <Tab.Navigator
//         initialRouteName='Home'
//         screenOptions={{
//           tabBarActiveTintColor: '#00FFFF',
//           tabBarInactiveTintColor: '#FAFAFA',
//           headerShown: false,
//           tabBarStyle: {
//             backgroundColor: '#17222D',
//             height: 60,
//             display: 'flex',
//             justifyContent: 'space-around',
//             paddingBottom: 10,
//             paddingTop: 10,
//           }
//         }}
//       >
//         <Tab.Screen
//           name="Home"
//           component={Home}
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <Entypo name="home" size={24} color={focused ? '#00FFFF' : '#FAFAFA'} />
//             )
//           }} />
//         <Tab.Screen name="History"
//           component={History}
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <FontAwesome name="history" size={24} color={focused ? '#00FFFF' : '#FAFAFA'} />
//             )
//           }} />
//         <Tab.Screen name="Account"
//           component={Account}
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <MaterialCommunityIcons name="account" size={24} color={focused ? '#00FFFF' : '#FAFAFA'} />
//             )
//           }} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   )
// }
