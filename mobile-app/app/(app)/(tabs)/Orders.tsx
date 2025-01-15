import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';

// Mock data for orders
const MOCK_ORDERS = [
  {
    id: 'ORD-123456',
    date: '2024-03-10',
    location: 'Madinaty Store',
    status: 'completed',
    total: 299.99
  },
  {
    id: 'ORD-123457',
    date: '2024-03-09',
    location: 'Maadi Store',
    status: 'pending',
    total: 149.99
  },
  // Add more mock orders as needed
];

export default function Orders() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return isDarkMode ? 'text-green-400' : 'text-green-600';
      case 'pending':
        return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
      default:
        return isDarkMode ? 'text-white/70' : 'text-slate-grey';
    }
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View className={`absolute top-0 left-0 right-0 bottom-0 ${isDarkMode ? 'bg-ocean-blue' : 'bg-off-white'}`}>
        {!isDarkMode && (
          <LinearGradient
            colors={['rgba(0, 119, 182, 0.1)', 'rgba(255, 255, 255, 0)']}
            className="absolute top-0 w-full h-64"
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        )}
      </View>

      <SafeAreaView className="flex-1" edges={['top', 'bottom', 'left', 'right']}>
        <View className="px-6">
          <View className="flex-row justify-between items-center py-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons 
                name="arrow-left" 
                size={24} 
                color={isDarkMode ? '#FFFFFF' : '#17222D'} 
              />
            </TouchableOpacity>
            <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              Orders
            </Text>
            <View style={{ width: 24 }} />
          </View>
        </View>

        <ScrollView 
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          {MOCK_ORDERS.map((order, index) => (
            <Animated.View
              key={order.id}
              entering={FadeIn.delay(index * 100)}
              className={`mb-3 p-4 rounded-xl ${isDarkMode ? 'bg-slate-grey' : 'bg-slate-grey/10'}`}
            >
              <TouchableOpacity>
                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                      {order.id}
                    </Text>
                    <Text className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-slate-grey'}`}>
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Text>
                  </View>
                  <Text className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                    ${order.total}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons 
                      name="map-marker" 
                      size={16} 
                      color={isDarkMode ? '#FFFFFF70' : '#17222D70'} 
                    />
                    <Text className={`ml-1 text-sm ${isDarkMode ? 'text-white/70' : 'text-slate-grey'}`}>
                      {order.location}
                    </Text>
                  </View>
                  <Text className={`capitalize text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
} 