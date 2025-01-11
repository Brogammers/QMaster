import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import Category from '@/shared/components/Category';
import { AllCategories as CategoryList } from '@/constants';
import i18n from '@/i18n';

interface CategoryProps {
  title: string;
  image: any;
}

export default function AllCategories() {
  const linkTo = useLinkTo();

  const handleCategoryPress = (category: CategoryProps) => {
    linkTo(`/Brands/${encodeURIComponent(category.title)}`);
  };

  return (
    <ScrollView className="flex-1 bg-off-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">
          {i18n.t('allCategories')}
        </Text>
        <View className="flex flex-row flex-wrap justify-between">
          {CategoryList.map((category: CategoryProps, index: number) => (
            <Category
              key={index}
              title={category.title}
              image={category.image}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
} 