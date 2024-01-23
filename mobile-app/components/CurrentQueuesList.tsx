import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Current } from '@/data';
import { ScrollView } from 'react-native-gesture-handler';
import CurrentQueues from './CurrentQueues';

export default function CurrentQueuesList() {
    return (
        <View>
            <Text className='my-3 text-lg font-semibold'>Current Queues </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Current.map((currentQueue, index) => (
                    <CurrentQueues Img={currentQueue.Img} Name={currentQueue.Name} People={currentQueue.People} Time={currentQueue.Time} key={index} />
                ))}
            </ScrollView
        </View>
    )
}