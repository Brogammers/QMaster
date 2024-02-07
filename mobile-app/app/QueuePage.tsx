import React from "react";
import { Text, View, SafeAreaView, Dimensions } from 'react-native';
import QueueInfoCard from "@/components/QueueInfoCard";
import JoinQueue from '@/components/JoinQueue';


export default function QueuePage() {
  return (
    <View className="bg-[#D9D9D9] flex-1 items-center"
    >
      <QueueInfoCard />
      <JoinQueue />     
    </View>
  )
}