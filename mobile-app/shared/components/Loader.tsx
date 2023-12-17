import { View } from '@/components/Themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';

export default function Loader() {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#34F5C5" />
    </View>
  );
}


const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});