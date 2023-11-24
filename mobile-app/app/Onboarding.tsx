import React from "react"
import { View, Text } from "../components/Themed"
import { StyleSheet } from "react-native"
import Image from 'react-native-remote-svg'
import Logo from '../shared/icons/logo'
import Onboarding1 from "../shared/images/onboarding1"
import Onboarding2 from "../shared/images/onboarding2"
import Onboarding3 from "../shared/images/onboarding3"
import Onboarding4 from "../shared/images/onboarding4"


const Onboarding = () => {
    return (
        <View className="bg-[#2F2E41] h-screen justify-center items-center">
            <Logo className="py-[60px]"/>
            <Onboarding1 />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F2E41'
    },
    image: {
        width: 15,
        height: 15,
        flex: 1,
    }
})
export default Onboarding;