import { Stack } from "expo-router";
import i18n from "@/i18n";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#17222D",
        },
        headerTintColor: "#fff",
        headerTitle: i18n.t("settings"),
      }}
    />
  );
} 