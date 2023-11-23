import React from "react"
import { View, Text } from "../components/Themed"
import { Image, StyleSheet } from "react-native"
import Logo from '../shared/icons/logo'

const Onboarding = () => {
    return (
        <View style = {styles.container}>
            <Image source={require('../assets/images/onboarding1.svg')} style={styles.image}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 100,
        height: 15,
        flex: 1,
    }
})
export default Onboarding;