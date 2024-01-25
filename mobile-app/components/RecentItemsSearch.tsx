import React from 'react';
import { Text, View } from 'react-native';
import { Recent } from '@/constants';
import SearchItem from '../shared/components/SearchItem';

export default function RecentItemsSearch() {
    return (
        <View>
            <Text className='my-3 text-lg font-semibold'>Recent queues</Text>
            <View>
                {Recent.slice(0, 5).map((recent, index) => (
                    <SearchItem image={recent.image} title={recent.text} key={index} />
                ))}
            </View>
        </View>
    )
}