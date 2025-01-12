import React from 'react';
import { I18nManager, Text, View } from 'react-native';
import CategoryPop from '@/shared/components/CategoryPop';
import { Categories } from '@/constants';
import i18n from '@/i18n';
import { useLinkTo } from '@react-navigation/native';

interface CategoriesListProps {
  isDarkMode?: boolean;
}

export default function CategoriesList({ isDarkMode }: CategoriesListProps) {  
  const linkTo = useLinkTo();
  
  const handleCategoryPress = (category: any) => {
    if (category.title === i18n.t('others')) {
      linkTo('/AllCategories');
    } else {
      linkTo(`/Category/${encodeURIComponent(category.title)}`);
    }
  };

  return (
    <View className="flex flex-col">
      <Text className={`my-3 text-2xl font-bold text-left ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
        {i18n.t('categories')}
      </Text>
      <View className="w-full flex flex-row flex-wrap self-center justify-between">
        {Categories.map((category, index) => (
          <CategoryPop
            key={index}
            title={category.title}
            image={category.image}
            onPress={() => handleCategoryPress(category)}
            isDarkMode={isDarkMode}
          />
        ))}
      </View>
    </View>
  );
}