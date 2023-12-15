import React, { useState, useRef } from 'react';
import { FlatList, Animated, ViewToken } from 'react-native';
import { OnboardingData } from '@/data';
import OnboardingItems from './OnboardingItems';
import Paginator from './Paginator';

export default function Carousel() {
 
  const scrollX = useRef(new Animated.Value(0)).current;

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
        viewabilityConfig={viewConfig}

        className='mt-12'
      />

      <Paginator data={OnboardingData} scrollX={scrollX} />
    </>
  );
};
