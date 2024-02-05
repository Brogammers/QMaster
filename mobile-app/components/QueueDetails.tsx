import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Wandering from '@/assets/images/wandering.svg'

export default function QueueDetails() {
  return (
    <View className="items-center justify-center w-11/12 mt-8 bg-white rounded-2xl h-1/2">
      <View className="items-center">
        <Text className="text-2xl font-medium">7 people in queue</Text>
        <View className="flex-row items-center mt-1">
          <MaterialCommunityIcons name="timer-sand-complete" size={20} color="#444444" />
          <Text className="text-base text-[#444444] "> ~18 min</Text>
        </View>
      </View>
      <TouchableOpacity className="bg-[#1DCDFE] px-6 py-1 rounded-lg justify-center items-center mt-8">
        <Text className="text-2xl font-bold text-white">
          Join Queue
        </Text>
      </TouchableOpacity>

      <Wandering className="absolute bottom-[-50] right-8" />
    </View>
  )
}