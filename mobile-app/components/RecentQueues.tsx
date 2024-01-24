import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import Category from '@/components/Category';
import { Recent } from '@/data';
import { ScrollView } from 'react-native-gesture-handler';

export default function RecentQueues() {
  return (
    <View>
      <Text className='my-3 text-2xl font-bold'>Recent queues</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className=''>
        {Recent.map((recent, index) => (
          <View className='mr-2.5' key={index}>
            <Category Img={recent.Image} Title={recent.Text} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}