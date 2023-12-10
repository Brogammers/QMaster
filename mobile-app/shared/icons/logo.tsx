import React from "react";
import Image  from "react-native-remote-svg";
import logoImage from '@assets/images/logoImage.svg';


export default function Logo() {
  return (
    <Image source={logoImage} />
  )
}