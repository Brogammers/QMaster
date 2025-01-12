import { View, Text, ScrollView } from "react-native";
import { useTheme } from "@/ctx/ThemeContext";
import i18n from "@/i18n";
import { useState } from "react";
import Return from "@/shared/components/Return";
import { Href } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function RegionLanguageSettings() {
  const { isDarkMode } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState("EG");
  const [selectedLanguage, setSelectedLanguage] = useState("ar");

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
            <View>
              <Text className="text-baby-blue text-base font-semibold mb-2">
                {i18n.t("country")}
              </Text>
              <View className="bg-slate-700/50 rounded-lg">
                <Picker
                  selectedValue={selectedCountry}
                  onValueChange={setSelectedCountry}
                  dropdownIconColor="#1DCDFE"
                  style={{ color: "white" }}
                >
                  <Picker.Item label="Egypt" value="EG" />
                  <Picker.Item label="Saudi Arabia" value="SA" />
                  <Picker.Item label="United Arab Emirates" value="AE" />
                  <Picker.Item label="Kuwait" value="KW" />
                  <Picker.Item label="Qatar" value="QA" />
                  <Picker.Item label="Bahrain" value="BH" />
                  <Picker.Item label="Oman" value="OM" />
                </Picker>
              </View>
            </View>

            <View className="h-px bg-slate-700/50" />

            <View>
              <Text className="text-baby-blue text-base font-semibold mb-2">
                {i18n.t("language")}
              </Text>
              <View className="bg-slate-700/50 rounded-lg">
                <Picker
                  selectedValue={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                  dropdownIconColor="#1DCDFE"
                  style={{ color: "white" }}
                >
                  <Picker.Item label="العربية" value="ar" />
                  <Picker.Item label="English" value="en" />
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 