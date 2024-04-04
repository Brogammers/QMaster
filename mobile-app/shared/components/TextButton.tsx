import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { TextButtonProps } from '@/types';

const window = Dimensions.get('window');

export default function TextButton(props: TextButtonProps) {
  const buttonWidth = props.width ? props.width : window.width * 0.8;
  const buttonPadding = props.padding ? props.padding : 14;

  if (props.icon == null) {
    return (
      <TouchableOpacity
        disabled={props.disabled}
        onPress={(props.onPress)}
        className='flex items-center justify-center mt-5 rounded-lg'
        style={[{ padding: buttonPadding , backgroundColor: props.buttonColor, width: buttonWidth }]}
      >
        <Text 
          className={props.textSize ? props.textSize : "text-xl"}
          font-bold
          style={[{ color: props.textColor }, styles.font]}
        >
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
        style={[{ padding: buttonPadding , backgroundColor: props.buttonColor, width: buttonWidth }]}
      >
        <FontAwesome 
          name={props.icon}
          size={24} 
          color="#17222D"
        />
        <Text 
          className={`${props.textSize ? props.textSize : "text-xl"} font-bold pl-3.5`}
          style={[{ color: props.textColor }, styles.font]}
        >
          {props.text}
        </Text>
      </TouchableOpacity>
    );
  }
};


const styles = StyleSheet.create({
  font: {
    fontFamily: 'IstokBold',
  }
});
