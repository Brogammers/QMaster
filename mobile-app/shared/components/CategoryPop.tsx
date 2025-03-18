import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { CategoryProps } from "@/types";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const wide = (width * 27) / 100;

interface ExtendedCategoryProps extends Omit<CategoryProps, "image"> {
  image?: CategoryProps["image"];
  isDarkMode?: boolean;
}

export default function CategoryPop(props: ExtendedCategoryProps) {
  const { title, spacing, onPress, isDarkMode, icon } = props;
  return (
    <TouchableOpacity
      className={`flex items-center justify-center h-24 rounded-2xl mb-2.5 ${
        isDarkMode ? "bg-slate-700/80 border border-slate-700" : "bg-white"
      }`}
      style={{ width: wide }}
      onPress={onPress}
    >
      <View>
        <LinearGradient
          colors={["rgba(29, 205, 254, 0.15)", "rgba(23, 34, 45, 0.08)"]}
          className="w-12 h-12 rounded-full flex items-center justify-center"
        >
          <FontAwesome5
            name={icon}
            size={22}
            color="#1DCDFE"
            style={{ marginBottom: spacing }}
          />
        </LinearGradient>
      </View>
      <Text
        className={`px-2 text-center mt-2 ${
          isDarkMode ? "text-white" : "text-coal-black"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
