import React from "react";
import { View } from 'react-native';
import QueueInfoCard from "@/components/QueueInfoCard";
import JoinQueue from '@/components/JoinQueue';
import { useTheme } from '@/ctx/ThemeContext';

// Hardcoded data for development
const hardcodedData = {
  brandName: "Carrefour",
  image: require('../../../assets/images/CarrefourLogo.png')
};

export default function Partner() {
  const { isDarkMode } = useTheme();

  return (
    <View className={`flex-1 items-center ${isDarkMode ? 'bg-slate-900' : 'bg-off-white'}`}>
      <QueueInfoCard image={hardcodedData.image} name={hardcodedData.brandName} />
      <JoinQueue />     
    </View>
  )
}