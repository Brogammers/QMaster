import React from 'react';
import { View, ScrollView, I18nManager } from 'react-native';
import Category from '@/shared/components/CategoryPop';
import { AllCategories as CategoryList } from '@/constants';
import { useLinkTo } from '@react-navigation/native';
import { useTheme } from '@/ctx/ThemeContext';

interface CategoryProps {
  title: string;
  image: any;
}

export default function AllCategories() {
  const linkTo = useLinkTo();
  const { isDarkMode } = useTheme();

  const handleCategoryPress = (category: CategoryProps) => {
    linkTo(`/Category/${encodeURIComponent(category.title)}`);
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-slate-900' : 'bg-off-white'}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <View className={`flex flex-row flex-wrap ${I18nManager.isRTL ? 'justify-end' : 'justify-start'} gap-x-4`}>
            {CategoryList.map((category: CategoryProps, index: number) => (
              <View key={index} className="mb-4">
                <Category
                  title={category.title}
                  image={category.image}
                  onPress={() => handleCategoryPress(category)}
                  isDarkMode={isDarkMode}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 