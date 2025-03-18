import React, { useRef, useCallback } from "react";
import { Text, View } from "react-native";
import CategoryPop from "@/shared/components/CategoryPop";
import { Categories } from "@/constants";
import i18n from "@/i18n";
import { router } from "expo-router";

interface CategoriesListProps {
  isDarkMode?: boolean;
}

export default function CategoriesList({ isDarkMode }: CategoriesListProps) {
  const isNavigatingRef = useRef(false);

  const handleCategoryPress = useCallback((category: string) => {
    if (isNavigatingRef.current) return;

    isNavigatingRef.current = true;

    if (category === i18n.t("others")) {
      router.push("/(app)/(tabs)/AllCategories");
    } else {
      router.push({
        pathname: "/(app)/(tabs)/Category",
        params: { name: category },
      });
    }

    // Reset after navigation has likely completed
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 500);
  }, []);

  return (
    <View className="flex flex-col">
      <Text
        className={`my-3 text-2xl font-bold text-left ${
          isDarkMode ? "text-white" : "text-coal-black"
        }`}
      >
        {i18n.t("categories")}
      </Text>
      <View className="w-full flex flex-row flex-wrap self-center justify-between">
        {Categories.map((category, index) => (
          <CategoryPop
            name={category.name}
            key={index}
            title={category.title}
            icon={category.icon}
            onPress={() => handleCategoryPress(category.name)}
            isDarkMode={isDarkMode}
          />
        ))}
      </View>
    </View>
  );
}
