import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import Category from '@/shared/components/Category';
import { Categories } from '@/constants';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function CategoriesList() {  

  const navigation = useNavigation() as NavigationProp<any>;
  
  return (
    <View>
      <Text className='my-3 text-2xl font-bold'>
        Categories
      </Text>
      <View className='flex flex-row flex-wrap self-center justify-between'>
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