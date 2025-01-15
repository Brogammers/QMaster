import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

type RootStackParamList = {
  Orders: undefined;
  OrderDetails: {
    order: {
      id: string;
      customerName: string;
      location: {
        name: string;
        address: string;
        coordinates: {
          latitude: number;
          longitude: number;
        }
      };
      total: number;
      date: string;
      status: 'completed' | 'pending' | 'cancelled';
    };
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'OrderDetails'>;

export default function OrderDetails() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { order } = route.params;

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
        <ScrollView 
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            entering={FadeInDown.duration(1000)}
            className="items-center mt-8 mb-6"
          >
            <MaterialCommunityIcons 
              name={order.status === 'completed' ? "check-circle" : order.status === 'pending' ? "clock-outline" : "close-circle"} 
              size={80} 
              color={isDarkMode ? '#FFFFFF' : '#17222D'} 
            />
            <Text className={`text-2xl font-bold mt-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              Order {order.status === 'completed' ? 'Completed' : order.status === 'pending' ? 'Pending' : 'Cancelled'}
            </Text>
            <Text className={`text-lg mt-2 ${isDarkMode ? 'text-white/70' : 'text-slate-grey'}`}>
              {new Date(order.date).toLocaleDateString()}
            </Text>
          </Animated.View>

          <Animated.View 
            entering={FadeIn.delay(500).duration(1000)}
            className={`p-4 rounded-xl mb-4 ${isDarkMode ? 'bg-slate-grey/80' : 'bg-slate-grey/10'}`}
          >
            <Text className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              Order Details
            </Text>
            <View className="mb-4">
              <Text className={`text-sm uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white/50' : 'text-slate-grey'}`}>
                Order Number
              </Text>
              <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                {order.id}
              </Text>
            </View>
            <View className="mb-4">
              <Text className={`text-sm uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white/50' : 'text-slate-grey'}`}>
                Customer Name
              </Text>
              <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                {order.customerName}
              </Text>
            </View>
            <View>
              <Text className={`text-sm uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white/50' : 'text-slate-grey'}`}>
                Pickup Location
              </Text>
              <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                {order.location.name}
              </Text>
            </View>
          </Animated.View>

          <Animated.View 
            entering={FadeIn.delay(1000).duration(1000)}
            className="mb-4"
          >
            <TouchableOpacity
              className={`p-4 rounded-xl ${isDarkMode ? 'bg-slate-grey/80' : 'bg-slate-grey/10'}`}
              onPress={() => {}}
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons 
                  name="map-marker" 
                  size={24} 
                  color={isDarkMode ? '#FFFFFF' : '#17222D'} 
                />
                <View className="ml-3 flex-1">
                  <Text className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
                    {order.location.name}
                  </Text>
                  <Text className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-slate-grey'}`}>
                    {order.location.address}
                  </Text>
                </View>
                <MaterialCommunityIcons 
                  name="chevron-right" 
                  size={24} 
                  color={isDarkMode ? '#FFFFFF70' : '#17222D70'} 
                />
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View 
            entering={FadeIn.delay(1500).duration(1000)}
            className={`p-4 rounded-xl mb-6 items-center ${isDarkMode ? 'bg-slate-grey/80' : 'bg-slate-grey/10'}`}
          >
            <Text className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              Your Pickup QR Code
            </Text>
            <View className={`p-8 rounded-xl ${isDarkMode ? 'bg-white' : 'bg-white'}`}>
              <MaterialCommunityIcons 
                name="qrcode" 
                size={160} 
                color="#000000"
              />
            </View>
            <Text className={`text-sm mt-4 text-center ${isDarkMode ? 'text-white/70' : 'text-slate-grey'}`}>
              Show this QR code to the merchant to collect your order
            </Text>
          </Animated.View>

          <TouchableOpacity 
            className={`w-full py-4 rounded-xl mb-6 ${isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'}`}
            onPress={() => navigation.navigate('Orders')}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Back to Orders
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
