import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import Category from '@/components/Category';
import { Categories } from '@/data';
import { ScrollView } from 'react-native-gesture-handler';

export default function RecentQueues() {
  return (
    <View>
      <Text className='my-3 text-lg font-semibold'>Recent queues</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className=''>
        {Categories.map((category, index) => (
          <View className='mr-2.5' key={index}>
            <Category Img={category.Image} Title={category.Text} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}