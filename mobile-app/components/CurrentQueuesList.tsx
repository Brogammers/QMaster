import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import i18n from "@/i18n";
import Carousel from "react-native-reanimated-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@/ctx/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { removeFromQueue } from "@/app/redux/queueSlice";

type RootStackParamList = {
  Partner: {
    brandName: string;
    currentLocation: string;
  };
};

export default function CurrentQueuesList() {
  const { isDarkMode } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width: windowWidth } = useWindowDimensions();
  const carouselWidth = windowWidth * 0.85; // 85% of screen width

  const dispatch = useDispatch();
  const queues = useSelector((state: RootState) => state.queue.currentQueues);

  const handleQueuePress = (queue: (typeof queues)[0]) => {
    navigation.navigate("Partner", {
      brandName: queue.name,
      currentLocation: queue.location,
    });
  };

  const handleLeaveQueue = (queueId: number) => {
    // Remove from Redux store
    dispatch(removeFromQueue(queueId));
  };

  const renderItem = ({ item }: { item: (typeof queues)[0] }) => (
    <TouchableOpacity
      onPress={() => handleQueuePress(item)}
      style={[
        styles.queueCard,
        isDarkMode ? styles.darkCard : styles.lightCard,
      ]}
    >
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <View
            style={[
              styles.imagePlaceholder,
              {
                backgroundColor: isDarkMode
                  ? "rgba(29, 205, 254, 0.2)"
                  : "#E5F7FF",
              },
            ]}
          >
            <Text
              style={[
                styles.placeholderText,
                { color: isDarkMode ? "#1DCDFE" : "#0077B6" },
              ]}
            >
              {item.name ? item.name.charAt(0).toUpperCase() : "?"}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.titleText,
              { color: isDarkMode ? "white" : "#17222D" },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.subtitleText,
              { color: isDarkMode ? "#1DCDFE" : "#0077B6" },
            ]}
          >
            {item.serviceType}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <FontAwesomeIcon
              icon={faUser}
              size={14}
              color={isDarkMode ? "#1DCDFE" : "#0077B6"}
            />
            <Text
              style={[
                styles.detailText,
                { color: isDarkMode ? "white" : "#17222D" },
              ]}
            >
              {i18n.t("position")}: {item.position}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <FontAwesomeIcon
              icon={faClock}
              size={14}
              color={isDarkMode ? "#1DCDFE" : "#0077B6"}
            />
            <Text
              style={[
                styles.detailText,
                { color: isDarkMode ? "white" : "#17222D" },
              ]}
            >
              ~{item.estimatedTime} {i18n.t("minutes")}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.leaveButton, { backgroundColor: "#D84315" }]}
          onPress={() => handleLeaveQueue(item.id)}
        >
          <Text style={styles.leaveButtonText}>
            {i18n.t("common.queue.leave")}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.sectionTitle,
          { color: isDarkMode ? "white" : "#17222D" },
        ]}
      >
        {i18n.t("currentQueues")}
      </Text>

      {queues.length > 0 ? (
        <Carousel
          loop={false}
          width={carouselWidth}
          height={166}
          data={queues}
          scrollAnimationDuration={1000}
          renderItem={renderItem}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
            parallaxAdjacentItemScale: 0.8,
          }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text
            style={[
              styles.emptyText,
              { color: isDarkMode ? "#1DCDFE" : "#0077B6" },
            ]}
          >
            {i18n.t("noData")}
          </Text>
          <Text
            style={[
              styles.emptySubtext,
              {
                color: isDarkMode
                  ? "rgba(255,255,255,0.7)"
                  : "rgba(23,34,45,0.7)",
              },
            ]}
          >
            {i18n.t("noDisplay")}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 24,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    alignSelf: "flex-start",
    paddingHorizontal: 20,
  },
  queueCard: {
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    flexDirection: "row",
  },
  darkCard: {
    backgroundColor: "rgba(23,34,45,0.7)",
    borderWidth: 1,
    borderColor: "rgba(29,205,254,0.25)",
  },
  lightCard: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  contentContainer: {
    width: "60%",
    padding: 16,
    justifyContent: "space-between",
  },
  headerContainer: {
    marginBottom: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 14,
    marginTop: 2,
  },
  detailsContainer: {
    marginVertical: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  leaveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  leaveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyContainer: {
    height: 160,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
