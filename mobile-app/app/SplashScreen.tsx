import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Logo from '@/assets/images/splash.json';
import { SplashScreenProps } from '@/types';
import Animated from 'react-native-reanimated';


export default function SplashScreen({ additionalText, backgroundColor = '#17222D' }: SplashScreenProps) {
  return (
    <View className='items-center justify-center h-screen bg-ocean-blue' style={[styles.container, { backgroundColor }]}>

      <LottieView
        style={styles.animatedLogo}
        source={Logo}
        autoPlay
        loop
      />
      {additionalText && (
        <Text style={styles.additionalText}>
          {additionalText}
        </Text>
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#17222D',
    color: '#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedLogo: {
    width: '50%',
    height: '50%',   
  },
  additionalText: {
    paddingHorizontal: 35,
    color: '#FFF',
    fontSize: 16,
    marginTop: 50,
    textAlign: 'center',
  },
});