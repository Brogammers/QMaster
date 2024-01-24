import React from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-remote-svg';
import Ellipse from '../assets/images/Ellipse.svg';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window')
const wide = width * 27 / 100

interface CategoryProps {
  Img: any,
  Title: String,
}

export default function Category(props: CategoryProps) {
  const { Img, Title } = props;
  return (
    <TouchableOpacity className="flex items-center justify-center h-24 bg-white rounded-2xl mb-2.5 " style={{ width: wide }}>
      <View>
        <View className="absolute self-center">
          <Image source={Ellipse} />
        </View>
        <Image source={Img} className = ' w-[48] h-[48] rounded-lg'/>
      </View>
      <Text className="px-2">{Title}</Text>
    </TouchableOpacity>
  )
}

