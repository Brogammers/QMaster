import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Image from 'react-native-remote-svg';
import { FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { SearchItemProps } from '@/types';
import { AntDesign } from '@expo/vector-icons';

export default function SearchItem(props: SearchItemProps) {
  const { image, title, isPopular, isAccount, icon, onPress } = props;

  return (
    <TouchableOpacity
      className={`py-${isAccount ? '4' : '2.5'} border-b-2 border-[#ADADAD] w-full`}
      onPress={(props.onPress)}
    >
      <View
        className={`flex-row items-center justify-between w-full px-${isAccount ? '7' : '0'}`}
      >
        {isAccount ? (
          <View className="flex-row">
            <FontAwesome name={icon} size={22} color="black" className="rounded-sm w-7 h-7" />
            <Text className="ml-5 text-[#3E3E3E] text-base font-medium">{title}</Text>
          </View>
        ) : (
          <View className="flex-row">
            <Image source={image} className="rounded-sm w-7 h-7" />
            <Text className={`ml-5 text-${isAccount ? '[#3E3E3E]' : '[#13404D]'} text-${isAccount ? 'base font-medium' : 'sm'}`}>{title}</Text>
          </View>
        )}
        {isAccount ? (
          <AntDesign name="caretright" size={24} color="#3E3E3E" />
        ) : (
          isPopular && <FontAwesome6 name="arrow-up-right-dots" size={24} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
}
