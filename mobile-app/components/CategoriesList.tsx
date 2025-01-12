import React from 'react';
import { I18nManager, Text, View } from 'react-native';
import Category from '@/shared/components/Category';
import { Categories } from '@/constants';
import i18n from '@/i18n';
import { useRouter } from 'expo-router';
import { useLinkTo } from '@react-navigation/native';

export default function CategoriesList() {  
  const router = useRouter();
  const linkTo = useLinkTo();
  
  const handleCategoryPress = (category: { title: string }) => {
    if (category.title === i18n.t('others')) {
      linkTo('/AllCategories');
    } else {
      linkTo(`/Category`);
    }
  };

  return (
    <View className="bg-off-white flex flex-col">
      <Text className="my-3 text-2xl font-bold text-left">
        {i18n.t('categories')}
      </Text>
      <View className="w-full flex flex-row flex-wrap self-center justify-between">
        {Categories.map((category, index) => (
          <Category
            key={index}
            title={category.title}
            image={category.image}
            onPress={() => handleCategoryPress(category)}
          />
        ))}
      </View>
    </View>
  );
}