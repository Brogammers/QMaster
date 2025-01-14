import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';

export default function Store() {
  const { isDarkMode } = useTheme();
  const linkTo = useLinkTo();
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', 'Food', 'Drinks', 'Snacks', 'Essentials'];

  return (
    <View className="flex-1">
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
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4">
          <TouchableOpacity onPress={() => linkTo('/partner')}>
            <MaterialCommunityIcons 
              name="arrow-left" 
              size={24} 
              color={isDarkMode ? '#FFFFFF' : '#17222D'} 
            />
          </TouchableOpacity>
          <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
            Store
          </Text>
          <View style={{ width: 24 }} /> {/* Placeholder for symmetry */}
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          className="flex-1 px-6"
        >
          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="py-4"
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full mr-2 ${
                  selectedCategory === category 
                    ? isDarkMode ? 'bg-baby-blue' : 'bg-ocean-blue'
                    : isDarkMode ? 'bg-slate-grey' : 'bg-slate-grey/10'
                }`}
              >
                <Text className={
                  selectedCategory === category
                    ? 'text-white font-semibold'
                    : isDarkMode ? 'text-white/70' : 'text-slate-grey'
                }>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Product Grid Placeholder */}
          <View className="flex-row flex-wrap justify-between mt-4">
            {[1, 2, 3, 4].map((item) => (
              <View 
                key={item}
                className={`w-[48%] aspect-square rounded-xl mb-4 ${
                  isDarkMode ? 'bg-slate-grey' : 'bg-slate-grey/10'
                }`}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
} 