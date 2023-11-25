import React from "react";
import { Text, View } from "react-native";
import Image from 'react-native-remote-svg'
import onboarding1 from "../assets/images/onboarding1.svg";

const OnboardingItems = () => {
    return (
        <>
          <Image source={onboarding1} />
          <Text className="mt-5 text-center text-white">Say goodbye to waiting in queues to finish a single errand.</Text>
        </>
    )
}

export default OnboardingItems;