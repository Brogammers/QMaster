import React from 'react';
import { StyleSheet, View } from 'react-native';
import Image from 'react-native-remote-svg';
import logoImage from '../assets/images/logoImage.svg';
import TextButton from '../components/TextButton';
import Carousel from '../components/carousel';

const Onboarding = () => {


  return (
    <View className='bg-[#2F2E41] h-screen justify-center items-center' style={styles.container}>
      <View style={styles.row} className='bg-transparent'>
        <Image source={logoImage} />

        <Carousel />

        <View className='mt-12'>
          <TextButton text={'Log In'} buttonColour={'#1DCDFE'} textColor={'white'} />
          <TextButton text={'Sign Up'} buttonColour={'#C5C5C5'} textColor={'black'} />
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
})
export default Onboarding;