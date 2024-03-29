import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Logo from '@/assets/images/Logo.svg';
import QRCode from '@/assets/images/QrCode.svg';
import ElipseBackground from '@/assets/images/ElipseBackground.svg';
import { useLinkTo } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')
const twoFifth = height * 38 / 100

export default function ScanQR() {
  const linkTo = useLinkTo();
  
  const handleNotificationsPress = () => {
    linkTo('/Notifications'); // Navigate to the "Notifications" page
  };
  
  return (
    <View
      className='items-center justify-around pb-9'
      style={{ height: twoFifth }}
    >
      <View style={styles.imageContainer}>
        <ElipseBackground
          width={width}
        />
      </View>
      <View className='flex-row items-center justify-between w-full px-5 h-max'>
        <View className='flex-row '>
          <Logo />
          <Text className='ml-1 text-xl font-medium text-white'>QMaster</Text>
        </View>
        <TouchableOpacity onPress={handleNotificationsPress} >
          <Ionicons name="notifications" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <QRCode />
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});