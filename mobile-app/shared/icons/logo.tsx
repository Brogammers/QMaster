import React from "react";
import { Image } from "react-native";
import { View } from "../../components/Themed";
import logoImage from '../../assets/images/logoImage.svg';


const logo = () => {
    return (
        <View>
        <Image
        source={logoImage}
      />
      </View>
    )
}

export default logo;