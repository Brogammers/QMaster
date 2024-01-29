import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Category from '@/shared/components/Category';
import { Current } from '@/constants';

export default function RecentQueues() {
  return (
    <View>
      <Text className='my-3 text-2xl font-bold'>Recent queues</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className=''>
        {Current.map((recent, index) => (
          <View className='mr-2.5' key={index}>
            <Category
              title={recent.name}
              image={recent.image}
              spacing={8}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}