import React from 'react';
import { Text, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export default function FrequentlyAsked() {
  return (
    <TouchableOpacity className='flex flex-row items-center self-center justify-between w-full h-10 px-5 mt-6 mb-6 bg-white rounded-lg'>
      <Text className='font-semibold '>Frequently Asked Questions</Text>
      <AntDesign name="caretright" size={15} color="#444" />
    </TouchableOpacity>
  )
}