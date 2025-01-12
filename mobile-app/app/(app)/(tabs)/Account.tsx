import React, { useEffect, useState } from "react";
import { Text, View, StatusBar, Dimensions } from "react-native";
import AccountPageItems from "@/components/AccountPageItems";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountPageProfile from "@/components/AccountPageProfile";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function Account() {
  const [isLoading, setIsLoading] = useState(true);
  const colorMode: 'light' | 'dark' = 'light';

  const firstName = useSelector((state: RootState) => state.username.username)?.split(' ')[0];

  useEffect(() => {
    if (typeof firstName === "string") {
      setIsLoading(false);
    }
  }, [firstName]);

  return (
    <SafeAreaView className="flex-1 bg-off-white">
      <StatusBar translucent barStyle="dark-content" />
      <LinearGradient
        colors={['rgba(0, 119, 182, 0.1)', 'rgba(255, 255, 255, 0)']}
        className="absolute top-0 w-full h-64"
      />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
        >
          <AccountPageProfile />
        </MotiView>
        
        <View className="px-6">
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 200 }}
          >
            <Skeleton
              colorMode={colorMode}
              width={width * 0.7}
              height={35}
            >
              {!isLoading && (
                <Text className="pb-4 text-3xl font-extrabold text-ocean-blue-2">
                  Hi {firstName &&
                    firstName.charAt(0).toUpperCase() + firstName.slice(1)
                  }! 👋
                </Text>
              )}
            </Skeleton>
            
            <Text className="mt-2 mb-6 text-sm text-slate-grey">
              Manage your account settings and preferences
            </Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', delay: 400 }}
            className="bg-white rounded-3xl shadow-sm"
          >
            <AccountPageItems />
          </MotiView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}