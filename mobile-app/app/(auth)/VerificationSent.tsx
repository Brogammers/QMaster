import React from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import background from "@/assets/images/background.png";
import QLogo from "@/assets/images/logoImage.svg";
import { Link } from "expo-router";
import Return from "@/shared/components/Return";
import LottieView from "lottie-react-native";
import MailBoxAnimation from "@/assets/images/mailbox_animation.json";
import i18n from "@/i18n";

export default function VerificationSent() {
  return (
    <ImageBackground
      source={background}
      className="justify-center flex-1 w-screen"
    >
      <Link href="/Onboarding" style={styles.returnButton}>
        <Return size={36} color="white" />
      </Link>
      <StatusBar
        translucent
        backgroundColor="rgba(000, 000, 000, 0.5)"
        barStyle="light-content"
      />
      <View className="flex items-center h-3/5">
        <QLogo />
        <LottieView
          style={styles.animatedLogo}
          source={MailBoxAnimation}
          speed={0.5}
          autoPlay
          loop
        />
        <View>
          <Text className="text-2xl font-medium text-white mb-3.5 text-center">
            i18n.t("VerificationSentPage.verificationSent")
          </Text>
          <Text className="text-center text-white mb-24 px-14">
            i18n.t("VerificationSentPage.verificationSentComment")
          </Text>
        </View>
        {/* <Text className=" text-blue-300">
          Need help? Visit our <Text className="underline">help center.</Text>
        </Text> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  returnButton: {
    position: "absolute",
    top: 60,
    left: 18,
  },
  animatedLogo: {
    marginVertical: 40,
    width: "50%",
    height: "50%",
  },
});
