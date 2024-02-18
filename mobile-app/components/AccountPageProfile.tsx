import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Ionicons } from '@expo/vector-icons';
import { AccountInfo } from "@/constants";

export default function AccountPageProfile() {
  const username = useSelector((state: RootState) => state.username.username);
  
  return (
    <View className="flex-row items-center justify-between w-11/12 my-6 bg-ocean-blue rounded-3xl p-3.5 pr-6 self-center">
      <TouchableOpacity className="flex-row items-center">
      <Image source={AccountInfo[0].image} className="mr-1"/>
        <View>
          <Text className="text-base text-white">
            {username ? username.charAt(0).toUpperCase() + username.slice(1) : 'Anonymous'}
          </Text>
          <Text className="text-slate-grey text-xs">
            {AccountInfo[0].number}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="settings-sharp" size={35} color="white"/>
      </TouchableOpacity>
    </View>
  )
}