import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Image from 'react-native-remote-svg';
import { FontAwesome6 } from '@expo/vector-icons';
import { SearchItemProps } from '@/types';
import { AntDesign } from '@expo/vector-icons';

export default function SearchItem(props: SearchItemProps) {
  const { image, title, isPopular, isAccount, icon, onPress } = props;

  return (
    <TouchableOpacity
      className={`py-4 border-b-2 border-lite-grey w-full`}
      onPress={(props.onPress)}
    >
      <View
        className={`flex-row items-center justify-between w-full`}
      >
        {isAccount ? (
          <View className="flex-row items-center">
            <FontAwesome6 name={icon} size={30} color="black" className="rounded-sm w-7 h-7" />
            <Text className="ml-5 text-base font-medium text-ignite-black">{title}</Text>
          </View>
        ) : (
          <View className="flex-row items-center">
            <Image source={image} className="rounded-sm w-7 h-7" />
            <Text className={`ml-5 text-${isAccount ? 'ignite-black' : 'concrete-turquoise'} text-${isAccount ? 'base font-medium' : 'sm'}`}>{title}</Text>
          </View>
        )}
        {isAccount ? (
          <AntDesign name="caretright" size={22} color="#3E3E3E" />
        ) : (
          isPopular && <FontAwesome6 name="arrow-up-right-dots" size={24} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
}
