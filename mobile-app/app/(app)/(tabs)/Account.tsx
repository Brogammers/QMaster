import React from "react";
import { Text } from "react-native";
import AccountPageItems from '@/components/AccountPageItems'
import { SafeAreaView } from "react-native-safe-area-context";
import AccountPageProfile from "@/components/AccountPageProfile";
import { ScrollView } from "react-native-gesture-handler";

export default function Account() {
  return (
    <SafeAreaView className="items-center flex-1">
      <ScrollView>
        <AccountPageProfile />
        <Text className="w-full pb-6 text-3xl font-extrabold text-left border-b pl-7 text-ocean-blue-2 border-[#ADADAD]">
          Hi John!
        </Text>
        <AccountPageItems />
      </ScrollView>
    </SafeAreaView>
  )
}