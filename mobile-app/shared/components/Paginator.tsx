import React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions, StyleProp, ViewStyle } from 'react-native';
import { PaginatorProps } from '@/types';


export default function Paginator({ data, scrollX }: PaginatorProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: 'row', marginTop: 40 }} >
      { data.map((_, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              { width: dotWidth, opacity } as StyleProp<ViewStyle>,
            ]}
            key={i}
          />
        );
      })}
    </View>
  );
};


const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#493d8a',
    marginHorizontal: 8,
  }
});
