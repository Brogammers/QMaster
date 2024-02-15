import React from "react";
import { ImageBackground, StatusBar, Text, View } from "react-native";
import background from "@/assets/images/background.png";
import QLogo from "@/assets/images/logoImage.svg";
import NotFound from "@/assets/images/undraw_page_not_found_re_e9o6(2).svg";

export default function Missing() {
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      className="justify-center flex-1 w-screen"
    >
      {/* <Link href="/Onboarding" style={styles.returnButton}>
        <Return size={36} color="white" />
      </Link> */}
      <StatusBar
        translucent
        backgroundColor="rgba(000, 000, 000, 0.5)"
        barStyle="light-content"
      />
      <View className="flex items-center py-10">
        <QLogo />
        <NotFound width={300} />
        <View className="mb-8">
          <Text className="text-xl font-medium text-white text-center">
            An error has occurred
          </Text>
          <Text className="text-center text-white px-14">
            Please try refreshing the application.
          </Text>
        </View>
        <Text className=" text-blue-300">
          Need help? Visit our <Text className="underline">help center.</Text>
        </Text>
      </View>
    </ImageBackground>
  );
}
