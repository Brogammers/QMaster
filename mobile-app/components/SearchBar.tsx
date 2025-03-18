import React, { useRef, useCallback } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter, router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import i18n from "@/i18n";

type SearchBarProps = {
  isDarkMode?: boolean;
};

export default function SearchBar({ isDarkMode = false }: SearchBarProps) {
  const isNavigatingRef = useRef(false);

  const handleSearchPress = useCallback(() => {
    if (isNavigatingRef.current) return;

    isNavigatingRef.current = true;
    router.push("/(app)/(tabs)/Search");

    // Reset after navigation has likely completed
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 500);
  }, []);

  return (
    <TouchableOpacity
      onPress={handleSearchPress}
      style={styles.searchContainer}
      activeOpacity={0.9}
    >
      <View style={styles.searchBar}>
        <FontAwesome5 name="search" size={16} color="#777" />
        <Text style={styles.searchPlaceholder}>
          {i18n.t("searchPlaceholder") || "Search for services & more"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 16,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  searchPlaceholder: {
    color: "#777777",
    marginLeft: 8,
    fontSize: 14,
  },
});
