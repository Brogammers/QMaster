import React from "react";
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Image from 'react-native-remote-svg';
import Ellipse from 'assets/images/Ellipse.svg';
import { Dimensions } from 'react-native';
import { CategoryProps } from "@/types";

const { width } = Dimensions.get('window')
const wide = width * 27 / 100

interface ExtendedCategoryProps extends CategoryProps {
  isDarkMode?: boolean;
}

export default function CategoryPop(props: ExtendedCategoryProps) {
  const { image, title, spacing, onPress, isDarkMode } = props;
  return (
    <TouchableOpacity 
      className={`flex items-center justify-center h-24 rounded-2xl mb-2.5 ${
        isDarkMode ? 'bg-slate-800/60 border border-slate-700' : 'bg-white'
      }`} 
      style={{ width: wide }} 
      onPress={onPress}
    >
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
      <Text className={`px-2 text-center ${isDarkMode ? 'text-white' : 'text-coal-black'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

