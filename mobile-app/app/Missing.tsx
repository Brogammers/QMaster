import React from "react";
import {
  ImageBackground,
  StatusBar,
  Text,
  View,
} from "react-native";
import background from "@/assets/images/background.png";
import QLogo from "@/assets/images/logoImage.svg";
import NotFound from "@/assets/images/undraw_page_not_found_re_e9o6(2).svg";

export default function VerificationSent() {
  return (
    <ImageBackground
      source={background}
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
      <View className="flex items-center h-2/5">
        <QLogo />
        <NotFound
          width={300}
        />
        <View>
          <Text className="text-2xl font-medium text-white mb-3.5 text-center">
            An error has occurred
          </Text>
          <Text className="text-center text-white mb-24 px-14">
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

// const styles = StyleSheet.create({
//   returnButton: {
//     position: "absolute",
//     top: 60, 
//     left: 18, 
//   },
//   animatedLogo: {
//     marginVertical: 40,
//     width: "50%",
//     height: "50%",
//   },
// });
