import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  I18nManager,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Logo from "@/assets/images/Logo.svg";
import QRCode from "@/assets/images/QrCode.svg";
import ElipseBackground from "@/assets/images/ElipseBackground.svg";
import { useLinkTo } from "@react-navigation/native";
import i18n from "@/i18n";
import { useCameraPermissions } from "expo-image-picker";

const { width, height } = Dimensions.get("window");
const twoFifth = (height * 38) / 100;

interface ScanQRProps {
  isDarkMode?: boolean;
}

export default function ScanQR({ isDarkMode }: ScanQRProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const linkTo = useLinkTo();

  const isPermissionGranted = Boolean(permission?.granted);

  const handleNotificationsPress = () => {
    linkTo("/Notifications");
  };

  const handleScanPress = async () => {
    if (!isPermissionGranted) {
      await requestPermission();
    }
    if (isPermissionGranted) {
      linkTo("/Scanner");
    }
  };

  return (
    <View
      className="items-center justify-around pb-9"
      style={{ height: twoFifth }}
    >
      <View style={styles.imageContainer}>
        <ElipseBackground width={width} />
      </View>
      <View
        className={`${
          I18nManager.isRTL ? `flex-row-reverse` : `flex-row`
        } items-center justify-between w-full px-5 h-max`}
      >
        <View
          className={`${I18nManager.isRTL ? `flex-row-reverse` : `flex-row`}`}
        >
          <Logo />
          <Text
            className="ml-1 text-xl text-white"
            style={{ fontFamily: "JostBold" }}
          >
            tawabiry
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
});
