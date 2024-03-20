import React, { useEffect, useState } from "react";
import { Text, View, StatusBar, useWindowDimensions } from "react-native";
import AccountPageItems from "@/components/AccountPageItems";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountPageProfile from "@/components/AccountPageProfile";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Skeleton } from "moti/skeleton";

export default function Account() {
  const [isLoading, setIsLoading] = useState(true);
  const colorMode: 'light' | 'dark' = 'light';

  const firstName = useSelector((state: RootState) => state.username.username)?.split(' ')[0];

  useEffect(() => {
    if (typeof firstName === "string") {
      setIsLoading(false);
    }
  }, [firstName])

  return (
    <SafeAreaView className="items-center self-center flex-1 w-screen bg-off-white">
      <StatusBar translucent barStyle="dark-content" />
      <AccountPageProfile />
      <View className="w-10/12">
        <ScrollView>
          <Skeleton
            colorMode={colorMode}
            width={250}
            height={35}
          >
            {isLoading ? (
              null
            ) : (
              <Text className="w-full pb-6 text-3xl font-extrabold text-left border-b text-ocean-blue-2 border-lite-grey">
                Hi {firstName &&
                  firstName.charAt(0).toUpperCase() + firstName.slice(1)
                }!
              </Text>
            )}
          </Skeleton>
          <AccountPageItems />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
