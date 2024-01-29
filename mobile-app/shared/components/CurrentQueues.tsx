import React from 'react';
import { 
  Text, 
  View,
  Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Image from 'react-native-remote-svg';
import { FontAwesome5 } from '@expo/vector-icons';
import { CurrentQueuesProps } from '@/types';
import PhotoGradientFilter from '@/assets/images/Gradient.png';
import InclineArrow from '@/assets/images/arrow-up.svg';

export default function CurrentQueues(props: CurrentQueuesProps) {
  const { image, name, people, time, isLeave, isJoin, isCurrent, isPopular } = props;
  return (
    <View>
      <View className='w-full'>
        <View className='flex flex-row bg-[#17222D] rounded-2xl h-40 w-full' >
          <View className='w-2/6 h-full'>
            <View className='absolute z-20 items-center justify-center w-full h-full'>
              {isCurrent ? (
                <FontAwesome5 name="hourglass-start" size={50} color="#D9D9D9" />
              ) : isPopular ? (
                <InclineArrow width={50} />
              ) : null}
            </View>
            <Image 
              source={PhotoGradientFilter} 
              className='absolute z-10 self-center w-full h-full rounded-l-[18px]' 
            />
            <Image 
              source={image} 
              className='w-full h-full rounded-l-[18px]' 
            />
          </View>
          <View className='justify-around w-4/6 px-4 py-2'>
            <Text className='text-xl font-black text-white'>
              {name}
            </Text>
            <View>
              <Text className='text-[#D9D9D9] text-sm font-medium'>
                {String(people)} people remaining 
              </Text>
              <Text className='text-[#D9D9D9] text-xs'> 
                ~{String(time)} min
              </Text>
            </View>
            {isLeave ? (
              <TouchableOpacity className='items-center self-center justify-center w-9/12 mr-2 bg-red-700 rounded-lg h-7'>
                <Text className='text-base font-bold text-white'>Leave Queue</Text>
              </TouchableOpacity>
            ) : isJoin ? (
              <TouchableOpacity className='items-center self-center justify-center w-9/12 mr-2 bg-[#1DCDFE] rounded-lg h-7'>
                <Text className='text-base font-bold text-white'>Join Queue</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  )
}