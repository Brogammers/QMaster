import React from 'react';
import { I18nManager, StatusBar, StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';
import Carousel from '@/shared/components/Carousel';
import TextButton from '@/shared/components/TextButton';
import Logo from "@/assets/images/Logo.svg";
import Return from '@/shared/components/Return';
import i18n from '@/i18n';

export default function Onboarding() {
  return (
    <View className='items-center justify-center h-screen bg-ocean-blue' style={styles.container}>
      {/* <Return size={36} color='white' href='/EmailVerification' /> */}
      <StatusBar
        translucent
        backgroundColor='rgba(000, 000, 000, 0.5)'
        barStyle='light-content'
      />
      <View style={styles.row} className='bg-transparent'>
        <View className='my-4' />
        <View className="flex flex-row justify-center items-center">
          <Logo width={60} height={60} />
          <Text
            className="ml-1 text-3xl text-white"
            style={{ fontFamily: "JostBold" }}
          >
            tawabiry
          </Text>
        </View>
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
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
});