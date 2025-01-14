import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Cart() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

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
            <TouchableOpacity onPress={() => navigation.navigate('Store')}>
              <MaterialCommunityIcons 
                name="arrow-left" 
                size={24} 
                color={isDarkMode ? '#FFFFFF' : '#17222D'} 
              />
            </TouchableOpacity>
            <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
              Shopping Cart
            </Text>
            <View style={{ width: 24 }} />
          </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          className="flex-1 px-6"
        >
          <Text className={`text-base ${isDarkMode ? 'text-white/70' : 'text-slate-grey'}`}>
            Your cart is empty
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
