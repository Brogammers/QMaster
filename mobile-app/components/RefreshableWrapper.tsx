import React, { useCallback, useEffect, useState } from "react";
import { View, ViewProps, RefreshControl, StyleSheet } from "react-native";
import { useRefresh } from "@/ctx/RefreshContext";
import { ScrollView } from "react-native-gesture-handler";

interface RefreshableWrapperProps extends ViewProps {
  onRefresh?: () => Promise<void>;
  refreshId?: string;
  children: React.ReactNode;
  scrollViewProps?: any; // Additional props for ScrollView
  contentContainerStyle?: any; // Style for the content container
  autoRefreshInterval?: number | null; // Optional auto-refresh interval in milliseconds
}

const RefreshableWrapper: React.FC<RefreshableWrapperProps> = ({
  children,
  onRefresh,
  refreshId,
  style,
  scrollViewProps = {},
  contentContainerStyle,
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
  const [contentHeight, setContentHeight] = useState(0);

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

  // Handle content layout to get its height
  const handleContentLayout = (event: any) => {
    setContentHeight(event.nativeEvent.layout.height);
  };

  // Merge contentContainerStyle from props with default style
  const mergedContentContainerStyle = {
    minHeight: "100%",
    ...(contentContainerStyle || {}),
  };

  return (
    <View style={[styles.container, style]} {...props}>
      <ScrollView
        {...scrollViewProps}
        contentContainerStyle={mergedContentContainerStyle}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["#1DCDFE"]} // Android
            tintColor={"#1DCDFE"} // iOS
          />
        }
      >
        <View onLayout={handleContentLayout} style={styles.contentContainer}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default RefreshableWrapper;
