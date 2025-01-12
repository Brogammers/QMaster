import React, { useEffect, useState } from "react";
import { View, Text, Image, I18nManager, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { AccountInfo } from "@/constants";
import { Skeleton } from "moti/skeleton";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";

interface AccountPageProfileProps {
  isDarkMode: boolean;
}

export default function AccountPageProfile({ isDarkMode }: AccountPageProfileProps) {
  const username = useSelector((state: RootState) => state.username.username);
  const [isLoading, setIsLoading] = useState(true);
  const colorMode = isDarkMode ? "dark" : "light";

  useEffect(() => {
    if (typeof username === "string") {
      setIsLoading(false);
    }
  }, [username]);

  return (
    <View className="w-11/12 my-6 self-center">
      <LinearGradient
        colors={['#17222D', '#13404D']}
        className="rounded-3xl p-5 shadow-lg border border-baby-blue/10"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <MotiView 
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            mass: 0.8,
            damping: 15,
          }}
          className="flex-row items-center justify-between"
        >
          <TouchableOpacity className="flex-row items-center space-x-4">
            <View className="bg-concrete-turqouise/30 p-0.5 rounded-2xl border border-baby-blue/20">
              {isLoading ? (
                <Skeleton
                  colorMode={colorMode}
                  width={60}
                  height={60}
                  radius={16}
                />
              ) : (
                <Image 
                  source={AccountInfo[0].image} 
                  className="w-[60px] h-[60px] rounded-2xl"
                  resizeMode="cover"
                />
              )}
            </View>
            
            <View className="flex-col gap-2">
              <Skeleton
                colorMode={colorMode}
                width={150}
                height={24}
                radius={4}
              >
                {isLoading ? null : (
                  <Text className={`text-lg font-bold text-baby-blue ${I18nManager.isRTL ? "text-left" : "text-left"}`}>
                    {username && username.charAt(0).toUpperCase() + username.slice(1)}
                  </Text>
                )}
              </Skeleton>
              
              <Skeleton
                colorMode={colorMode}
                width={100}
                height={16}
                radius={4}
              >
                {isLoading ? null : (
                  <Text className="text-xs text-slight-slate-grey">
                    {AccountInfo[0].number}
                  </Text>
                )}
              </Skeleton>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-concrete-turqouise/30 p-3 rounded-xl border border-baby-blue/20"
          >
            <Ionicons name="settings-outline" size={22} color="#1DCDFE" />
          </TouchableOpacity>
        </MotiView>
      </LinearGradient>
    </View>
  );
}