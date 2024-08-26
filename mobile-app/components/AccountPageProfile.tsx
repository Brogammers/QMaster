import React, { useEffect, useState } from "react";
import { View, Text, Image, I18nManager } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { AccountInfo } from "@/constants";
import { Skeleton } from "moti/skeleton";

export default function AccountPageProfile() {
  const username = useSelector((state: RootState) => state.username.username);
  const [isLoading, setIsLoading] = useState(true);
  const colorMode: "light" | "dark" = "light";

  useEffect(() => {
    if (typeof username === "string") {
      setIsLoading(false);
    }
  }, [username]);

  return (
    <View className="flex-row items-center justify-between w-11/12 my-6 bg-ocean-blue rounded-3xl p-3.5 pr-6 self-center">
      <TouchableOpacity className={`flex-row items-center gap-2 ${I18nManager.isRTL ? "flex-row" : "flex-row-reverse"}`}>
        {isLoading ?
          <Image source={AccountInfo[0].image} /> 
          : 
          <Image source={AccountInfo[0].image} />
        }
        <View className="flex flex-col gap-2">
          <Skeleton
            colorMode={colorMode}
            width={150} 
            height={20}
          >
            {isLoading ? (
              null
            ) : (
              <Text className={`text-base text-white ${I18nManager.isRTL ? "text-left" : "text-right"}`}>
                {username && username.charAt(0).toUpperCase() + username.slice(1)}
              </Text>
            )}
          </Skeleton>
          <View className="my-1" />
          <Skeleton
            colorMode={colorMode} 
            width={100} 
            height={10}
          >
            {isLoading ? null : (
              <Text className={`text-slate-grey text-xs ${I18nManager.isRTL ? "text-left" : "text-right"}`}>
                {AccountInfo[0].number}
              </Text>
            )}
          </Skeleton>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="settings-sharp" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
}