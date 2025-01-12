import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "@/ctx/ThemeContext";
import i18n from "@/i18n";
import { useState } from "react";
import Return from "@/shared/components/Return";
import { Href } from "expo-router";

export default function SecuritySettings() {
  const { isDarkMode } = useTheme();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEmailChange = () => {
    // TODO: Implement email change
  };

  const handlePasswordChange = () => {
    // TODO: Implement password change
  };

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
        <View className="rounded-xl overflow-hidden bg-slate-800/60 mb-4">
          <Text className="text-baby-blue text-lg font-semibold px-4 py-3 border-b border-slate-700/50">
            {i18n.t("change_email")}
          </Text>
          <View className="p-4">
            <TextInput
              placeholder={i18n.t("current_password")}
              placeholderTextColor="#6B7280"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              className="bg-slate-700/50 text-white px-4 py-3 rounded-lg mb-3"
            />
            <TextInput
              placeholder={i18n.t("new_email")}
              placeholderTextColor="#6B7280"
              value={newEmail}
              onChangeText={setNewEmail}
              className="bg-slate-700/50 text-white px-4 py-3 rounded-lg mb-4"
            />
            <TouchableOpacity
              onPress={handleEmailChange}
              className="bg-baby-blue rounded-lg py-3"
            >
              <Text className="text-white text-center font-semibold">
                {i18n.t("submit")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="rounded-xl overflow-hidden bg-slate-800/60">
          <Text className="text-baby-blue text-lg font-semibold px-4 py-3 border-b border-slate-700/50">
            {i18n.t("change_password")}
          </Text>
          <View className="p-4">
            <TextInput
              placeholder={i18n.t("current_email")}
              placeholderTextColor="#6B7280"
              value={currentEmail}
              onChangeText={setCurrentEmail}
              className="bg-slate-700/50 text-white px-4 py-3 rounded-lg mb-3"
            />
            <TextInput
              placeholder={i18n.t("current_password")}
              placeholderTextColor="#6B7280"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              className="bg-slate-700/50 text-white px-4 py-3 rounded-lg mb-3"
            />
            <TextInput
              placeholder={i18n.t("new_password")}
              placeholderTextColor="#6B7280"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              className="bg-slate-700/50 text-white px-4 py-3 rounded-lg mb-4"
            />
            <TouchableOpacity
              onPress={handlePasswordChange}
              className="bg-baby-blue rounded-lg py-3"
            >
              <Text className="text-white text-center font-semibold">
                {i18n.t("submit")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 