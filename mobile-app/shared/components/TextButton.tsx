import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { TextButtonProps } from '@/types';

const window = Dimensions.get('window');

export default function TextButton(props: TextButtonProps) {
  const { text, buttonColor } = props;

  if (props.icon == null) {
    return (
      <TouchableOpacity
        disabled={props.disabled}
        onPress={(props.onPress)}
        className='flex items-center justify-center mt-5 rounded-lg'
        style={[styles.buttonWidth, { backgroundColor: props.buttonColor }]}
      >
        <Text className='text-xl' font-bold style={[{ color: props.textColor }, styles.font]}>
          {props.text}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        disabled={props.disabled}
        onPress={(props.onPress)}
        className='flex flex-row items-center justify-center mt-5 rounded-lg'
        style={[styles.buttonWidth, { backgroundColor: props.buttonColor }]}
      >
        <FontAwesome name={props.icon} size={24} color="#17222D" />
        <Text className='text-xl font-bold pl-3.5' style={[{ color: props.textColor }, styles.font]}>
          {props.text}
        </Text>
      </TouchableOpacity>
    );
  }
};


const styles = StyleSheet.create({
  buttonWidth: {
    width: window.width * 0.8,
    padding: 14,
  },
  font: {
    fontFamily: 'IstokBold',
  }
});
