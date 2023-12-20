import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Image from 'react-native-remote-svg';
import ElipseBackground from '../assets/images/ElipseBackground.svg';
import QrCode from '../assets/images/QrCode.svg';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window')
const twoFifth = height * 2 / 5

export default function ScanQr() {
  return (
    <TouchableOpacity className='items-center justify-center' style={{ height: twoFifth }}>
      <View style={styles.imageContainer}>
        <Image source={ElipseBackground} style={styles.image} />
      </View>
      <View>
        <Image source={QrCode} />
        <Text className='text-3xl text-white mt-2.5 font-semibold'>Scan QR</Text>
      </View>
    </TouchableOpacity>
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