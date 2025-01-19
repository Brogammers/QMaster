import React from "react";
import { View, ScrollView } from 'react-native';
import QueueInfoCard from "@/components/QueueInfoCard";
import JoinQueue from '@/components/JoinQueue';
import { useTheme } from '@/ctx/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

export default function Partner() {
  const { brandName, image } = useLocalSearchParams<{ brandName: string, image: any }>();
  const { isDarkMode } = useTheme();

  return (
    <View className="flex-1">
      <View className={`absolute top-0 left-0 right-0 bottom-0 ${isDarkMode ? 'bg-ocean-blue' : 'bg-off-white'}`}>
        {!isDarkMode && (
          <LinearGradient
            colors={['rgba(0, 119, 182, 0.1)', 'rgba(255, 255, 255, 0)']}
            className="absolute top-0 w-full h-64"
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        )}
      </View>

      <QueueInfoCard image={image} name={brandName} />
      
      <SafeAreaView className="flex-1" edges={['bottom', 'left', 'right']}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          className="flex-1"
        >
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              mass: 0.8,
              damping: 15,
              delay: 200
            }}
            className="w-full px-6"
          >
            <JoinQueue businessName={brandName}/>
          </MotiView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}