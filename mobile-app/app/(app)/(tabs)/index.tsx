import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import ScanQr from "@/components/ScanQR";
import SearchBar from "@/components/SearchBar";
import CategoriesList from "@/components/CategoriesList";
import RecentQueues from "@/components/RecentQueues";
import FrequentlyAsked from "@/components/FrequentlyAsked";
import CurrentQueuesList from "@/components/CurrentQueuesList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Skeleton } from "moti/skeleton";
import { useTheme } from "@/ctx/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useSia } from "@/ctx/SiaContext";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setCurrentQueues } from "@/app/redux/queueSlice";
import axios from "axios";
import configConverter from "@/api/configConverter";
import RefreshableWrapper from "@/components/RefreshableWrapper";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Index() {
  const { isDarkMode } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [recentQueues, setRecentQueues] = useState<number>(0);
  const windowWidth = useWindowDimensions().width;
  const { showSia } = useSia();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get current queues from Redux
  const currentQueues = useSelector(
    (state: RootState) => state.queue.currentQueues
  );

  const fetchHomeData = useCallback(async () => {
    try {
      setIsLoading(true);

      // Get current queues from AsyncStorage
      const currentQueuesData = await AsyncStorage.getItem("currentQueues");

      if (currentQueuesData) {
        const parsedQueues = JSON.parse(currentQueuesData);
        const token = await AsyncStorage.getItem("TOKEN_KEY");
        const verifiedQueues = [];

        // Verify each queue's status
        for (const queue of parsedQueues) {
          try {
            const url = configConverter(
              "EXPO_PUBLIC_API_BASE_URL_CHECK_IN_QUEUE"
            );
            const response = await axios.get(
              `${url}?queueName=${queue.serviceType}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.status === 200 && response.data.isPresent) {
              // Update queue with latest information
              verifiedQueues.push({
                ...queue,
                position: response.data.position || queue.position,
                estimatedTime:
                  response.data.estimatedTime || queue.estimatedTime,
              });
            }
          } catch (error) {
            console.error(`Error verifying queue ${queue.serviceType}:`, error);
          }
        }

        // Update both AsyncStorage and Redux
        await AsyncStorage.setItem(
          "currentQueues",
          JSON.stringify(verifiedQueues)
        );
        dispatch(setCurrentQueues(verifiedQueues));
      }

      // Get history data
      const historyData = await AsyncStorage.getItem("historyData");
      if (historyData) {
        const parsedData = JSON.parse(historyData);
        setRecentQueues(parsedData.length);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchHomeData();

    // Add listener for when the screen comes into focus
    const unsubscribe = navigation.addListener("focus", fetchHomeData);

    return () => {
      unsubscribe();
    };
  }, [fetchHomeData, navigation]);

  const handleScroll = (event: {
    nativeEvent: {
      contentOffset: {
        y: any;
      };
    };
  }) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    setScrollY(currentScrollY);
  };

  // Home screen should refresh more frequently if user is in a queue
  const autoRefreshInterval = currentQueues.length > 0 ? 60000 : 180000; // 1 minute if in queue, 3 minutes otherwise

  // Categories for the home screen based on Talabat's design
  const categories = [
    { id: 1, name: "Banking", icon: "university" },
    { id: 2, name: "Health", icon: "heartbeat" },
    { id: 3, name: "Government", icon: "landmark" },
    { id: 4, name: "Restaurants", icon: "utensils" },
    { id: 5, name: "Retail", icon: "shopping-bag" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Floating ScanQr button */}
      <ScanQr asFloatingButton={true} />

      <RefreshableWrapper
        refreshId="home-screen"
        onRefresh={fetchHomeData}
        autoRefreshInterval={autoRefreshInterval}
        scrollViewProps={{
          className: "w-screen",
          showsVerticalScrollIndicator: false,
          scrollEventThrottle: 16,
          onScroll: handleScroll,
        }}
      >
        {/* Header with location and search */}
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={["#FF5722", "#FF7043"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.locationContainer}>
              <Text style={styles.deliverToText}>Deliver to</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationText}>Apartment</Text>
                <FontAwesome5
                  name="chevron-down"
                  size={12}
                  color="#fff"
                  style={styles.locationIcon}
                />
              </View>
            </View>

            <View style={styles.searchContainer}>
              <TouchableOpacity style={styles.searchBar}>
                <FontAwesome5 name="search" size={16} color="#777" />
                <Text style={styles.searchPlaceholder}>
                  Search for services & more
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Main content */}
        <View style={styles.contentContainer}>
          {/* Current Queues Section */}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Skeleton
                colorMode={isDarkMode ? "dark" : "light"}
                width={windowWidth * 0.85}
                height={175}
                radius={16}
              />
            </View>
          ) : currentQueues.length > 0 ? (
            <CurrentQueuesList />
          ) : null}

          {/* Categories */}
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.categoryItem}>
                  <View style={styles.categoryIconContainer}>
                    <FontAwesome5
                      name={category.icon}
                      size={20}
                      color="#FF5722"
                    />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Feature Banner */}
          <View style={styles.featureBanner}>
            <LinearGradient
              colors={["#FF9800", "#FF5722"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.bannerGradient}
            >
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>Skip the wait!</Text>
                <Text style={styles.bannerSubtitle}>
                  Join queues remotely and get notified when it's your turn
                </Text>
              </View>
              <View style={styles.bannerIconContainer}>
                <FontAwesome5 name="clock" size={36} color="#FFF" />
              </View>
            </LinearGradient>
          </View>

          {/* Recent Queues Section - Only show if there are recent queues */}
          {recentQueues > 0 && <RecentQueues isDarkMode={isDarkMode} />}

          {/* Featured Services */}
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <Text style={styles.sectionSubtitle}>
              Join the most popular queues
            </Text>

            <View style={styles.servicesContainer}>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <TouchableOpacity key={index} style={styles.serviceItem}>
                    <View style={styles.serviceImageContainer}>
                      <View style={styles.servicePlaceholder}>
                        <FontAwesome5
                          name={
                            ["building", "hospital", "university", "store"][
                              index
                            ]
                          }
                          size={24}
                          color="#FF5722"
                        />
                      </View>
                    </View>
                    <Text style={styles.serviceRating}>
                      ★ {(4.1 + index * 0.2).toFixed(1)} (1000+)
                    </Text>
                    <Text style={styles.serviceName}>
                      {
                        [
                          "Emirates Bank",
                          "City Hospital",
                          "Government Services",
                          "Mall Services",
                        ][index]
                      }
                    </Text>
                    <Text style={styles.serviceWaitTime}>
                      ~ {10 + index * 5} min wait
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>

          {/* FAQ Section */}
          <FrequentlyAsked isDarkMode={false} />
        </View>
      </RefreshableWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    width: "100%",
  },
  headerGradient: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  locationContainer: {
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliverToText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
  },
  locationText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  locationIcon: {
    marginLeft: 4,
  },
  searchContainer: {
    marginTop: 4,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
  },
  searchPlaceholder: {
    color: "#777777",
    marginLeft: 8,
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  categoriesSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  categoryItem: {
    width: "18%",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 87, 34, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
  featureBanner: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  bannerGradient: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
  },
  bannerIconContainer: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  featuredSection: {
    marginVertical: 16,
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceItem: {
    width: "48%",
    marginBottom: 16,
  },
  serviceImageContainer: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  servicePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 87, 34, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  serviceRating: {
    fontSize: 12,
    color: "#FF9800",
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  serviceWaitTime: {
    fontSize: 12,
    color: "#666",
  },
});
