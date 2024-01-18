import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './(tabs)/index';
import History from './(tabs)/History';
import Account from './(tabs)/Account';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppEntry() {
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