import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView, Platform, Text, TextInput, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Image from 'react-native-remote-svg';
import ElipseBackground from '../../assets/images/ElipseBackground.svg';
import QrCode from '../../assets/images/QrCode.svg';
import { FontAwesome } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window')
const twoFifth = height * 2 / 5

export default function TabOneScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor='#17222D'
        barStyle='light-content'
      />
      <TouchableOpacity className='items-center justify-center' style={styles.qrcode}>
        <View style={styles.imageContainer}>
          <Image source={ElipseBackground} style={styles.image} />
        </View>
        <View>
          <Image source={QrCode} />
          <Text className='text-3xl text-white mt-2.5 font-semibold'>Scan QR</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.searchBar} className='flex-row items-center self-center mt-6'>
        <FontAwesome name="search" size={24} color="black" />
        <TextInput
          placeholder="Search for the name of queue"
          className='pl-2.5 w-full'
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight - 1 : 0 : 0,
  },
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
  searchBar: {
    width: '85%',
    height: 44,
    borderWidth: 2,
    borderColor: '#969696',
    borderRadius: 20,
    paddingLeft: 10,
  },
  qrcode: {
    height: twoFifth,
  }
});
