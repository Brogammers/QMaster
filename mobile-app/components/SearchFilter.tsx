import React from 'react';
import { View } from 'react-native';
import { SearchFilterProps } from '@/types';
import SearchItem from '@/shared/components/SearchItem';

export default function SearchFilter({ data, input, isDarkMode }: SearchFilterProps) {
  return (
    <View>
      {data
        .filter((item: any) => {
          if (input === '') {
            return item;
          } else if (item.name.toLowerCase().includes(input.toLowerCase())) {
            return item;
          }
        })
        .map((item: any, index: number) => (
          <SearchItem
            key={index}
            image={item.image}
            title={item.name}
            isPopular={true}
            isDarkMode={isDarkMode}
          />
        ))}
    </View>
  );
}
