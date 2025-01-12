import { View, Text, Switch, ScrollView } from "react-native";
import { useTheme } from "@/ctx/ThemeContext";
import i18n from "@/i18n";
import { useState } from "react";
import Return from "@/shared/components/Return";
import { Href } from "expo-router";

export default function NotificationsSettings() {
  const { isDarkMode } = useTheme();
  const [externalNotifications, setExternalNotifications] = useState(false);
  const [internalNotifications, setInternalNotifications] = useState(false);

  return (
    <View className="flex-1 bg-slate-900">
      <View className="bg-ocean-blue px-4 py-3">
        <Return 
          href={"/(app)/Settings" as Href<string>} 
          size={24} 
          color="white"
          title={i18n.t("settings")}
        />
      </View>
      
      <ScrollView className="flex-1 px-4 pt-4">
        <View className="rounded-xl overflow-hidden bg-slate-800/60">
          <View className="p-4 space-y-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-baby-blue text-base font-semibold">
                  {i18n.t("external_notifications")}
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                  {i18n.t("external_notifications_desc")}
                </Text>
              </View>
              <Switch
                value={externalNotifications}
                onValueChange={setExternalNotifications}
                trackColor={{ false: "#374151", true: "#1DCDFE" }}
                thumbColor="white"
              />
            </View>

            <View className="h-px bg-slate-700/50" />

            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-baby-blue text-base font-semibold">
                  {i18n.t("internal_notifications")}
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                  {i18n.t("internal_notifications_desc")}
                </Text>
              </View>
              <Switch
                value={internalNotifications}
                onValueChange={setInternalNotifications}
                trackColor={{ false: "#374151", true: "#1DCDFE" }}
                thumbColor="white"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 