import React from "react";
import Image  from "react-native-remote-svg";
import logoImage from '@assets/images/logoImage.svg';


const logo = () => {
  return (
    <Image source={logoImage} />
  )
}

export default logo;