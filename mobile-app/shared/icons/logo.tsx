import React from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import logoImage from '../../assets/images/logoImage.svg';


const logo = () => {
    return (
        <View style = {styles.container}>
        <Image
        source={logoImage}
        style = {styles.image}
      />
      </View>
    )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  },
  container: {
    flex: 1
  }
})

export default logo;