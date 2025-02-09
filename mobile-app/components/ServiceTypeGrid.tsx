import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useTheme } from "@/ctx/ThemeContext";
import { MotiView } from "moti";

const services = [
  { id: 1, name: "Cashier", estimatedWaitTime: 15 },
  { id: 2, name: "Returns & Exchange", estimatedWaitTime: 10 },
  { id: 3, name: "Order Pickup", estimatedWaitTime: 5 },
  { id: 4, name: "Customer Support", estimatedWaitTime: 20 },
];

interface ServiceTypeGridProps {
  onSelectService: (service: { id: number; name: string }) => void;
}

export default function ServiceTypeGrid({
  onSelectService,
}: ServiceTypeGridProps) {
  const { isDarkMode } = useTheme();

  const renderItem = ({ item }: { item: { id: number; name: string } }) => (
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
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>
          {item.name}
        </Text>
      </MotiView>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={services}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  serviceItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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
  lightText: {
    color: "#17222D",
  },
  darkText: {
    color: "#1DCDFE",
  },
});
