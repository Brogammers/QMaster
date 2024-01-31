import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { AccountInfo } from "@/constants";

export default function AccountPageProfile() {
  return (
    <View className="flex-row items-center justify-between w-11/12 my-6 bg-ocean-blue rounded-3xl p-3.5 self-center">
      <TouchableOpacity className="flex-row items-center">
      <Image source={AccountInfo[0].image} className="mr-1"/>
        <View>
          <Text className="text-base text-white">
            {AccountInfo[0].name}
          </Text>
          <Text className="text-[#7D7D7D] text-xs">
            {AccountInfo[0].number}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="settings-sharp" size={35} color="white" />
      </TouchableOpacity>
    </View>
  )
}