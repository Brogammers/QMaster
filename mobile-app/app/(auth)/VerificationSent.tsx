import React from "react";
import { ImageBackground, Text, View } from "react-native";
import background from '@/assets/images/background.png';
import QLogo from '@/assets/images/logoImage.svg';


export default function VerificationSent() {
  return (
    <ImageBackground source={background} className="justify-center flex-1 w-screen">
      <View className="flex items-center h-[450]">
        <QLogo />
        <View>
          <Text className="text-2xl font-medium text-white mb-3.5 mt-20">Verification Email Sent</Text>
          <Text className="text-white">Check your email for a link to verify your email address</Text>
        </View>
        <Text className="absolute bottom-0 text-blue-300">Need help? Visit our <Text className="underline">help center.</Text></Text>
      </View>
    </ImageBackground>

  )
}