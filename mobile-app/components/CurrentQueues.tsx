import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Image from 'react-native-remote-svg';
import { View } from 'react-native';
import Carrefour from '@/assets/images/Carrefour.svg';
import gradient from '@/assets/images/Gradient.png';
import { FontAwesome5 } from '@expo/vector-icons';

interface CurrentQueuesProps {
  Img: any,
  Name: String,
  People: Number,
  Time: Number,
}

export default function CurrentQueues(props: CurrentQueuesProps) {
  const { Img, Name, People, Time } = props;
  return (
    <View>
      <View className='w-80'>
        <View className='flex flex-row bg-[#17222D] rounded-2xl h-40 w-full' >
          <View className='w-2/5 h-full'>
            <View className='absolute z-20 items-center justify-center w-full h-full'>
              <FontAwesome5 name="hourglass-start" size={50} color="#D9D9D9" />
            </View>
            <Image source={gradient} className='absolute z-10 self-center w-full h-full' />
            <Image source={Img} className='w-full h-full' />
          </View>
          <View className='justify-around w-3/5 pl-2'>
            <Text className='text-2xl font-black text-white'> {Name} </Text>
            <View>
              <Text className='text-[#D9D9D9] text-base font-medium'> {String(People)} people remaining </Text>
              <Text className='text-[#D9D9D9] text-xs'> ~{String(Time)} min </Text>
            </View>
            <TouchableOpacity className='items-center self-center justify-center w-9/12 mr-2 bg-red-700 rounded-lg h-7'>
              <Text className='\ text-white'> Leave Queue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}