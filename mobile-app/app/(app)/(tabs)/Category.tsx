import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { Current } from '@/constants';
import i18n from '@/i18n';
import QueueCard from '@/shared/components/QueueCard';
import { useTheme } from '@/ctx/ThemeContext';
import configConverter from '@/api/configConverter';
import axios from 'axios';

const page = 1;
const perPage = 5;

export default function Category() {
  const { name } = useLocalSearchParams<{ name: string}>();  
  const categoryName = name; //i18n.t(name);
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

  useEffect(() => {
    const url = configConverter("EXPO_PUBLIC_API_BASE_URL_GET_BUSINESSES_BY_CATEGORY");

    axios.get(`${url}?category=${name}&page=${page}&per-page=${perPage}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => { 
          const businesses = data.businesses.content
          console.log(businesses);
          
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }, [name]);

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-off-white'}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <Text className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-ocean-blue'}`}>
            {categoryName}
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
