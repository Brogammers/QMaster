import React from "react";
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import i18n from "@/i18n";
import { AntDesign } from "@expo/vector-icons";
import Logo from "@/shared/icons/logo";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  const handleGoogleSignIn = () => {
    // Google sign-in logic
    console.log("Google sign-in");
  };

  const handleEmailSignIn = () => {
    router.push("/Login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={[
          "rgba(29, 205, 254, 0.15)",
          "rgba(29, 205, 254, 0.05)",
          "rgba(255, 255, 255, 0)",
        ]}
        locations={[0, 0.5, 1]}
        className="absolute top-0 w-full h-full"
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 100,
          duration: 500,
        }}
        className="flex-1 justify-center items-center px-8"
      >
        <View className="items-center mb-10">
          <View className="w-60 h-60 items-center justify-center">
            <Logo />
          </View>
          <Text className="text-3xl font-bold text-ocean-blue mt-4">
            {i18n.t("onboardingPage.greeting")}
          </Text>
          <Text className="text-lg text-slate-grey text-center mt-2 max-w-xs">
            {i18n.t("onboardingPage.subtitle")}
          </Text>
        </View>

        <View className="w-full space-y-4 mt-10">
          <TouchableOpacity
            onPress={handleGoogleSignIn}
            className="flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-4 px-6 shadow-sm"
          >
            <AntDesign
              name="google"
              size={22}
              color="#DB4437"
              className="mr-2"
            />
            <Text className="text-coal-black font-medium ml-2">
              {i18n.t("onboardingPage.continueWithGoogle")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleEmailSignIn}
            className="flex-row items-center justify-center bg-baby-blue rounded-xl py-4 px-6 shadow-sm"
          >
            <AntDesign name="mail" size={22} color="white" className="mr-2" />
            <Text className="text-white font-medium ml-2">
              {i18n.t("onboardingPage.continueWithEmail")}
            </Text>
          </TouchableOpacity>
        </View>
      </MotiView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
