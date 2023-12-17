import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Logo from '@/assets/images/splash.json';

export default function SplashScreen() {
  return (
    <View className='items-center justify-center h-screen bg-ocean-blue' style={styles.container}>
      <StatusBar
        translucent
        backgroundColor='rgba(000, 000, 000, 0.5)'  
        barStyle='light-content'  
      />
      <LottieView
        style={{ width: '50%' }}
        source={Logo}
        autoPlay
        loop
      />
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
});