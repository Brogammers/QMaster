import React from "react";
import {
  View,
  ScrollView,
  I18nManager,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Category from "@/shared/components/CategoryPop";
import { AllCategories as CategoryList } from "@/constants";
import { useLinkTo } from "@react-navigation/native";
import { useTheme } from "@/ctx/ThemeContext";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import i18n from "@/i18n";
import BackButton from "@/shared/components/BackButton";

interface CategoryProps {
  title: string;
  image: any;
  name: string;
  icon?: string;
}

export default function AllCategories() {
  const linkTo = useLinkTo();
  const { isDarkMode } = useTheme();

  const handleCategoryPress = (category: string) => {
    linkTo(`/Category`);
    router.setParams({ name: category });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header with gradient background extending under status bar */}
      <LinearGradient
        colors={["#17222D", "#0B3954"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContent}>
            <BackButton
              color="white"
              style={styles.backButton}
              backTo="/(app)/(tabs)"
            />
            <Text style={styles.headerTitle}>{i18n.t("categories")}</Text>
            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.categoryGrid}>
          {CategoryList.map((category: CategoryProps, index: number) => (
            <View key={index} style={styles.categoryContainer}>
              <Category
                name={category.name}
                title={category.title}
                icon={category.icon || "question"}
                onPress={() => handleCategoryPress(category.name)}
                isDarkMode={false}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  safeArea: {
    paddingTop: StatusBar.currentHeight || 44,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  placeholder: {
    width: 32,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: I18nManager.isRTL ? "flex-end" : "flex-start",
  },
  categoryContainer: {
    width: "33.33%",
    padding: 8,
  },
});
