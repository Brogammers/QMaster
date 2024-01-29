import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import CurrentQueues from '@/shared/components/CurrentQueues';
import { default as QueueCarousel } from 'react-native-reanimated-carousel';
import { Current } from '@/constants'
import { CurrentQueuesProps } from '@/types';

export default function CurrentQueuesList() {
  const windowWidth = useWindowDimensions().width;
  const carouselWidth = windowWidth * 0.85; // 85% of the screen width

  const renderItem = ({ item, index }: { item: CurrentQueuesProps, index: number }) => (
    <CurrentQueues
      image={item.image}
      name={item.name}
      people={item.people}
      time={item.time}
      key={index}
      isLeave
      isCurrent
    />
  );

  return (
    <View>
      <Text style={{ marginVertical: 10, fontSize: 24, fontWeight: 'bold' }}>Current Queues</Text>

      {/* Here is proof that the merge works  */}
      <QueueCarousel
        loop={false}
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
