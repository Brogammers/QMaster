import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import Category from '@/shared/components/Category';
import { Current } from '@/constants';
import { ScrollView } from 'react-native-gesture-handler';

export default function RecentQueues() {
  return (
    <View>
      <Text className='my-3 text-2xl font-bold'>Recent queues</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className=''>
        {Current.map((recent, index) => (
          <View className='mr-2.5' key={index}>
            <Category image={recent.image} title={recent.name} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}