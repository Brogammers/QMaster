import React from "react";
import { Text, View, Image, Dimensions } from 'react-native';
import QueueBackground from '@/assets/images/QueueBackground.png';
import Carrefour from '@/assets/images/CarrefourLogo.png';
import AccessTime from '@/assets/images/accessTime.svg'
import { HistoryComponentProps } from "@/types";
const { height } = Dimensions.get('window')
const twoFifth = height * 38 / 100
import { QueueInfoCardProps } from "@/types";

export default function QueueInfoCard(props: QueueInfoCardProps) {
  const {name, image} = props;
  return (
    <View className="justify-end w-screen"
      style={{ height: twoFifth }}
    >
      <Image source={QueueBackground} className="absolute top-0 w-screen h-5/6" />
      <View className="bg-ocean-blue w-4/5 self-center h-1/2 rounded-sxl flex flex-row justify-center items-center">
        <View className="justify-center h-full">
          <Image
            source={image}
            style={{
              height: '60%',  // Adjust as needed
              aspectRatio: 1, // Maintain a 1:1 aspect ratio
              borderRadius: 18,
              marginRight: 25,
            }}
          />
        </View>
        <View className="justify-between h-3/5">
          <View>
            <Text className="text-2xl font-black text-white">
              {name}
            </Text>
            <Text className="text-slight-slate-grey text-base">
              Grocery
            </Text>
          </View>
          <View className="flex-row gap-x-1.5">
            <AccessTime />
            <Text className="text-white">
              Fast
            </Text>
            <Text className="text-slight-slate-grey">
              (224 ratings)
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}