import React from 'react';
import { 
  View,
  Text, 
  StatusBar, 
  StyleSheet, 
} from 'react-native';
import { SplashScreenProps } from '@/types';
import LottieView from 'lottie-react-native';
import Logo from '@/assets/images/splash.json';

export default function SplashScreen({ additionalText, backgroundColor = '#17222D' }: SplashScreenProps) {
  return (
    <View className='items-center justify-center h-screen bg-ocean-blue' style={[styles.container, { backgroundColor }]}>
      <StatusBar
        translucent
        backgroundColor='rgba(000, 000, 000, 0.5)'
        barStyle='light-content'
      />
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