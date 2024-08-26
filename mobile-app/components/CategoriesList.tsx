import React from 'react';
import { I18nManager, Text } from 'react-native';
import { View } from 'react-native';
import Category from '@/shared/components/Category';
import { Categories } from '@/constants';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import i18n from '@/i18n';

export default function CategoriesList() {  

  const navigation = useNavigation() as NavigationProp<any>;
  
  return (
    <View className={`flex flex-col ${I18nManager.isRTL ? "items-start" : "items-end"}`}>
      <Text className="my-3 text-2xl font-bold">
        {i18n.t('categories')}
      </Text>
      <View className='w-full flex flex-row flex-wrap self-center justify-between'>
        {Categories.map((category, index) => (
          <Category
            key={index}
            title={category.title}
            image={category.image}
            onPress={() => navigation.navigate('Brands', {
              categoryName: category.title
            })}
          />
        ))}
      </View>
    </View>
  )
}