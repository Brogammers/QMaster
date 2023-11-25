import React from "react";
import { Text, View, useWindowDimensions} from "react-native";
import Image from 'react-native-remote-svg'
import { OnboardingData } from "../data";

const OnboardingItems = ( { item } ) => {
  const {width} = useWindowDimensions()
    return (
        <View className="flex items-center justify-center w-screen mt-7">
          <Image source={item.image} />
          <Text className="w-4/5 mt-5 text-center text-white" >{item.text}</Text>
        </View>
    )
}


export default OnboardingItems;