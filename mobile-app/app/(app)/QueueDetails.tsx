import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLinkTo } from "@react-navigation/native";
import { useTheme } from "@/ctx/ThemeContext";
import { MotiView } from "moti";
import i18n from "@/i18n";
import { updateQueuePosition } from "@/app/redux/queueSlice";

export default function QueueDetails() {
  const { isDarkMode } = useTheme();
  const linkTo = useLinkTo();
  const dispatch = useDispatch();
  const activeQueue = useSelector(
    (state: RootState) => state.queue.activeQueue
  );
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  const handleReturn = () => {
    linkTo("/");
  };

  // For demo purposes - simulate queue position changes
  const simulatePositionChange = (newPosition: number) => {
    if (!activeQueue) return;

    dispatch(
      updateQueuePosition({
        id: activeQueue.id,
        position: newPosition,
        estimatedTime: newPosition * 2, // Simple calculation for demo
      })
    );
  };

  if (!activeQueue) {
    return (
      <View
        className={`flex-1 items-center justify-center ${
          isDarkMode ? "bg-slate-900" : "bg-off-white"
        }`}
      >
        <Text
          className={`text-lg ${isDarkMode ? "text-white" : "text-coal-black"}`}
        >
          {i18n.t("noData")}
        </Text>
        <TouchableOpacity
          onPress={handleReturn}
          className="mt-4 px-4 py-2 bg-ocean-blue rounded-lg"
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-off-white"}`}>
      <View className="absolute top-4 left-4 z-10">
        <TouchableOpacity onPress={handleReturn}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? "#fff" : "#17222D"}
          />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={isDarkMode ? ["#17222D", "#13404D"] : ["#0077B6", "#0096C7"]}
        className="pt-14 pb-6 px-5"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-white">
            {activeQueue.name}
          </Text>
          <View className="bg-white/20 px-3 py-1 rounded-full">
            <Text className="text-white font-medium">
              #{activeQueue.serviceType || "A-123"}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center">
          <MaterialIcons name="location-on" size={16} color="white" />
          <Text className="text-white ml-1">
            {activeQueue.location || "Main Branch"}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-4">
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 500 }}
          className={`mt-6 p-5 rounded-xl ${
            isDarkMode ? "bg-slate-800" : "bg-white"
          } shadow-md`}
        >
          <Text
            className={`text-lg font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-coal-black"
            }`}
          >
            Your Queue Status
          </Text>

          <View className="flex-row justify-between items-center mb-6">
            <View className="items-center">
              <Text
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {i18n.t("position")}
              </Text>
              <Text
                className={`text-3xl font-bold mt-1 ${
                  isDarkMode ? "text-baby-blue" : "text-ocean-blue"
                }`}
              >
                {activeQueue.position}
              </Text>
            </View>

            <View className="items-center">
              <Text
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {i18n.t("waitTime")}
              </Text>
              <Text
                className={`text-3xl font-bold mt-1 ${
                  isDarkMode ? "text-baby-blue" : "text-ocean-blue"
                }`}
              >
                {activeQueue.estimatedTime}{" "}
                <Text className="text-sm">{i18n.t("minutes")}</Text>
              </Text>
            </View>

            <View className="items-center">
              <Text
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Service Type
              </Text>
              <Text
                className={`text-xl font-bold mt-1 ${
                  isDarkMode ? "text-baby-blue" : "text-ocean-blue"
                }`}
              >
                {activeQueue.serviceType}
              </Text>
            </View>
          </View>

          {activeQueue.position === 1 && (
            <View className="bg-green-500/20 p-4 rounded-lg mb-4">
              <Text className="text-green-500 font-bold text-center">
                {i18n.t("yourTurn")}
              </Text>
            </View>
          )}

          <TouchableOpacity
            className={`py-3 rounded-lg ${
              isDarkMode ? "bg-red-500/20" : "bg-red-500"
            }`}
          >
            <Text
              className={`text-center font-bold ${
                isDarkMode ? "text-red-500" : "text-white"
              }`}
            >
              {i18n.t("common.queue.leave")}
            </Text>
          </TouchableOpacity>
        </MotiView>

        {/* Demo Controls - For testing notifications */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 500, delay: 200 }}
          className={`mt-6 p-5 rounded-xl ${
            isDarkMode ? "bg-slate-800" : "bg-white"
          } shadow-md mb-6`}
        >
          <Text
            className={`text-lg font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-coal-black"
            }`}
          >
            Demo Controls
          </Text>

          <Text
            className={`text-sm mb-3 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Simulate queue position changes to test notifications
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {[3, 2, 1].map((position) => (
              <TouchableOpacity
                key={position}
                onPress={() => simulatePositionChange(position)}
                className={`mb-3 py-2 px-4 rounded-lg ${
                  position === 1
                    ? isDarkMode
                      ? "bg-green-500/20"
                      : "bg-green-500"
                    : isDarkMode
                    ? "bg-ocean-blue/20"
                    : "bg-ocean-blue"
                }`}
                style={{ width: "30%" }}
              >
                <Text
                  className={`text-center font-medium ${
                    position === 1
                      ? isDarkMode
                        ? "text-green-500"
                        : "text-white"
                      : isDarkMode
                      ? "text-baby-blue"
                      : "text-white"
                  }`}
                >
                  Position {position}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </MotiView>
      </ScrollView>

      {/* Floating button to show notification test panel */}
      <TouchableOpacity
        onPress={() => setShowNotificationPanel(true)}
        className={`absolute bottom-6 right-6 w-14 h-14 rounded-full items-center justify-center ${
          isDarkMode ? "bg-baby-blue" : "bg-ocean-blue"
        } shadow-lg`}
      >
        <MaterialIcons name="notifications" size={24} color="white" />
      </TouchableOpacity>

      {/* Notification test panel modal */}
      <Modal
        visible={showNotificationPanel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNotificationPanel(false)}
      >
        <View className="flex-1 justify-end">
          <TouchableOpacity
            className="absolute top-0 left-0 right-0 bottom-0 bg-black/50"
            onPress={() => setShowNotificationPanel(false)}
          />
          <View
            className={`rounded-t-3xl p-6 ${
              isDarkMode ? "bg-slate-900" : "bg-white"
            }`}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-coal-black"
                }`}
              >
                {i18n.t("test_notifications")}
              </Text>
              <TouchableOpacity onPress={() => setShowNotificationPanel(false)}>
                <MaterialIcons
                  name="close"
                  size={24}
                  color={isDarkMode ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
