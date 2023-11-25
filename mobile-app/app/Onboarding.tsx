import React from "react"
import { View, Text } from "../components/Themed"
import { StyleSheet, Pressable } from "react-native"
import Image from 'react-native-remote-svg'
import onboarding1 from '../assets/images/onboarding1.svg';
import onboarding2 from '../assets/images/onboarding2.svg';
import onboarding3 from '../assets/images/onboarding3.svg';
import onboarding4 from '../assets/images/onboarding4.svg';
import logoImage from '../assets/images/logoImage.svg';
import { TouchableOpacity } from "react-native-gesture-handler";
import OnboardingItems from "../components/OnboardingItems";

import { Dimensions } from 'react-native';

const window = Dimensions.get('window');

const Onboarding = () => {
  return (
    <View className="bg-[#2F2E41] h-screen justify-center items-center" style={styles.container}>
      <View style={styles.row} className="bg-transparent">
        <View className="bg-transparent">
          <Image source={logoImage} />
        </View>
        <View className="mt-5 bg-transparent">
          <OnboardingItems />
        </View>
        <TouchableOpacity className="bg-[#1DCDFE] mt-8 flex justify-center items-center rounded-lg h-11" style={styles.buttonWidth}>
          <Text className="text-xl font-bold"> Log In </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#C5C5C5] mt-3.5 flex justify-center items-center rounded-lg h-11" style={styles.buttonWidth}>
          <Text className="text-xl font-bold text-black"> Sign Up </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#17222D',
    color: '#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWidth: {
    width: (window.width) * 0.8,
  }
})
export default Onboarding;