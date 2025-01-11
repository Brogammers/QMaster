import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Category from '@/shared/components/Category';
import Return from '@/shared/components/Return';
import { AllCategories as CategoryList } from '@/constants';
import i18n from '@/i18n';

interface CategoryProps {
  title: string;
  image: any;
}

export default function AllCategories() {
  const linkTo = useLinkTo();

  const handleCategoryPress = (category: CategoryProps) => {
    linkTo(`/(app)/(tabs)/brands/${encodeURIComponent(category.title)}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-off-white">
      <View className="flex-row items-center p-4">
        <Return size={24} color="black" />
        <Text className="text-2xl font-bold">
          {i18n.t('allCategories')}
        </Text>
      </View>
      <ScrollView>
        <View className="p-4">
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
    </SafeAreaView>
  );
} 