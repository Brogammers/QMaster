import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SearchBar() {
  return (
    <View style={styles.searchBar} className='flex-row items-center self-center w-full mt-6 mb-4'>
      <FontAwesome name="search" size={24} color="black" />
      <TextInput
        placeholder="Search for the name of queue"
        className='pl-2.5 w-full'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    height: 44,
    borderWidth: 2,
    borderColor: '#969696',
    borderRadius: 20,
    paddingLeft: 15,
  },
});