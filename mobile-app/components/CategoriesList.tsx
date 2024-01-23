import React from 'react';
import { Text, TextInput } from 'react-native';
import { View } from 'react-native';
import Category from '@/components/Category';
import { Categories } from '@/data';

export default function CategoriesList() {
    return (
        <View>
            <Text className='my-3 text-lg font-semibold'>Categories</Text><View className='flex flex-row flex-wrap self-center justify-between'>
                {Categories.map((category, index) => (
                    <Category Img={category.Image} Title={category.Text} key={index} />
                ))}
            </View>
        </View>
    )
}