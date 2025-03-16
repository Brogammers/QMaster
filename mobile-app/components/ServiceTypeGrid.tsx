import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@/ctx/ThemeContext";
import { MotiView } from "moti";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import configConverter from "@/api/configConverter";
import axios from "axios";
import { Queue, QueuesContext } from "./JoinQueue";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ServiceTypeGridProps {
  onSelectService: (service: Queue) => void;
  businessName: string;
  locationId: number;
}

export default function ServiceTypeGrid({
  onSelectService,
  businessName,
  locationId,
}: ServiceTypeGridProps) {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const { queues, setQueues, setSelectedQueue } = useContext(QueuesContext);

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const token = await AsyncStorage.getItem("TOKEN_KEY");
        const url = configConverter("EXPO_PUBLIC_API_BASE_URL_GET_QUEUES");
        const response = await axios.get(
          `${url}?businessName=${businessName}&locationId=${locationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const queueData = response.data.queues.map((queue: any) => ({
            id: queue.id,
            name: queue.name,
            averageServiceTime: queue.averageServiceTime,
            currentQueueSize: queue.people,
          }));
          setQueues(queueData);

          if (queueData.length === 1) {
            setSelectedQueue(queueData[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching queues:", error);
      } finally {
        setLoading(false);
      }
    };

    if (businessName && locationId) {
      fetchQueues();
    }
  }, [businessName, locationId]);

  const renderItem = ({ item }: { item: Queue }) => {
    const estimatedWaitTime = item.averageServiceTime * item.currentQueueSize;

    return (
      <TouchableOpacity onPress={() => onSelectService(item)}>
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 300 }}
          style={[
            styles.serviceItem,
            isDarkMode ? styles.darkServiceItem : styles.lightServiceItem,
          ]}
        >
          <View style={styles.serviceContent}>
            <Text
              style={[
                styles.serviceName,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}
            >
              {item.name}
            </Text>

            <View style={styles.waitTimeContainer}>
              <MaterialCommunityIcons
                name="timer-sand"
                size={18}
                color={isDarkMode ? "#1DCDFE" : "#0077B6"}
              />
              <Text
                style={[
                  styles.waitTimeText,
                  isDarkMode ? styles.darkWaitTime : styles.lightWaitTime,
                ]}
              >
                ~ {estimatedWaitTime} min
              </Text>
            </View>
          </View>
        </MotiView>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DCDFE" />
      </View>
    );
  }

  return (
    <FlatList
      data={queues}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  serviceItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 13,
    marginVertical: 3,
    borderRadius: 12,
  },
  serviceContent: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lightServiceItem: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderWidth: 1.5,
  },
  darkServiceItem: {
    backgroundColor: "rgba(29, 205, 254, 0.1)",
    borderColor: "rgba(29, 205, 254, 0.2)",
    borderWidth: 1.5,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "500",
  },
  lightText: {
    color: "#17222D",
  },
  darkText: {
    color: "#1DCDFE",
  },
  waitTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "rgba(0, 119, 182, 0.1)",
    // paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  waitTimeText: {
    marginLeft: 2,
    fontSize: 14,
    fontWeight: "500",
  },
  darkWaitTime: {
    color: "#1DCDFE",
  },
  lightWaitTime: {
    color: "#0077B6",
  },
});
