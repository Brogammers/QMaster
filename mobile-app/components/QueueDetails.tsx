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
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
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

  // Effect to update when activeQueue changes
  useEffect(() => {
    if (activeQueue?.serviceType === serviceType) {
      setLeave(true);
    }
  }, [activeQueue, serviceType]);

  // Handle join queue action with useCallback - FIXED
  const handleJoinQueue = useCallback(async () => {
    // Add logging to help debug
    console.log("Join queue button pressed");
    console.log("Current states:", { isJoining, isUpdating });

    // Prevent multiple operations
    if (isJoining) {
      console.log("Join operation already in progress, ignoring");
      return;
    }

    setIsJoining(true); // Set flag immediately to prevent double clicks

    try {
      console.log("Starting join queue request");
      const session = await AsyncStorage.getItem("TOKEN_KEY");
      if (!session) {
        console.error("No session token found");
        setIsJoining(false);
        return;
      }

      const url = configConverter("EXPO_PUBLIC_API_BASE_URL_JOIN_QUEUE");
      console.log(`Making API request to: ${url}?queueName=${serviceType}`);

      const response = await axios.put(
        `${url}?queueName=${serviceType}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      );

      console.log("API response status:", response.status);
      if (response.status === 200) {
        console.log("Successfully joined queue");
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

        console.log("Starting animation sequence");
        // Update UI with animation timing
        setTimeout(() => {
          console.log("Animation timeout completed, showing details");
          setShowDetails(true);
          setSelectedQueue((prev) => {
            if (!prev) return prev;
            return { ...prev, currentQueueSize: prev.currentQueueSize + 1 };
          });
        }, 1000);
      } else {
        console.warn("Unexpected API response:", response);
      }
    } catch (error) {
      console.error("Error joining queue:", error);
      Alert.alert(i18n.t("common.error"), i18n.t("common.queue.joinError"), [
        { text: i18n.t("common.ok") },
      ]);
    } finally {
      // Reset joining flag but keep the updating flag set until animation completes
      console.log("Resetting join operation flag");
      setIsJoining(false);

      // Allow time for the animation to complete before resetting isUpdating
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
    isUpdating,
  ]);

  // COMPLETELY FIXED Leave Queue Handler
  const handleLeaveQueue = useCallback(() => {
    // Clear logging to help troubleshoot
    console.log("Leave queue button pressed");
    console.log("Current states:", { isLeaving, isUpdating });

    // Prevent multiple operations
    if (isLeaving) {
      console.log("Leave operation already in progress, ignoring");
      return;
    }

    setIsLeaving(true); // Set flag immediately to prevent double clicks

    const handleLeaveRequest = async () => {
      console.log("Starting leave queue request");
      try {
        const session = await AsyncStorage.getItem("TOKEN_KEY");
        if (!session) {
          console.error("No session token found");
          setIsLeaving(false);
          return;
        }

        const url = configConverter("EXPO_PUBLIC_API_BASE_URL_JOIN_QUEUE");
        console.log(
          `Making API request to: ${url}?queueName=${serviceType}&leave=true`
        );

        const response = await axios.put(
          `${url}?queueName=${serviceType}&leave=true`,
          {},
          {
            headers: {
              Authorization: `Bearer ${session}`,
            },
          }
        );

        console.log("API response status:", response.status);
        if (response.status === 200) {
          console.log("Successfully left queue");
          setLeave(false);

          // Update Redux
          if (response.data && response.data.id) {
            dispatch(removeFromQueue(response.data.id));
          } else {
            console.warn(
              "No queue ID in response, using active queue ID from Redux"
            );
            if (activeQueue) {
              dispatch(removeFromQueue(activeQueue.id));
            }
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
            console.log("AsyncStorage updated, removed queue");
          }

          // Update local queue state if needed
          if (setSelectedQueue) {
            setSelectedQueue((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                currentQueueSize: Math.max(0, prev.currentQueueSize - 1),
              };
            });
          }

          console.log("All state updates completed");
        } else {
          console.warn("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error leaving queue:", error);
        Alert.alert(i18n.t("common.error"), i18n.t("common.queue.leaveError"), [
          { text: i18n.t("common.ok") },
        ]);
      } finally {
        // Always reset flags
        console.log("Resetting leave operation flags");
        setIsLeaving(false);
        setIsUpdating(false);
      }
    };

    // Show confirmation dialog
    Alert.alert(
      i18n.t("common.queue.leaveConfirm.title"),
      i18n.t("common.queue.leaveConfirm.message"),
      [
        {
          text: i18n.t("common.queue.leaveConfirm.cancel"),
          style: "default",
          isPreferred: true,
          onPress: () => {
            console.log("Leave operation cancelled by user");
            setIsLeaving(false);
          },
        },
        {
          text: i18n.t("common.queue.leaveConfirm.confirm"),
          style: "destructive",
          onPress: () => {
            console.log("Leave operation confirmed by user");
            handleLeaveRequest();
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          console.log("Leave dialog dismissed");
          setIsLeaving(false);
        },
      }
    );
  }, [
    dispatch,
    serviceType,
    setSelectedQueue,
    activeQueue,
    isLeaving,
    isUpdating,
  ]);

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
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 700 }}
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
            <MotiView
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 200 }}
            >
              <FontAwesome name="check-circle" size={24} color="#1DCDFE" />
            </MotiView>
            <MotiView
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 400 }}
            >
              <Text className="text-baby-blue text-xl font-bold ml-3">
                {i18n.t("common.queue.joined")}
              </Text>
            </MotiView>
          </View>
        </View>
      </MotiView>
    ),
    [buttonWidth, isDarkMode]
  );

  // Render based on condition - prevent flickering by disabling transitions during updates
  return (
    <CardWrapper>
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
            activeOpacity={0.6}
          >
            <View style={{ width: buttonWidth }} className="items-center">
              <LinearGradient
                colors={["#1DCDFE", "#0077B6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className={`w-full py-3 rounded-lg items-center px-12 ${
                  isJoining ? "opacity-70" : ""
                }`}
              >
                <View className="flex-row items-center justify-center">
                  {isJoining ? (
                    <>
                      <MaterialCommunityIcons
                        name="loading"
                        size={20}
                        color="white"
                        style={{ marginRight: 8 }}
                      />
                      <Text className="text-lg font-bold text-white">
                        {i18n.t("common.loading")}
                      </Text>
                    </>
                  ) : (
                    <Text className="text-lg font-bold text-white">
                      {i18n.t("common.queue.join")}
                    </Text>
                  )}
                </View>
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
                    activeOpacity={0.6}
                  >
                    <LinearGradient
                      colors={["#EF4444", "#B91C1C"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className={`py-3 rounded-lg items-center px-12 ${
                        isLeaving ? "opacity-70" : ""
                      }`}
                    >
                      <View className="flex-row items-center justify-center">
                        {isLeaving ? (
                          <>
                            <MaterialCommunityIcons
                              name="loading"
                              size={20}
                              color="white"
                              style={{ marginRight: 8 }}
                            />
                            <Text className="text-lg font-bold text-white">
                              {i18n.t("common.loading")}
                            </Text>
                          </>
                        ) : (
                          <Text className="text-lg font-bold text-white">
                            {i18n.t("common.queue.leave")}
                          </Text>
                        )}
                      </View>
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
