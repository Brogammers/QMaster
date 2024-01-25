import React from 'react';
import { Text, View } from 'react-native';
import { Recent } from '@/data';
import SearchItem from '../shared/components/SearchItem';

export default function RecentItemsSearch() {
    return (
        <View>
            <Text className='my-3 mt-8 text-lg font-semibold'>Popular Queues</Text>
            <View>
                {Recent.slice(0, 5).map((recent, index) => (
                    <SearchItem Img={recent.Image} Title={recent.Text} key={index} isPopular/>
                ))}
            </View>
        </View>
    )
}