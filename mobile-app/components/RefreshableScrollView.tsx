import React, { useCallback, useEffect } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  ScrollViewProps,
} from "react-native";
import { useRefresh } from "@/ctx/RefreshContext";

interface RefreshableScrollViewProps extends ScrollViewProps {
  onRefresh?: () => Promise<void>;
  refreshId?: string;
  autoRefreshInterval?: number | null; // Optional auto-refresh interval in milliseconds
}

const RefreshableScrollView: React.FC<RefreshableScrollViewProps> = ({
  children,
  onRefresh,
  refreshId,
  autoRefreshInterval = null,
  ...props
}) => {
  const {
    isRefreshing,
    startRefresh,
    registerRefreshHandler,
    unregisterRefreshHandler,
    setAutoRefreshInterval,
  } = useRefresh();

  // Register this component's refresh handler if provided
  useEffect(() => {
    if (onRefresh && refreshId) {
      registerRefreshHandler(refreshId, onRefresh);

      return () => {
        unregisterRefreshHandler(refreshId);
      };
    }
  }, [onRefresh, refreshId, registerRefreshHandler, unregisterRefreshHandler]);

  // Configure auto-refresh interval when component mounts or interval changes
  useEffect(() => {
    if (autoRefreshInterval !== null) {
      setAutoRefreshInterval(autoRefreshInterval);
    }

    return () => {
      // When component unmounts, clear auto-refresh if this component set it
      if (autoRefreshInterval !== null) {
        setAutoRefreshInterval(null);
      }
    };
  }, [autoRefreshInterval, setAutoRefreshInterval]);

  // Handle refresh action
  const handleRefresh = useCallback(async () => {
    await startRefresh();
  }, [startRefresh]);

  return (
    <ScrollView
      {...props}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          colors={["#1DCDFE"]} // Android
          tintColor={"#1DCDFE"} // iOS
        />
      }
    >
      {children}
    </ScrollView>
  );
};

export default RefreshableScrollView;
