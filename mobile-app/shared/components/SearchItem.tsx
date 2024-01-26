import React from 'react';
import { Text, View } from 'react-native';
import Image from 'react-native-remote-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import arrow from '@/assets/images/blackArrowUp.svg';
import { SearchItemProps } from '@/types';

export default function SearchItem(props: SearchItemProps) {
  const { image, title, isPopular } = props;
  return (
    <TouchableOpacity
      className="flex-row justify-between items-center py-2.5 border-b-2 border-[#ADADAD]"
    >
      <View className="flex-row items-center">
        <Image source={image} className="rounded-sm w-7 h-7" />
        <Text className="ml-5 text-[#13404D] text-sm">{title}</Text>
      </View>
      {isPopular && <Image source={arrow} className="justify-end w-6 h-5" />}
    </TouchableOpacity>
  );
}
