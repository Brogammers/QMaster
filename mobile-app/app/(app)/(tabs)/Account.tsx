import React from "react";
import { Text, View, StatusBar } from "react-native";
import AccountPageItems from "@/components/AccountPageItems";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountPageProfile from "@/components/AccountPageProfile";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export default function Account() {
  const username = useSelector((state: RootState) => state.username.username);

  return (
    <SafeAreaView className="items-center self-center flex-1 w-screen bg-off-white">
      <StatusBar translucent barStyle="dark-content" />
      <AccountPageProfile />
      <View className="w-10/12">
        <ScrollView>
          <Text className="w-full pb-6 text-3xl font-extrabold text-left border-b text-ocean-blue-2 border-lite-grey">
            Hi {username ? 
              username : "Anonymous"
            }!
          </Text>
          <AccountPageItems />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
