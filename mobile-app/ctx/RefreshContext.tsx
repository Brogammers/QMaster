import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import configConverter from "@/api/configConverter";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentQueues, updateQueuePosition } from "@/app/redux/queueSlice";

interface RefreshHandler {
  refreshId: string;
  handler: () => Promise<void>;
}

interface RefreshContextType {
  isRefreshing: boolean;
  startRefresh: () => Promise<void>;
  registerRefreshHandler: (
    refreshId: string,
    handler: () => Promise<void>
  ) => void;
  unregisterRefreshHandler: (refreshId: string) => void;
  setAutoRefreshInterval: (milliseconds: number | null) => void;
  lastRefreshTime: number | null;
}

// Create the context
const RefreshContext = createContext<RefreshContextType>({
  isRefreshing: false,
  startRefresh: async () => {},
  registerRefreshHandler: () => {},
  unregisterRefreshHandler: () => {},
  setAutoRefreshInterval: () => {},
  lastRefreshTime: null,
});

export const useRefresh = () => useContext(RefreshContext);

export const RefreshProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<number | null>(null);
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number | null>(
    null
  );
  const refreshHandlers = useRef<RefreshHandler[]>([]);
  const autoRefreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();

  // Clear any existing timers when interval changes
  useEffect(() => {
    if (autoRefreshTimerRef.current) {
      clearTimeout(autoRefreshTimerRef.current);
      autoRefreshTimerRef.current = null;
    }

    // Set up new timer if interval is provided
    if (autoRefreshInterval !== null && autoRefreshInterval > 0) {
      autoRefreshTimerRef.current = setTimeout(() => {
        startRefresh();
      }, autoRefreshInterval);
    }

    return () => {
      if (autoRefreshTimerRef.current) {
        clearTimeout(autoRefreshTimerRef.current);
      }
    };
  }, [autoRefreshInterval, lastRefreshTime]);

  // Core refresh function that refreshes essential app data
  const refreshCoreData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("TOKEN_KEY");
      if (!token) return;

      // Refresh current queues data
      const currentQueuesData = await AsyncStorage.getItem("currentQueues");
      if (currentQueuesData) {
        const parsedQueues = JSON.parse(currentQueuesData);
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
              const updatedQueue = {
                ...queue,
                position: response.data.position || queue.position,
                estimatedTime:
                  response.data.estimatedTime || queue.estimatedTime,
              };

              verifiedQueues.push(updatedQueue);

              // Cache queue service details in Redux
              try {
                const detailsUrl = configConverter(
                  "EXPO_PUBLIC_API_BASE_URL_GET_QUEUES"
                );
                const detailsResponse = await axios.get(
                  `${detailsUrl}?queueName=${queue.serviceType}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                if (
                  detailsResponse.status === 200 &&
                  detailsResponse.data.queues
                ) {
                  const queueDetails = detailsResponse.data.queues.find(
                    (q: any) => q.name === queue.serviceType
                  );

                  if (queueDetails) {
                    dispatch(
                      updateQueuePosition({
                        id: queue.id,
                        position: response.data.position || queue.position,
                        estimatedTime:
                          response.data.estimatedTime || queue.estimatedTime,
                      })
                    );
                  }
                }
              } catch (error) {
                console.error(
                  `Error refreshing queue details for ${queue.serviceType}:`,
                  error
                );
              }
            }
          } catch (error) {
            console.error(
              `Error refreshing queue ${queue.serviceType}:`,
              error
            );
          }
        }

        // Update both AsyncStorage and Redux
        await AsyncStorage.setItem(
          "currentQueues",
          JSON.stringify(verifiedQueues)
        );
        dispatch(setCurrentQueues(verifiedQueues));
      }
    } catch (error) {
      console.error("Error refreshing core data:", error);
    }
  }, [dispatch]);

  const startRefresh = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    try {
      // First refresh core app data
      await refreshCoreData();

      // Then execute all registered refresh handlers
      const refreshPromises = refreshHandlers.current.map(({ handler }) =>
        handler().catch((error) => {
          console.error("Error in refresh handler:", error);
        })
      );
      await Promise.all(refreshPromises);
    } catch (error) {
      console.error("Error during refresh:", error);
    } finally {
      setIsRefreshing(false);
      setLastRefreshTime(Date.now());

      // Reset auto-refresh timer if one is active
      if (autoRefreshInterval !== null && autoRefreshInterval > 0) {
        if (autoRefreshTimerRef.current) {
          clearTimeout(autoRefreshTimerRef.current);
        }

        autoRefreshTimerRef.current = setTimeout(() => {
          startRefresh();
        }, autoRefreshInterval);
      }
    }
  }, [isRefreshing, autoRefreshInterval, refreshCoreData]);

  const registerRefreshHandler = useCallback(
    (refreshId: string, handler: () => Promise<void>) => {
      // Remove any existing handler with the same ID
      refreshHandlers.current = refreshHandlers.current.filter(
        (item) => item.refreshId !== refreshId
      );

      // Add the new handler
      refreshHandlers.current.push({ refreshId, handler });
    },
    []
  );

  const unregisterRefreshHandler = useCallback((refreshId: string) => {
    refreshHandlers.current = refreshHandlers.current.filter(
      (item) => item.refreshId !== refreshId
    );
  }, []);

  const handleSetAutoRefreshInterval = useCallback(
    (milliseconds: number | null) => {
      setAutoRefreshInterval(milliseconds);
    },
    []
  );

  const value = {
    isRefreshing,
    startRefresh,
    registerRefreshHandler,
    unregisterRefreshHandler,
    setAutoRefreshInterval: handleSetAutoRefreshInterval,
    lastRefreshTime,
  };

  return (
    <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>
  );
};
