import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { Carousel, Pagination } from 'react-native-snap-carousel';
import { Current } from '@/constants';
import CurrentQueues from '@/shared/components/CurrentQueues';
import { CurrentItem } from '@/types';

export default function CurrentQueuesList() {
  const windowWidth = useWindowDimensions().width;
  const carouselWidth = windowWidth * 0.85; // 85% of the screen width
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderItem = ({ item, index }: { item: CurrentItem, index: number }) => (
    <CurrentQueues image={item.image} name={item.name} people={item.people} time={item.time} key={index} isLeave isCurrent />
  );

  return (
    <View>
      <Text style={{ marginVertical: 10, fontSize: 24, fontWeight: 'bold' }}>Current Queues</Text>
      <Carousel
        data={Current as CurrentItem[]}
        renderItem={renderItem}
        sliderWidth={carouselWidth}
        itemWidth={carouselWidth}
        onSnapToItem={(index: number) => setActiveSlide(index)} // Update active slide index
        layout="default"
      />
      <Pagination
        dotsLength={Current.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingTop: 10, paddingBottom: 0 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0, // Adjust this value to make dots closer together
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}
