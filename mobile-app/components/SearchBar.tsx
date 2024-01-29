import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';

export default function SearchBar() {
  const linkTo = useLinkTo();

  const handleSearchPress = () => {
    linkTo('/Search'); // Navigate to the "search" page
  };

  return (
    <TouchableOpacity
      style={styles.searchBar}
      onPress={handleSearchPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name="search" size={24} color="black" />
        <Text style={{ marginLeft: 10 }}>Search for the name of the queue</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 44,
    borderWidth: 2,
    borderColor: '#969696',
    borderRadius: 20,
    paddingLeft: 15,
    justifyContent:'center',
    marginTop: 28,
    marginBottom: 16,
  },
});
