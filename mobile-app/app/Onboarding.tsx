import React from "react"
import { View, Text } from "../components/Themed"
import { StyleSheet } from "react-native"
import Image from 'react-native-remote-svg'
import Logo from '../shared/icons/logo'

const Onboarding = () => {
    return (
        <View style = {styles.container}>
            <Image source={require('../assets/images/onboarding1.svg')}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 15,
        height: 15,
        flex: 1,
    }
})
export default Onboarding;