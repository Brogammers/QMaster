import React from "react";
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Image from 'react-native-remote-svg';
import Ellipse from 'assets/images/Ellipse.svg';
import { Dimensions } from 'react-native';
import { CategoryProps } from "@/types";

const { width } = Dimensions.get('window')
const wide = width * 27 / 100

export default function Category(props: CategoryProps) {
  const { image, title, spacing, onPress } = props;
  return (
    <TouchableOpacity className="flex items-center justify-center h-24 bg-white rounded-2xl mb-2.5 " style={{ width: wide }} onPress={onPress}>
      <View>
        <View className="absolute self-center">
          <Ellipse />
        </View>
        <Image
          source={image}
          className='w-12 h-12 rounded-lg'
          style={{ marginBottom: spacing }}
        />
      </View>
      <Text className="px-2 text-center">
        {title}
      </Text>
    </TouchableOpacity>
  )
}

