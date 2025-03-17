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
} from "react-native";
import ScanQr from "@/components/ScanQR";
import SearchBar from "@/components/SearchBar";
import CategoriesList from "@/components/CategoriesList";
import RecentQueues from "@/components/RecentQueues";
import FrequentlyAsked from "@/components/FrequentlyAsked";
import CurrentQueuesList from "@/components/CurrentQueuesList";
import PromoCardSvg from "@/assets/images/promo-card.svg";
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
import Logo from "@/shared/icons/logo";
import i18n from "@/i18n";
import { FontAwesome5 } from "@expo/vector-icons";

// Define a simple PromoCard component inline to avoid import issues
const PromoCard = ({ width }: { width: number }) => {
  return (
    <TouchableOpacity style={[styles.promoCard, { width }]} activeOpacity={0.9}>
      <LinearGradient
        colors={["#0077B6", "#005f92"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.promoGradient}
      >
        <View style={styles.promoContent}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>iQueue</Text>
            <Text style={styles.promoSubtitle}>
              {i18n.t("bookYourSpot") || "Book your spot now!"}
            </Text>
          </View>
          <View style={styles.promoImageContainer}>
            <PromoCardSvg height={80} width={120} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function Index() {
  const { isDarkMode } = useTheme();
  const [bgColor, setBgColor] = useState("#17222D");
  const [scrollY, setScrollY] = useState(0);
  const scanQrRef = useRef<View>(null);
  const [scanQrHeight, setScanQrHeight] = useState(0);
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

  useEffect(() => {
    if (scrollY > scanQrHeight) {
      setBgColor(isDarkMode ? "#0C1824" : "#F5F5F5");
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor(isDarkMode ? "#0C1824" : "#F5F5F5", true);
      }
      StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    } else {
      setBgColor("#17222D");
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor("#17222D", true);
      }
      StatusBar.setBarStyle("light-content");
    }
  }, [scrollY, scanQrHeight, isDarkMode]);

  const handleLayout = (event: {
    nativeEvent: { layout: { height: React.SetStateAction<number> } };
  }) => {
    setScanQrHeight(event.nativeEvent.layout.height);
  };

  // Home screen should refresh more frequently if user is in a queue
  const autoRefreshInterval = currentQueues.length > 0 ? 60000 : 180000; // 1 minute if in queue, 3 minutes otherwise

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar
        translucent
        backgroundColor="#17222D"
        barStyle="light-content"
      />
      <RefreshableWrapper
        refreshId="home-screen"
        onRefresh={fetchHomeData}
        autoRefreshInterval={autoRefreshInterval}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          scrollEventThrottle: 16,
          onScroll: handleScroll,
        }}
      >
        {/* Header Section with Scan QR */}
        <View ref={scanQrRef} onLayout={handleLayout}>
          <LinearGradient
            colors={["#17222D", "#0B3954"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.headerSection}
          >
            <View style={styles.headerContent}>
              <View style={styles.logoContainer}>
                <Logo width={30} height={30} />
                <Text style={styles.logoText}>tawabiry</Text>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <FontAwesome5 name="bell" size={18} color="#00FFFF" />
              </TouchableOpacity>
            </View>

            <ScanQr isDarkMode={true} />
          </LinearGradient>
        </View>

        {/* Main Content Section */}
        <View style={styles.mainContent}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <SearchBar isDarkMode={false} />
          </View>

          {/* Current Queues or Promo */}
          <View style={styles.sectionContainer}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Skeleton
                  colorMode="light"
                  width={windowWidth - 32}
                  height={160}
                  radius={16}
                />
              </View>
            ) : currentQueues.length > 0 ? (
              <CurrentQueuesList />
            ) : (
              <PromoCard width={windowWidth - 32} />
            )}
          </View>

          {/* Categories */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{i18n.t("categories")}</Text>
            <CategoriesList isDarkMode={false} />
          </View>

          {/* Recent Queues (if any) */}
          {recentQueues > 0 && (
            <View style={styles.sectionContainer}>
              <RecentQueues isDarkMode={false} />
            </View>
          )}

          {/* Frequently Asked */}
          <View style={[styles.sectionContainer, styles.lastSection]}>
            <FrequentlyAsked isDarkMode={false} />
          </View>
        </View>
      </RefreshableWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },
  headerSection: {
    paddingBottom: 25,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 8,
  },
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0077B6",
    marginBottom: 12,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  lastSection: {
    marginBottom: 40,
  },
  // PromoCard styles
  promoCard: {
    height: 140,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
  },
  promoGradient: {
    flex: 1,
    padding: 16,
  },
  promoContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promoTextContainer: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  promoSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  promoImageContainer: {
    width: 120,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
