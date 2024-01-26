import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { Current } from '@/data';
import CurrentQueues from '../shared/components/CurrentQueues';
import Carousel from 'react-native-reanimated-carousel';

interface CurrentItem {
  Img: any;
  Name: String;
  People: Number;
  Time: Number;
}

export default function CurrentQueuesList() {
  const windowWidth = useWindowDimensions().width;
  const carouselWidth = windowWidth * 0.85; // 85% of the screen width

  const renderItem = ({ item, index }: { item: CurrentItem, index: number }) => (
    <CurrentQueues Img={item.Img} Name={item.Name} People={item.People} Time={item.Time} key={index} isLeave isCurrent />
  );

  return (
    <View>
      <Text style={{ marginVertical: 10, fontSize: 24, fontWeight: 'bold' }}>Current Queues</Text>
      <Carousel
        loop
        width={carouselWidth}
        height={166}
        data={Current}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
          parallaxAdjacentItemScale: 0.8,
        }}
      />
    </View>
  );
}
