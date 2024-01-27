import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import Category from '@/shared/components/Category';
import { Categories } from '@/constants';

export default function CategoriesList() {
    return (
        <View>
            <Text className='my-3 text-2xl font-bold'>
                Categories
            </Text>
            <View className='flex flex-row flex-wrap self-center justify-between'>
                {Categories.map((category, index) => (
                    <Category image={category.image} title={category.title} key={index} />
                ))}
            </View>
        </View>
    )
}