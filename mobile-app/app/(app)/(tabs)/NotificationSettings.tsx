import React, { useState } from "react";
import { View, Text, Switch, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "@/ctx/ThemeContext";
import * as Notifications from "expo-notifications";
import i18n from "@/i18n";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { useLinkTo } from "@react-navigation/native";

export default function NotificationsSettings() {
  const { isDarkMode } = useTheme();
  const linkTo = useLinkTo();
  const [externalNotifications, setExternalNotifications] = useState(false);
  const [internalNotifications, setInternalNotifications] = useState(true);

  const handleReturn = () => {
    linkTo("/Settings");
  };

  const handleNotificationToggle = async (isExternal: boolean) => {
    if (isExternal) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        setExternalNotifications(!externalNotifications);
      }
    } else {
      setInternalNotifications(!internalNotifications);
    }
  };

  return (
    <>
      <View className="absolute top-4 left-4 z-10">
        <TouchableOpacity onPress={() => handleReturn()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View
        className={`flex-1 ${isDarkMode ? "bg-slate-900" : "bg-off-white"}`}
      >
        <LinearGradient
          colors={["#17222D", "#13404D"]}
          className="pt-14 pb-4 px-5"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold text-white">
              {i18n.t("notifications")}
            </Text>
          </View>
        </LinearGradient>

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          scrollEventThrottle={16}
        >
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            className={`rounded-xl p-4 mt-4 mb-6 ${
              isDarkMode ? "bg-slate-800/60" : "bg-white"
            }`}
          >
            <View className="space-y-6">
              <View className="flex-row items-center justify-between py-2">
                <View className="flex-1 mr-4">
                  <Text
                    className={`text-base font-medium ${
                      isDarkMode ? "text-white" : "text-coal-black"
                    }`}
                  >
                    {i18n.t("external_notifications")}
                  </Text>
                  <Text
                    className={`text-sm mt-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {i18n.t("external_notifications_desc")}
                  </Text>
                </View>
                <Switch
                  value={externalNotifications}
                  onValueChange={() => handleNotificationToggle(true)}
                  trackColor={{
                    false: "#767577",
                    true: isDarkMode ? "#1DCDFE" : "#0369A1",
                  }}
                  thumbColor={externalNotifications ? "#fff" : "#f4f3f4"}
                />
              </View>

              <View className="flex-row items-center justify-between py-2">
                <View className="flex-1 mr-4">
                  <Text
                    className={`text-base font-medium ${
                      isDarkMode ? "text-white" : "text-coal-black"
                    }`}
                  >
                    {i18n.t("internal_notifications")}
                  </Text>
                  <Text
                    className={`text-sm mt-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {i18n.t("internal_notifications_desc")}
                  </Text>
                </View>
                <Switch
                  value={internalNotifications}
                  onValueChange={() => handleNotificationToggle(false)}
                  trackColor={{
                    false: "#767577",
                    true: isDarkMode ? "#1DCDFE" : "#0369A1",
                  }}
                  thumbColor={internalNotifications ? "#fff" : "#f4f3f4"}
                />
              </View>
            </View>
          </MotiView>
        </ScrollView>
      </View>
    </>
  );
}
