import React, { useEffect } from "react";
import { Text, View, StatusBar, Platform, StyleSheet } from "react-native";
import AccountPageItems from '@/components/AccountPageItems'
import { SafeAreaView } from "react-native-safe-area-context";
import AccountPageProfile from "@/components/AccountPageProfile";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

export default function Account() {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor('#D9D9D9');
      }
      StatusBar.setBarStyle('dark-content');
      StatusBar.setTranslucent;
    }
  })

  return (
    <SafeAreaView className="items-center self-center flex-1">
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight - 1 : 0 : 0,
  },
});