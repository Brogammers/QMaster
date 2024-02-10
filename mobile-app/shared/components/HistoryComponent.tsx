import React from 'react';
import { Text, View, Image } from 'react-native';
import Carrefour from '@/assets/images/CarrefourLogo.png';
import { Entypo } from '@expo/vector-icons';
import { HistoryComponentProps } from '@/types';

export default function HistoryComponent(props: HistoryComponentProps) {
  const { image, name, location, date, time, id, status, queues, notification, isHistory, isCategory, isNotification } = props;
  return (
    <View className='w-[85%] bg-white self-center h-[85] mt-4 rounded-xl items-center px-5 flex-row'>
      {isHistory && (
        <>
          <Image source={image} className='w-16 h-16 rounded-lg' />
          <View className='w-[70%] ml-4 h-full justify-between py-2'>
            <View>
              <Text className='text-sm font-semibold'>{name}</Text>
              <View className='flex-row items-center'>
                <Entypo name="location-pin" size={14} color="#E50404" />
                <Text className='text-xs'>{location}</Text>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View>
                <Text className='text-[8px]'>{date}</Text>
                <Text className='text-[8px]'>Queue ID: {id}</Text>
              </View>
              <Text className='text-[#4BC337] text-[10px]'>{status}</Text>
            </View>
          </View>
        </>
      )}
      {isCategory && (
        <>
          <Image source={Carrefour} className='w-16 h-16 rounded-lg' />
          <View className='w-[70%] ml-4 h-full justify-center py-2'>
            <View>
              <Text className='text-xl font-semibold'>Carrefour</Text>
              <View className='flex-row items-center'>
                <Entypo name="location-pin" size={20} color="#E50404" />
                <Text className='text-base'>75 Queues</Text>
              </View>
            </View>
          </View>
        </>
      )}
      {isNotification && (
        <>
          <Image source={Carrefour} className='w-16 h-16 rounded-lg' />
          <View className='w-[70%] ml-4 h-full justify-between py-2'>
            <Text className='text-sm font-semibold'>Carrefour</Text>
            <Text className='text-xs font-light'>5 people remaining in your queue, make sure you don't lose your turn!</Text>
            <View className='flex-row justify-between'>
              <View className='flex-row'>
                <Text className='text-[8px]'>18 January 2024</Text>
                <Text className='text-[8px] ml-3'> 10:09 PM</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  )
}