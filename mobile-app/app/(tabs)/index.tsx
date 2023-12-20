import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView, Platform, Text, TextInput, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import Category from '@/components/Category';
import { AntDesign } from '@expo/vector-icons';
import ScanQr from '@/components/ScanQR';
import SearchBar from '@/components/SearchBar';
import { Categories } from '@/data';

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
      <ScanQr />
      <View className='self-center w-[85%]'>
        <SearchBar />
        <View className='flex flex-row flex-wrap self-center justify-between'>
          {Categories.map((category) => (
            <Category Img={category.Image} Title={category.Text} />
          ))}
        </View>
        <TouchableOpacity className='flex flex-row items-center self-center justify-between w-full px-5 mt-6 bg-white rounded-lg h-9'>
          <Text className='font-semibold '>Frequently Asked Questions</Text>
          <AntDesign name="caretright" size={15} color="#444" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
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
    paddingLeft: 11,
  },
  qrcode: {
    height: twoFifth,
  }
});
