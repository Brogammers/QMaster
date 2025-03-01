import configConverter from "@/api/configConverter";
import { useTheme } from "@/ctx/ThemeContext";
import i18n from "@/i18n";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { QueuesContext } from "./JoinQueue";
import { useDispatch, useSelector } from "react-redux";
import { addToQueue, removeFromQueue } from "@/app/redux/queueSlice";
import { RootState } from "@/app/redux/store";

interface QueueData {
  id: number;
  position: number;
  estimatedTime: number;
}

interface QueueDetailsProps {
  branch: number;
  serviceType: string;
  brandName: string;
}

export default function QueueDetails(props: QueueDetailsProps) {
  const width = Dimensions.get("window").width * 0.85;
  const buttonWidth = width * 0.7;
  const [leave, setLeave] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const { branch, serviceType, brandName } = props;
  const { isDarkMode } = useTheme();
  const { selectedQueue, setSelectedQueue } = useContext(QueuesContext);
  const dispatch = useDispatch();
  const activeQueue = useSelector(
    (state: RootState) => state.queue.activeQueue
  );

  // Use memoization to prevent needless recalculation
  const estimatedTime = useMemo(() => {
    if (!selectedQueue) return 0;
    return (
      selectedQueue.averageServiceTime *
      Math.max(0, selectedQueue.currentQueueSize - 1)
    );
  }, [selectedQueue?.averageServiceTime, selectedQueue?.currentQueueSize]);

  // Effect to update when activeQueue changes
  useEffect(() => {
    if (activeQueue?.serviceType === serviceType) {
      setLeave(true);
    } else {
      setLeave(false);
    }
  }, [activeQueue, serviceType]);

  // Check if user is in queue - wrapped in useCallback
  const checkQueueStatus = useCallback(async () => {
    if (isUpdating) return; // Prevent concurrent updates

    try {
      setIsUpdating(true);
      const token = await AsyncStorage.getItem("TOKEN_KEY");
      const url = configConverter("EXPO_PUBLIC_API_BASE_URL_CHECK_IN_QUEUE");

      const response = await axios.get(`${url}?queueName=${serviceType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setShowDetails(true);
        setLeave(response.data.isPresent);

        // Update queue size if needed
        if (response.data.position && selectedQueue) {
          setSelectedQueue((prev) => {
            if (!prev) return prev;
            if (prev.currentQueueSize !== response.data.position) {
              return {
                ...prev,
                currentQueueSize: response.data.position,
              };
            }
            return prev; // Return same reference if no change
          });
        }
      }
    } catch (error) {
      console.error("Error checking queue status:", error);
      setLeave(false);
    } finally {
      setIsUpdating(false);
    }
  }, [serviceType, selectedQueue, setSelectedQueue, isUpdating]);

  // Initial check when component mounts or dependencies change
  useEffect(() => {
    checkQueueStatus();
  }, [checkQueueStatus]);

  // Handle join queue action with useCallback
  const handleJoinQueue = useCallback(async () => {
    // Prevent multiple joins
    if (isJoining) return;

    setIsJoining(true);

    try {
      const session = await AsyncStorage.getItem("TOKEN_KEY");
      if (!session) {
        console.error("No session token found");
        setIsJoining(false);
        return;
      }

      const url = configConverter("EXPO_PUBLIC_API_BASE_URL_JOIN_QUEUE");

      const response = await axios.put(
        `${url}?queueName=${serviceType}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      );

      if (response.status === 200) {
        // Update UI state immediately
        setLeave(true);
        setShowDetails(false);

        // Create queue object
        const newQueue = {
          id: response.data.id,
          name: brandName,
          serviceType: serviceType,
          position: selectedQueue?.currentQueueSize || 1,
          estimatedTime: selectedQueue?.averageServiceTime || 7,
          location: branch.toString(),
          timestamp: new Date().toISOString(),
        };

        // Update Redux
        dispatch(addToQueue(newQueue));

        // Update AsyncStorage
        const existingQueues = await AsyncStorage.getItem("currentQueues");
        const currentQueues = existingQueues ? JSON.parse(existingQueues) : [];
        await AsyncStorage.setItem(
          "currentQueues",
          JSON.stringify([...currentQueues, newQueue])
        );

        // Show animation then update UI
        setTimeout(() => {
          setShowDetails(true);
          setSelectedQueue((prev) => {
            if (!prev) return prev;
            return { ...prev, currentQueueSize: prev.currentQueueSize + 1 };
          });
        }, 1000);
      }
    } catch (error) {
      console.error("Error joining queue:", error);
      Alert.alert(i18n.t("common.error"), i18n.t("common.queue.joinError"), [
        { text: i18n.t("common.ok") },
      ]);
    } finally {
      // Reset joining state but keep updating state active during animation
      setIsJoining(false);

      // Reset updating state after animation
      setTimeout(() => {
        setIsUpdating(false);
      }, 1500);
    }
  }, [
    branch,
    brandName,
    dispatch,
    selectedQueue,
    serviceType,
    setSelectedQueue,
    isJoining,
  ]);

  // Handle leave queue with useCallback
  const handleLeaveQueue = useCallback(() => {
    // Prevent multiple leaves
    if (isLeaving) return;

    setIsLeaving(true);

    const handleLeaveRequest = async () => {
      try {
        const session = await AsyncStorage.getItem("TOKEN_KEY");
        if (!session) {
          console.error("No session token found");
          setIsLeaving(false);
          return;
        }

        const url = configConverter("EXPO_PUBLIC_API_BASE_URL_JOIN_QUEUE");

        const response = await axios.put(
          `${url}?queueName=${serviceType}&leave=true`,
          {},
          {
            headers: {
              Authorization: `Bearer ${session}`,
            },
          }
        );

        if (response.status === 200) {
          setLeave(false);

          // Update Redux
          if (response.data && response.data.id) {
            dispatch(removeFromQueue(response.data.id));
          } else if (activeQueue) {
            dispatch(removeFromQueue(activeQueue.id));
          }

          // Update AsyncStorage
          const existingQueues = await AsyncStorage.getItem("currentQueues");
          if (existingQueues) {
            const currentQueues = JSON.parse(existingQueues);
            const updatedQueues = currentQueues.filter(
              (queue: any) => queue.serviceType !== serviceType
            );
            await AsyncStorage.setItem(
              "currentQueues",
              JSON.stringify(updatedQueues)
            );
          }

          // Update queue size
          setSelectedQueue((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              currentQueueSize: Math.max(0, prev.currentQueueSize - 1),
            };
          });
        }
      } catch (error) {
        console.error("Error leaving queue:", error);
        Alert.alert(i18n.t("common.error"), i18n.t("common.queue.leaveError"), [
          { text: i18n.t("common.ok") },
        ]);
      } finally {
        setIsLeaving(false);
        setIsUpdating(false);
      }
    };

    Alert.alert(
      i18n.t("common.queue.leaveConfirm.title"),
      i18n.t("common.queue.leaveConfirm.message"),
      [
        {
          text: i18n.t("common.queue.leaveConfirm.cancel"),
          style: "default",
          isPreferred: true,
          onPress: () => setIsLeaving(false),
        },
        {
          text: i18n.t("common.queue.leaveConfirm.confirm"),
          style: "destructive",
          onPress: handleLeaveRequest,
        },
      ],
      {
        cancelable: true,
        onDismiss: () => setIsLeaving(false),
      }
    );
  }, [dispatch, serviceType, setSelectedQueue, activeQueue, isLeaving]);

  // Memoize components to prevent rerenders
  const CardWrapper = useCallback(
    ({ children }: { children: React.ReactNode }) => (
      <View style={{ width }} className="mt-6 self-center">
        <LinearGradient
          colors={
            isDarkMode
              ? ["rgba(29, 205, 254, 0.1)", "rgba(29, 205, 254, 0.05)"]
              : ["#FFFFFF", "#F8FAFC"]
          }
          className="w-full p-6 items-center justify-center rounded-xl"
          style={{
            borderWidth: 1.5,
            borderColor: isDarkMode ? "rgba(29, 205, 254, 0.2)" : "#E5E7EB",
            minHeight: 160,
          }}
        >
          {children}
        </LinearGradient>
      </View>
    ),
    [width, isDarkMode]
  );

  const QueueJoinedAnimation = useCallback(
    () => (
      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 500 }}
        className="items-center justify-center w-full"
        style={{ height: 100 }}
      >
        <View
          className="flex-row items-center justify-center bg-opacity-10 rounded-full px-6 py-3"
          style={{
            backgroundColor: isDarkMode
              ? "rgba(29, 205, 254, 0.1)"
              : "rgba(0, 119, 182, 0.1)",
            width: buttonWidth,
          }}
        >
          <View className="flex-row items-center justify-center">
            <FontAwesome name="check-circle" size={24} color="#1DCDFE" />
            <Text className="text-baby-blue text-xl font-bold ml-3">
              {i18n.t("common.queue.joined")}
            </Text>
          </View>
        </View>
      </MotiView>
    ),
    [buttonWidth, isDarkMode]
  );

  // General loader component
  const GeneralLoader = useCallback(
    () => (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 10,
          borderRadius: 12,
        }}
      >
        <View
          style={{
            backgroundColor: isDarkMode
              ? "rgba(0, 10, 20, 0.8)"
              : "rgba(255, 255, 255, 0.9)",
            padding: 20,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#1DCDFE" />
          <Text
            style={{
              marginTop: 10,
              color: isDarkMode ? "#1DCDFE" : "#0077B6",
              fontWeight: "600",
            }}
          >
            {isJoining
              ? i18n.t("common.queue.joiningQueue")
              : isLeaving
              ? i18n.t("common.queue.leavingQueue")
              : i18n.t("common.loading")}
          </Text>
        </View>
      </View>
    ),
    [isDarkMode, isJoining, isLeaving]
  );

  // Render based on condition - prevent flickering by disabling transitions during updates
  return (
    <CardWrapper>
      {(isJoining || isLeaving) && <GeneralLoader />}

      {branch == -1 ? (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 300 }}
          className="items-center w-full"
        >
          <View className="flex-row items-start justify-between w-full">
            <View className="items-center flex-1">
              <Entypo
                name="location-pin"
                size={40}
                color={isDarkMode ? "#1DCDFE" : "#B41818"}
              />
              <Text
                className={`text-center mt-2 text-sm ${
                  isDarkMode ? "text-baby-blue" : "text-lava-black"
                }`}
              >
                {i18n.t("common.locationAccess")}
              </Text>
            </View>
          </View>
        </MotiView>
      ) : !leave ? (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 300 }}
          className="items-center"
        >
          <View className="items-center">
            <Text
              className={`text-2xl font-bold ${
                isDarkMode ? "text-baby-blue" : "text-lava-black"
              }`}
            >
              {selectedQueue?.currentQueueSize === 1
                ? i18n.t("common.queue.peopleCountSingular", {
                    count: selectedQueue?.currentQueueSize,
                  })
                : i18n.t("common.queue.peopleCount", {
                    count: selectedQueue?.currentQueueSize,
                  })}
            </Text>
            <View
              className="flex-row items-center mt-3 bg-opacity-10 rounded-full px-3 py-1.5"
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(29, 205, 254, 0.1)"
                  : "rgba(0, 119, 182, 0.1)",
              }}
            >
              <MaterialCommunityIcons
                name="timer-sand"
                size={18}
                color={isDarkMode ? "#1DCDFE" : "#0077B6"}
              />
              <Text
                className={`text-base ml-2 font-medium ${
                  isDarkMode ? "text-baby-blue" : "text-ocean-blue"
                }`}
              >
                {i18n.t("common.queue.waitTime", {
                  minutes: estimatedTime,
                })}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="mt-8 w-full"
            onPress={handleJoinQueue}
            disabled={isJoining}
            activeOpacity={0.7}
          >
            <View style={{ width: buttonWidth }} className="items-center">
              <LinearGradient
                colors={["#1DCDFE", "#0077B6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="w-full py-3 rounded-lg items-center px-12"
              >
                <Text className="text-lg font-bold text-white">
                  {i18n.t("common.queue.join")}
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </MotiView>
      ) : (
        <View className="items-center">
          {!showDetails ? (
            <QueueJoinedAnimation />
          ) : (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 300 }}
              className="items-center"
            >
              <View className="items-center">
                <Text
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-baby-blue" : "text-lava-black"
                  }`}
                >
                  {selectedQueue?.currentQueueSize === 1
                    ? i18n.t("common.queue.peopleCountSingular", {
                        count: selectedQueue?.currentQueueSize,
                      })
                    : i18n.t("common.queue.peopleCount", {
                        count: selectedQueue?.currentQueueSize,
                      })}
                </Text>
                <View
                  className="flex-row items-center mt-3 bg-opacity-10 rounded-full px-3 py-1.5"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(29, 205, 254, 0.1)"
                      : "rgba(0, 119, 182, 0.1)",
                  }}
                >
                  <MaterialCommunityIcons
                    name="timer-sand"
                    size={18}
                    color={isDarkMode ? "#1DCDFE" : "#0077B6"}
                  />
                  <Text
                    className={`text-base ml-2 font-medium ${
                      isDarkMode ? "text-baby-blue" : "text-ocean-blue"
                    }`}
                  >
                    {i18n.t("common.queue.waitTime", {
                      minutes: estimatedTime,
                    })}
                  </Text>
                </View>
              </View>

              <View className="items-center w-full mt-8">
                <View className="flex-row items-center justify-center w-full relative h-9 mb-6">
                  <LinearGradient
                    colors={
                      isDarkMode
                        ? ["rgba(29, 205, 254, 0.2)", "rgba(29, 205, 254, 0.1)"]
                        : ["#F1F5F9", "#F8FAFC"]
                    }
                    className="w-full rounded-full h-full flex-row items-center justify-center px-3"
                    style={{
                      borderWidth: 1.5,
                      borderColor: isDarkMode
                        ? "rgba(29, 205, 254, 0.2)"
                        : "#E5E7EB",
                    }}
                  >
                    <View className="flex-row items-center">
                      <FontAwesome
                        name="check-circle"
                        size={18}
                        color="#1DCDFE"
                      />
                      <Text className="text-baby-blue text-base font-medium ml-2">
                        {i18n.t("common.queue.joined")}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>

                <View style={{ width: buttonWidth }} className="items-center">
                  <TouchableOpacity
                    onPress={handleLeaveQueue}
                    className="w-full"
                    disabled={isLeaving}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={["#EF4444", "#B91C1C"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="py-3 rounded-lg items-center px-12"
                    >
                      <Text className="text-lg font-bold text-white">
                        {i18n.t("common.queue.leave")}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </MotiView>
          )}
        </View>
      )}
    </CardWrapper>
  );
}
