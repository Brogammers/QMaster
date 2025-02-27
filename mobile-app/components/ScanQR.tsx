import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  I18nManager,
  Modal,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import Logo from "@/assets/images/Logo.svg";
import QRCode from "@/assets/images/QrCode.svg";
import ElipseBackground from "@/assets/images/ElipseBackground.svg";
import { useLinkTo } from "@react-navigation/native";
import i18n from "@/i18n";

const { width, height } = Dimensions.get("window");
const twoFifth = (height * 38) / 100;

interface ScanQRProps {
  isDarkMode?: boolean;
}

export default function ScanQR({ isDarkMode }: ScanQRProps) {
  const linkTo = useLinkTo();
  const [permission, requestPermission] = useCameraPermissions();
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  const handleNotificationsPress = () => {
    linkTo("/Notifications");
  };

  const handleScanPress = async () => {
    if (!permission?.granted) {
      const permissionResult = await requestPermission();
      if (!permissionResult.granted) {
        return;
      }
    }
    setIsScannerVisible(true);
  };

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setIsScannerVisible(false);
    // Handle the scanned QR code data here
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    // You can navigate to a different screen or handle the data as needed
  };

  return (
    <>
      <View
        className="items-center justify-around pb-9"
        style={{ height: twoFifth }}
      >
        <View style={styles.imageContainer}>
          <ElipseBackground width={width} />
        </View>
        <View
          className={`${
            I18nManager.isRTL ? "flex-row-reverse" : "flex-row"
          } items-center justify-between w-full px-5 h-max`}
        >
          <View
            className={`${I18nManager.isRTL ? "flex-row-reverse" : "flex-row"}`}
          >
            <Logo />
            <Text
              className="ml-1 text-xl text-white"
              style={{ fontFamily: "JostBold" }}
            >
              QMaster
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleNotificationsPress}
            className={`w-10 h-10 rounded-xl items-center justify-center ${
              isDarkMode ? "bg-slate-500/40" : "bg-white/20"
            }`}
          >
            <Ionicons
              name="notifications"
              size={22}
              color={isDarkMode ? "#1DCDFE" : "white"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleScanPress}>
          <QRCode />
          <Text className="text-3xl text-white mt-2.5 font-semibold">
            {i18n.t("scan")}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isScannerVisible}
        animationType="slide"
        onRequestClose={() => setIsScannerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsScannerVisible(false)}
            >
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.overlay}>
              <View style={styles.scanArea} />
            </View>
          </CameraView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
  },
});
