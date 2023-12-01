import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, Animated, ViewToken } from 'react-native';
import OnboardingItems from '../components/OnboardingItems';
import { OnboardingData } from '../data';
import Paginator from './paginator';

interface CarouselProps { }

const Carousel: React.FC<CarouselProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setCurrentIndex(viewableItems[0]?.index || 0);
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <>
      <FlatList
        data={OnboardingData}
        renderItem={({ item }) => <OnboardingItems item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.text}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}

        className='mt-12'
      />

      <Paginator data={OnboardingData} scrollX={scrollX} />
    </>
  );
};

export default Carousel;
