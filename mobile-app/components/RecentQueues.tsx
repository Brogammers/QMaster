import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import Category from "@/shared/components/CategoryPop";
import { Current } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/i18n";

interface RecentQueuesProps {
  isDarkMode?: boolean;
}

export default function RecentQueues({ isDarkMode }: RecentQueuesProps) {
  const [historyDataExists, setHistoryDataExists] = useState<boolean>(false);

  useEffect(() => {
    const checkHistoryData = async () => {
      try {
        const historyData = await AsyncStorage.getItem("historyData");
        setHistoryDataExists(!!historyData);
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.response?.data?.message ||
            "An error occurred while checking history data"
        );
      }
    };

    checkHistoryData();
  }, []);

  if (!historyDataExists) {
    return null; // or render an alternative UI
  }

  return (
    <View>
      <Text
        className={`my-3 text-2xl font-bold ${
          isDarkMode ? "text-white" : "text-coal-black"
        }`}
      >
        {i18n.t("recent")}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=""
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        overScrollMode="never"
        scrollEventThrottle={16}
      >
        {Current.map((recent, index) => (
          <View className="mr-2.5" key={index}>
            <Category
              name={recent.name}
              title={recent.name}
              image={recent.image}
              spacing={8}
              isDarkMode={isDarkMode}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
