import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  I18nManager,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import RecentItemsSearch from "@/components/RecentItemsSearch";
import PopularQueues from "@/components/PopularQueues";
import SearchFilter from "@/components/SearchFilter";
import i18n from "@/i18n";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

export default function Search() {
  const page = 1;
  const perPage = 8;

  const [input, setInput] = useState("");
  const { isDarkMode } = useTheme();

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-ocean-blue" : "bg-off-white"}`}>
      {!isDarkMode && (
        <LinearGradient
          colors={["rgba(0, 119, 182, 0.1)", "rgba(255, 255, 255, 0)"]}
          className="absolute top-0 w-full h-64"
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      )}
      <View className="w-10/12 self-center">
        <View
          className={`h-11 border-2 rounded-full mt-7 mb-4 px-4 py-2 flex-row items-center 
          ${
            isDarkMode
              ? "border-baby-blue/20 bg-concrete-turqouise/20"
              : "border-rock-stone bg-white/80"
          } 
          ${I18nManager.isRTL ? "flex-row-reverse" : "flex-row"}`}
        >
          <FontAwesome
            name="search"
            size={24}
            color={isDarkMode ? "#1DCDFE" : "#17222D"}
          />
          <TextInput
            placeholder={i18n.t("search")}
            autoFocus={true}
            value={input}
            onChangeText={(text) => setInput(text)}
            className={`flex-1 ${
              I18nManager.isRTL ? "text-right mr-2" : "text-left ml-2"
            }`}
            style={{
              textAlign: I18nManager.isRTL ? "right" : "left",
              color: isDarkMode ? "#1DCDFE" : "#17222D",
            }}
            placeholderTextColor={isDarkMode ? "#1DCDFE80" : "#17222D80"}
          />
        </View>

        {input.length == 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            scrollEventThrottle={16}
          >
            <RecentItemsSearch isDarkMode={isDarkMode} />
            <PopularQueues isDarkMode={isDarkMode} />
          </ScrollView>
        ) : (
          <SearchFilter
            page={page}
            perPage={perPage}
            input={input}
            isDarkMode={isDarkMode}
          />
        )}
      </View>
    </View>
  );
}
