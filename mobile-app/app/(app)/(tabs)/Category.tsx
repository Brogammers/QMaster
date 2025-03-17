import configConverter from "@/api/configConverter";
import arabiata from "@/assets/images/arabiata.png";
import { useTheme } from "@/ctx/ThemeContext";
import QueueCard from "@/shared/components/QueueCard";
import { CurrentQueuesProps } from "@/types";
import { useLinkTo } from "@react-navigation/native";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import i18n from "@/i18n";
import { formatCategoryName } from "@/utils";
import RefreshableWrapper from "@/components/RefreshableWrapper";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const page = 1;
const perPage = 5;

export default function Category() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const categoryName = formatCategoryName(name);
  const linkTo = useLinkTo();
  const { isDarkMode } = useTheme();
  const [current, setCurrent] = useState<CurrentQueuesProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleBrandPress = (brand: any) => {
    linkTo("/Partner");
    router.setParams({
      brandName: brand.name,
      image: brand.image,
    });
  };

  const fetchCategoryData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const url = configConverter(
        "EXPO_PUBLIC_API_BASE_URL_GET_BUSINESSES_BY_CATEGORY"
      );

      const response = await axios.get(
        `${url}?category=${name}&page=${page}&per-page=${perPage}`
      );

      if (response.status === 200 && response.data?.businesses?.content) {
        const data = response.data.businesses.content;
        if (Array.isArray(data) && data.length > 0) {
          const currentQueues = data.map((business: any) => ({
            id: business.id,
            name: business.name,
            image: arabiata,
            time: 20,
            people: 20,
          }));
          setCurrent(currentQueues);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(
        `Category data fetch error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setError(true);
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;
      await fetchCategoryData();
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [name, fetchCategoryData]);

  const goBack = () => {
    router.back();
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
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
              <FontAwesome name="chevron-left" size={16} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{categoryName}</Text>
            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      <RefreshableWrapper
        refreshId={`category-${name}`}
        onRefresh={fetchCategoryData}
        autoRefreshInterval={300000} // Auto refresh every 5 minutes
        className="flex-1 bg-white"
      >
        <View style={styles.content}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0077B6" />
            </View>
          )}

          {!loading &&
            !error &&
            current.length > 0 &&
            current.map((brand, index) => (
              <QueueCard
                key={index}
                name={brand.name}
                image={brand.image}
                time={brand.time}
                people={brand.people}
                onPress={() => handleBrandPress(brand)}
                isDarkMode={false}
              />
            ))}

          {!loading && (error || current.length === 0) && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>{i18n.t("noData")}</Text>
              <Text style={styles.emptySubtitle}>{i18n.t("noDisplay")}</Text>
            </View>
          )}
        </View>
      </RefreshableWrapper>
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
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
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
  content: {
    padding: 16,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0077B6",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 32,
  },
});
