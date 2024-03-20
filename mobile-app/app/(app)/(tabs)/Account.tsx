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
  const windowWidth = useWindowDimensions().width;

  const firstName = useSelector((state: RootState) => state.username.username)?.split(' ')[0];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    if (firstName) {
      setIsLoading(false);
      clearTimeout(timeoutId); 
    }

    return () => clearTimeout(timeoutId);
  }, [firstName]);

  return (
    <SafeAreaView className="items-center self-center flex-1 w-screen bg-off-white">
      <StatusBar translucent barStyle="dark-content" />
      {/* <Skeleton
        colorMode={colorMode}
        width={windowWidth * (11/12)}
        height={100}
      >
        {isLoading ? null : <AccountPageProfile />}
      </Skeleton> */}
      <AccountPageProfile />
      <View className="w-10/12">
        <ScrollView>
          <Text className="w-full pb-6 text-3xl font-extrabold text-left border-b text-ocean-blue-2 border-lite-grey">
            Hi {firstName ? 
              firstName.charAt(0).toUpperCase() + firstName.slice(1) : "Anonymous"
            }!
          </Text>
          <AccountPageItems />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
