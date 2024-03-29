import React from 'react';
import { Text, View } from 'react-native';
import { Current } from '@/constants';
import SearchItem from '../shared/components/SearchItem';

export default function RecentItemsSearch() {
  return (
    <View>
      <Text className='my-3 text-lg font-semibold'>Recent queues</Text>
      <View>
        {Current.slice(0, 5).map((recent, index) => (
          <SearchItem image={recent.image} title={recent.name} key={index} />
        ))}
      </View>
    </View>
  )
}