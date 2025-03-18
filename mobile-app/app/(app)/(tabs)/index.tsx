import React, { useEffect, useState, useCallback, useRef } from "react";
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
  FlatList,
  Modal,
} from "react-native";
import ScanQr from "@/components/ScanQR";
import SearchBar from "@/components/SearchBar";
import CategoriesList from "@/components/CategoriesList";
import RecentQueues from "@/components/RecentQueues";
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
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useLinkTo } from "@react-navigation/native";
import * as Linking from "expo-linking";

export default function Index() {
  const { isDarkMode } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [recentQueues, setRecentQueues] = useState<number>(0);
  const windowWidth = useWindowDimensions().width;
  const { showSia } = useSia();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isNavigatingRef = useRef(false);
  const linkTo = useLinkTo();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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

  const debounceNavigation = useCallback((navigateFunc: () => void) => {
    if (isNavigatingRef.current) return;

    isNavigatingRef.current = true;
    navigateFunc();

    // Reset after navigation has likely completed
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 500);
  }, []);

  const handleNotificationsPress = useCallback(() => {
    debounceNavigation(() => {
      linkTo("/Notifications");
    });
  }, [debounceNavigation, linkTo]);

  const handleSearchPress = useCallback(() => {
    debounceNavigation(() => {
      linkTo("/Search");
    });
  }, [debounceNavigation, linkTo]);

  // Home screen should refresh more frequently if user is in a queue
  const autoRefreshInterval = currentQueues.length > 0 ? 60000 : 180000; // 1 minute if in queue, 3 minutes otherwise

  // Update notification button styles to make it more responsive
  const notificationButtonStyle = {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center" as const,
    alignItems: "center" as const,
    zIndex: 10, // Add zIndex to ensure it's above other elements
  };

  // Update search bar styles to make it more responsive
  const searchBarStyle = {
    backgroundColor: "#FFFFFF",
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    zIndex: 5, // Add zIndex to ensure it's above other elements
  };

  // Handler for popular service press
  const handleServicePress = useCallback(
    (index: number) => {
      const serviceNames = [
        "Emirates Bank",
        "City Hospital",
        "Government Services",
        "Mall Services",
      ];

      debounceNavigation(() => {
        const brandName = serviceNames[index];
        const serviceType = ["banking", "health", "government", "retail"][
          index
        ];
        linkTo(
          `/(app)/(tabs)/Partner?brandName=${encodeURIComponent(
            brandName
          )}&serviceType=${serviceType}`
        );
      });
    },
    [debounceNavigation, linkTo]
  );

  // Configure the RefreshableWrapper to be more touch-friendly
  const refreshableWrapperConfig = {
    showsVerticalScrollIndicator: false,
    scrollEventThrottle: 16,
    onScroll: handleScroll,
    delaysContentTouches: false,
    keyboardShouldPersistTaps: "handled",
    bounces: true,
  };

  const handleLocationPress = () => {
    setIsDropdownVisible(true);
  };

  const handleOptionSelect = (option: string) => {
    // Handle selection (future implementation)
    console.log(`Selected option: ${option}`);
    // Here you would update state or navigate based on selection
    setIsDropdownVisible(false);
  };

  const handleFaqPress = () => {
    Linking.openURL("https://tawabiry.com/faq");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Dropdown Modal */}
      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdownContent}>
              <Text style={styles.dropdownTitle}>Choose Queue View</Text>
              {["All Queues", "Near Me", "Favorites", "Recent"].map(
                (option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownOption}
                    onPress={() => handleOptionSelect(option)}
                  >
                    <Text style={styles.dropdownOptionText}>{option}</Text>
                  </TouchableOpacity>
                )
              )}
              <TouchableOpacity
                style={[styles.dropdownOption, styles.cancelOption]}
                onPress={() => setIsDropdownVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Floating ScanQr button */}
      <ScanQr asFloatingButton={true} />

      {/* Header with gradient background extending under status bar */}
      <LinearGradient
        colors={["#17222D", "#13404D"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={[styles.notificationButton, notificationButtonStyle]}
              onPress={handleNotificationsPress}
              activeOpacity={0.6}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              pressRetentionOffset={{
                top: 20,
                bottom: 20,
                left: 20,
                right: 20,
              }}
            >
              <Ionicons name="notifications" size={24} color="#1DCDFE" />
            </TouchableOpacity>

            <View style={styles.locationContainer}>
              <Text style={styles.welcomeText}>Your Queues</Text>
              <TouchableOpacity
                onPress={handleLocationPress}
                style={styles.locationRow}
              >
                <Text style={styles.locationText}>Queue Anywhere</Text>
                <FontAwesome5
                  name="chevron-down"
                  size={12}
                  color="#1DCDFE"
                  style={styles.locationIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.placeholder} />
          </View>

          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={[styles.searchBar, searchBarStyle]}
              onPress={handleSearchPress}
              activeOpacity={0.6}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              pressRetentionOffset={{
                top: 15,
                bottom: 15,
                left: 15,
                right: 15,
              }}
              delayPressIn={0}
            >
              <FontAwesome5 name="search" size={16} color="#777" />
              <Text style={styles.searchPlaceholder}>
                Search for services & more
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.contentWrapper}>
        <RefreshableWrapper
          refreshId="home-screen"
          onRefresh={fetchHomeData}
          autoRefreshInterval={autoRefreshInterval}
          scrollViewProps={refreshableWrapperConfig}
        >
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

            {/* Categories - REPLACED with CategoriesList component */}
            <CategoriesList isDarkMode={isDarkMode} />

            {/* Feature Banner */}
            <View style={styles.featureBanner}>
              <LinearGradient
                colors={["#1DCDFE", "#34F5C5"]}
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
                    <TouchableOpacity
                      key={index}
                      style={styles.serviceItem}
                      activeOpacity={0.6}
                      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                      pressRetentionOffset={{
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10,
                      }}
                      delayPressIn={0}
                      onPress={() => handleServicePress(index)}
                    >
                      <View style={styles.serviceImageContainer}>
                        <View style={styles.servicePlaceholder}>
                          <FontAwesome5
                            name={
                              ["building", "hospital", "university", "store"][
                                index
                              ]
                            }
                            size={24}
                            color="#1DCDFE"
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
            <TouchableOpacity
              style={styles.faqBanner}
              onPress={handleFaqPress}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={["#17222D", "#13404D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.faqGradient}
              >
                <View style={styles.faqContent}>
                  <Text style={styles.faqTitle}>
                    Frequently Asked Questions
                  </Text>
                  <Text style={styles.faqSubtitle}>
                    Have questions? Get answers to common queries about our app
                  </Text>
                </View>
                <View style={styles.faqIconContainer}>
                  <FontAwesome5
                    name="question-circle"
                    size={36}
                    color="#1DCDFE"
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </RefreshableWrapper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17222D", // ocean-blue from tailwind config
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
    paddingHorizontal: 20,
    height: 56,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    width: 40, // Same width as notification button for balanced layout
  },
  locationContainer: {
    alignItems: "center",
  },
  welcomeText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5, // Add padding to increase touch area
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
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 8,
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
  contentWrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  contentContainer: {
    padding: 16,
  },
  loadingContainer: {
    alignItems: "center",
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
    zIndex: 1,
  },
  serviceItem: {
    width: "48%",
    marginBottom: 16,
    padding: 8,
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
    backgroundColor: "rgba(29, 205, 254, 0.1)", // baby-blue with opacity
    justifyContent: "center",
    alignItems: "center",
  },
  serviceRating: {
    fontSize: 12,
    color: "#1DCDFE", // baby-blue
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
  faqBanner: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  faqGradient: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  faqContent: {
    flex: 1,
  },
  faqTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  faqSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
  },
  faqIconContainer: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownContent: {
    padding: 16,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  dropdownOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  dropdownOptionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  cancelOption: {
    marginTop: 8,
    borderBottomWidth: 0,
  },
  cancelText: {
    color: "#1DCDFE",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
