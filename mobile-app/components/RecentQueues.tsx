import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import Category from "@/shared/components/Category";
import { Current } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecentQueues() {
  const [historyDataExists, setHistoryDataExists] = useState<boolean>(false);

  useEffect(() => {
    const checkHistoryData = async () => {
      try {
        const historyData = await AsyncStorage.getItem("historyData");
        setHistoryDataExists(!!historyData);
      } catch (error) {
        Alert.alert("ERRR!", `Error checking history data. ${error}`);
      }
    };

    checkHistoryData();
  }, []);

  if (!historyDataExists) {
    return null; // or render an alternative UI
  }

  return (
    <View>
      <Text className="my-3 text-2xl font-bold">Recent queues</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=""
      >
        {Current.map((recent, index) => (
          <View className="mr-2.5" key={index}>
            <Category title={recent.name} image={recent.image} spacing={8} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
