import React from "react";
import { Text, View, StatusBar, StyleSheet, Platform } from "react-native";
import AccountPageItems from '@/components/AccountPageItems'
import { SafeAreaView } from "react-native-safe-area-context";
import AccountPageProfile from "@/components/AccountPageProfile";
import { ScrollView } from "react-native-gesture-handler";

export default function Account() {
  return (
    <SafeAreaView style={styles.container} className="items-center self-center flex-1">
      <StatusBar
        translucent
        backgroundColor='#17222D'
        barStyle='light-content'
      />
      <View className="bg-[#D9D9D9] w-full h-full">
        <AccountPageProfile />
        <View className="w-[85%] flex flex-col items-center justify-center">
          <ScrollView>
            <Text className="w-full pb-6 text-3xl font-extrabold text-left border-b text-ocean-blue-2 border-[#ADADAD]">
              Hi John!
            </Text>
            <AccountPageItems />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#17222D',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight - 1 : 0 : 0,
  },
});