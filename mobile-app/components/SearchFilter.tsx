import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SearchFilterProps } from '@/types';
import SearchItem from '@/shared/components/SearchItem';
import configConverter from '@/api/configConverter';
import axios from 'axios';

export default function SearchFilter({ page, perPage, input, isDarkMode }: SearchFilterProps) {
  const [data, setData] = useState([]);

  useEffect(() => {    
    const url = configConverter("EXPO_PUBLIC_API_BASE_URL_SEARCH");
    axios.get(`${url}?filter=${input}&page=${page}&per-page=${perPage}&order=-peopleInQueue`).then((res) => {
      if(res.data) {
        setData(res.data.queues.content);
      }
    });
  }, [input]);

  return (
    <View>
      {data
        .map((item: any, index: number) => (
          <SearchItem
            key={index}
            image={null}
            title={item.name}
            isPopular={true}
            isDarkMode={isDarkMode}
          />
        ))}
    </View>
  );
}
