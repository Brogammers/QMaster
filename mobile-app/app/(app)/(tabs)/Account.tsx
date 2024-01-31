import React from "react";
import { Text, View, StatusBar } from "react-native";
import AccountPageItems from '@/components/AccountPageItems'
import { SafeAreaView } from "react-native-safe-area-context";
import AccountPageProfile from "@/components/AccountPageProfile";
import { ScrollView } from "react-native-gesture-handler";

export default function Account() {
  return (
    <SafeAreaView className="items-center self-center flex-1">
      <StatusBar
        translucent
        backgroundColor='#17222D'
        barStyle='light-content'
      />
        <AccountPageProfile />
      <View className="w-[85%]">
        <ScrollView>
          <Text className="w-full pb-6 text-3xl font-extrabold text-left border-b text-ocean-blue-2 border-[#ADADAD]">
            Hi John!
          </Text>
          <AccountPageItems />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}