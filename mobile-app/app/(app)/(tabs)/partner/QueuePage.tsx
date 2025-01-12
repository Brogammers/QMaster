import React from "react";
import { View } from 'react-native';
import QueueInfoCard from "@/components/QueueInfoCard";
import JoinQueue from '@/components/JoinQueue';
import { useRoute } from '@react-navigation/native';

export default function QueuePage() {
  const route = useRoute();
  const { brandName, image }: any = route.params;

  return (
    <View className="bg-off-white flex-1 items-center">
      <QueueInfoCard image={image} name={brandName} />
      <JoinQueue />     
    </View>
  )
}