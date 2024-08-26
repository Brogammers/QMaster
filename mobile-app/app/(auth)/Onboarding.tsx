import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import Carousel from '@/shared/components/Carousel';
import TextButton from '@/shared/components/TextButton';
import QLogo from '@/assets/images/logoImage.svg';
import Return from '@/shared/components/Return';
import i18n from '@/i18n';

export default function Onboarding() {
  return (
    <View className='items-center justify-center h-screen bg-ocean-blue' style={styles.container}>
      <Link href='/EmailVerification' style={styles.returnButton}>
        <Return size={36} color='white' />
      </Link>
      <StatusBar
        translucent
        backgroundColor='rgba(000, 000, 000, 0.5)'
        barStyle='light-content'
      />
      <View style={styles.row} className='bg-transparent'>
        <View className='my-4' />
        <QLogo />
        <Carousel />
        <View className='mt-10'>
          <Link href='/Login'>
            <TextButton text={i18n.t('login')} buttonColor={'#1DCDFE'} textColor={'white'} />
          </Link>
          <Link href='/SignUp'>
            <TextButton text={i18n.t('signup')} buttonColor={'white'} textColor={'black'} />
          </Link>
        </View>
      </View>
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
  returnButton: {
    position: 'absolute',
    zIndex: 10,
    top: 60,
    left: 18,
  },
});