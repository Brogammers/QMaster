import configConverter from '@/api/configConverter';
import arabiata from '@/assets/images/arabiata.png';
import { useTheme } from '@/ctx/ThemeContext';
import QueueCard from '@/shared/components/QueueCard';
import { CurrentQueuesProps } from '@/types';
import { useLinkTo } from '@react-navigation/native';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const page = 1;
const perPage = 5;

export default function Category() {
  const { name } = useLocalSearchParams<{ name: string }>();  
  const categoryName = name; //i18n.t(name);
  const linkTo = useLinkTo();
  const { isDarkMode } = useTheme();
  const [current, setCurrent] = useState<CurrentQueuesProps[]>([]);

  const handleBrandPress = (brand: any) => {    
    linkTo('/Partner');
    router.setParams({ 
      brandName: brand.name, 
      image: brand.image 
    });
  };

  useEffect(() => {
    const url = configConverter("EXPO_PUBLIC_API_BASE_URL_GET_BUSINESSES_BY_CATEGORY");

    axios.get(`${url}?category=${name}&page=${page}&per-page=${perPage}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data.businesses.content;
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => { 
          const currentQueues = data.map((business: any) => {
            return {
              id: business.id,
              name: business.name,
              image: arabiata,
              time: 20,
              people: 20
            };
          });

          setCurrent(currentQueues);
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
          {current.map((brand, index) => (
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
