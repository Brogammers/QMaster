import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ellipse from "assets/images/Ellipse.svg";
import { Dimensions } from "react-native";
import { CategoryProps } from "@/types";
import { FontAwesome5 } from "@expo/vector-icons";

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
        <View className="absolute self-center">
          <Ellipse />
        </View>
        <View className="w-12 h-12 flex items-center justify-center">
          <FontAwesome5
            name={icon}
            size={24}
            color={isDarkMode ? "#1DCDFE" : "#1DCDFE"}
            style={{ marginBottom: spacing }}
          />
        </View>
      </View>
      <Text
        className={`px-2 text-center ${
          isDarkMode ? "text-white" : "text-coal-black"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
