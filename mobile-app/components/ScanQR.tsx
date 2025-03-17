import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import i18n from "@/i18n";

type ScanQrProps = {
  isDarkMode?: boolean;
  asFloatingButton?: boolean;
};

export default function ScanQr({
  isDarkMode = false,
  asFloatingButton = true,
}: ScanQrProps) {
  const router = useRouter();

  const handleScanQrPress = () => {
    router.push("/Scanner");
  };

  if (asFloatingButton) {
    return (
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleScanQrPress}
        activeOpacity={0.8}
      >
        <FontAwesome5 name="qrcode" size={24} color="#fff" />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{i18n.t("scanQR")}</Text>
        <Text style={styles.subtitle}>{i18n.t("scanQRDescription")}</Text>
        <TouchableOpacity style={styles.scanButton} onPress={handleScanQrPress}>
          <FontAwesome5
            name="qrcode"
            size={20}
            color="#fff"
            style={styles.scanIcon}
          />
          <Text style={styles.scanButtonText}>{i18n.t("scan")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF5722",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 999,
  },
  container: {
    width: "100%",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 20,
    textAlign: "center",
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  scanIcon: {
    marginRight: 8,
  },
  scanButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
