import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const window = Dimensions.get('window');

const TextButton = (props: { text: string; buttonColour: string, textColor: string; text2?: string }) => {
    const {text, buttonColour} = props;

    if (props.text2 == null){
    return (
        <TouchableOpacity className="flex items-center justify-center mt-3.5 rounded-lg h-11" style={[styles.buttonWidth, {backgroundColor: props.buttonColour}]}>
          <Text className="text-xl font-bold" style = {{color: props.textColor}}> {props.text} </Text>
        </TouchableOpacity>
    )
    }
    else{
        return (
        <TouchableOpacity className="flex items-center justify-center mt-3.5 rounded-lg h-11" style={[styles.buttonWidth, {backgroundColor: props.buttonColour}]}>
            <Text className="text-xl font-bold" style = {{color: props.textColor}}> {props.text} </Text>
            <Text className="text-xl font-bold" style = {{color: props.textColor}}> {props.text2} </Text>
        </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonWidth: {
        width: (window.width) * 0.8,
      }
})
export default TextButton;