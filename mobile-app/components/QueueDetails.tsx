import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Wandering from '@/assets/images/wandering.svg';
import { FontAwesome } from '@expo/vector-icons';

export default function QueueDetails() {
  const [leave, setLeave] = useState(false);

  return (
    <View className="items-center justify-center w-11/12 mt-8 bg-white rounded-2xl h-1/2">
      <View className="items-center">
        <Text className="text-2xl font-medium">7 people in queue</Text>
        <View className="flex-row items-center mt-1">
          <MaterialCommunityIcons name="timer-sand-complete" size={20} color="#444444" />
          <Text className="text-base text-[#444444] "> ~18 min</Text>
        </View>
      </View>
      {!leave ? (
        <TouchableOpacity className="bg-[#1DCDFE] px-6 py-1 rounded-lg justify-center items-center mt-8" onPress={() => setLeave(true)}>
          <Text className="text-2xl font-bold text-white">Join Queue</Text>
        </TouchableOpacity>
      ) : (
        <View className="items-center w-full mt-8">
          <View className="flex-row items-center justify-center w-[60%]  relative h-9 mb-2">
            <View style={{ position: 'absolute', left: 0, zIndex: 100, width: 40, height: 40, borderRadius: 20, overflow: 'hidden', backgroundColor: 'white', alignItems: 'flex-end' }}>
              <FontAwesome name="check-circle" size={40} color="#1DCDFE" />
            </View>

            <View className="bg-[#D9D9D9] w-full rounded-full h-[80%] flex justify-center items-center">
              <Text className="text-[#1DCDFE] text-base text-center">Queue Joined!</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-[#B41818] px-6 py-1 rounded-lg justify-center items-center" onPress={() => setLeave(false)}>
            <Text className="text-2xl font-bold text-white">Leave Queue</Text>
          </TouchableOpacity>
        </View>

      )}
      <Wandering className="absolute bottom-[-50] right-8" />
    </View>
  );
}
