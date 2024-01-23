import React, { useEffect, useState } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Current } from '@/data';
import CurrentQueues from './CurrentQueues';

// Assuming Current is an array of objects with specific types
interface CurrentItem {
    Img: any;
    Name: String;
    People: Number;
    Time: Number;
}

export default function CurrentQueuesList() {
    const windowWidth = useWindowDimensions().width;

    const renderItem = ({ item, index }: { item: CurrentItem, index: number }) => (
        <CurrentQueues Img={item.Img} Name={item.Name} People={item.People} Time={item.Time} key={index} />
    );

    return (
        <View>
            <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: 'bold' }}>Current Queues</Text>
            <Carousel
                data={Current as CurrentItem[]}
                renderItem={renderItem}
                sliderWidth={windowWidth} // Set the width of the slider as per your design
                itemWidth={windowWidth*0.85}   // Set the width of each item as per your design
                layout="stack"
                loop  
            />
        </View>
    );
}
