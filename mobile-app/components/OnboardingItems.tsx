import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Image
} from "react-native";


export default function OnboardingItem({ item }: any) {
  return (
    <View className="flex items-center justify-center w-screen mt-7">
      <Image source={item.image} />
      <Text style={styles.text} className="w-4/5 mt-5 text-base text-center text-white">
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