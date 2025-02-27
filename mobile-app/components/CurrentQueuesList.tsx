import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import i18n from "@/i18n";

interface CurrentQueuesListProps {
  queues: any[];
  isDarkMode: boolean;
}

type RootStackParamList = {
  Partner: {
    brandName: string;
    currentLocation: string;
  };
};

export default function CurrentQueuesList({
  queues,
  isDarkMode,
}: CurrentQueuesListProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleQueuePress = (queue: any) => {
    navigation.navigate("Partner", {
      brandName: queue.name,
      currentLocation: queue.location,
    });
  };

  return (
    <View className="w-full mb-6">
      <Text
        className={`text-xl font-bold mb-4 ${
          isDarkMode ? "text-white" : "text-coal-black"
        }`}
      >
        {i18n.t("currentQueues")}
      </Text>
      {queues.map((queue, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleQueuePress(queue)}
          className={`p-4 rounded-xl mb-3 ${
            isDarkMode
              ? "bg-[rgba(23,34,45,0.7)] border border-[rgba(29,205,254,0.25)]"
              : "bg-white shadow-sm"
          }`}
        >
          <Text
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-coal-black"
            }`}
          >
            {queue.name}
          </Text>
          <Text
            className={`text-sm ${
              isDarkMode ? "text-baby-blue" : "text-ocean-blue"
            }`}
          >
            {queue.serviceType}
          </Text>
          <View className="flex-row justify-between mt-2">
            <Text className={isDarkMode ? "text-white" : "text-coal-black"}>
              {i18n.t("position")}: {queue.position}
            </Text>
            <Text className={isDarkMode ? "text-white" : "text-coal-black"}>
              ~{queue.estimatedTime} {i18n.t("minutes")}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
