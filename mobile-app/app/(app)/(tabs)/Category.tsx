import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Current } from '@/constants';
import i18n from '@/i18n';
import QueueCard from '@/shared/components/QueueCard';
import { useTheme } from '@/ctx/ThemeContext';

export default function Category() {
  const { name } = useLocalSearchParams();
  const categoryName = decodeURIComponent(String(name));
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const handleBrandPress = (brand: any) => {
    router.push({
      pathname: "/(app)/(tabs)/Partner",
      params: { 
        brandName: brand.name,
        image: brand.image
      }
    });
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-off-white'}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <Text className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-ocean-blue'}`}>
            {i18n.t(categoryName)}
          </Text>
          {Current.map((brand, index) => (
            <QueueCard
              key={index}
              name={brand.name}
              image={brand.image}
              time={brand.time}
              people={brand.people}
              onPress={() => handleBrandPress(brand)}
              isDarkMode={isDarkMode}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
