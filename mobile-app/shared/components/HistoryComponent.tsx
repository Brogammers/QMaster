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
          <Image source={image} className='w-16 h-16 rounded-lg' />
          <View className='w-[70%] ml-4 h-full justify-center py-2'>
            <View>
              <Text className='text-xl font-semibold'>{name}</Text>
              <View className='flex-row items-center'>
                <Entypo name="location-pin" size={20} color="#E50404" />
                <Text className='text-base'>{queues} Queues</Text>
              </View>
            </View>
          </View>
        </>
      )}
      {isNotification && (
        <>
          <Image source={image} className='w-16 h-16 rounded-lg' />
          <View className='w-[70%] ml-4 h-full justify-between py-2'>
            <Text className='text-sm font-semibold'>{name}</Text>
            <Text className='text-xs font-light'>{notification}</Text>
            <View className='flex-row justify-between'>
              <View className='flex-row'>
                <Text className='text-[8px]'>{date}</Text>
                <Text className='text-[8px] ml-3'>{time}</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  )
}