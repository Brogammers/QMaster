import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  useWindowDimensions
} from "react-native";
import Image from 'react-native-remote-svg';



export default function OnboardingItem({ item }: any) {
  const { width } = useWindowDimensions();

  return (
    <View className="flex items-center justify-center w-screen mt-7">
      <Image source={item.image} />
      <Text style={styles.text} className="w-4/5 mt-5 text-center text-white text-base" >
        {item.text}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  text: {
    fontFamily: 'JostReg',
  }
});