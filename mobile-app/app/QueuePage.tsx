import React from "react";
import { Text, View, SafeAreaView, Dimensions } from 'react-native';
import QueueInfoCard from "@/components/QueueInfoCard";
import JoinQueue from '@/components/JoinQueue';
import { useRoute } from '@react-navigation/native';
import { HistoryComponentProps } from "@/types";
import Carrefour from '@/assets/images/CarrefourLogo.png'

export default function QueuePage() {
  const route = useRoute();
  const { brandName, image }: any = route.params;

  return (
    <View className="bg-off-white flex-1 items-center"
    >
      <QueueInfoCard image={image} name={brandName} />
      <JoinQueue />     
    </View>
  )
}