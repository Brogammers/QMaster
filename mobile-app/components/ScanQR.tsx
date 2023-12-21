import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-remote-svg';
import ElipseBackground from '../assets/images/ElipseBackground.svg';
import QrCode from '../assets/images/QrCode.svg';
import { Dimensions } from 'react-native';
import Logo from "../assets/images/Logo.svg";
import logoImage from '@/assets/images/logoImage.svg';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window')
const twoFifth = height * 38 / 100

export default function ScanQr() {
  return (
    <View className='items-center justify-around pb-9' style={{ height: twoFifth }}>
      <View style={styles.imageContainer}>
        <Image source={ElipseBackground} style={styles.image} />
      </View>
      <View className='flex-row items-center justify-between w-full px-5 h-max'>
        <View className='flex-row'>
          <Image source={Logo} />
          <Text className='text-2xl font-medium text-white f'>QMaster</Text>
        </View>
        <TouchableOpacity >
          <Ionicons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Image source={QrCode} />
        <Text className='text-3xl text-white mt-2.5 font-semibold'>Scan QR</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});