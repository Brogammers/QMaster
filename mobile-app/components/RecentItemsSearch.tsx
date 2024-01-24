import React from 'react';
import { Text, View } from 'react-native';
import Image from 'react-native-remote-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Recent } from '@/data';
import SearchItem from './SearchItem';

export default function RecentItemsSearch() {
    return (
        <View>
            <Text className='my-3 text-lg font-semibold'>Recent queues</Text>
            <View>
                {Recent.slice(0, 5).map((recent, index) => (
                    <SearchItem Img={recent.Image} Title={recent.Text} key={index} />
                ))}
            </View>
        </View>
    )
}