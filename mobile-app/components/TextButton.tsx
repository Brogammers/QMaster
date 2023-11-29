import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const window = Dimensions.get('window');

interface TextButtonProps {
  text: string;
  buttonColour: string;
  textColor: string;
  text2?: string;
  isGoogle?: boolean;
}

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  //webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
});

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    alert('Sign In Successfull!!!!')
    console.log(JSON.stringify(userInfo));
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};



const TextButton: React.FC<TextButtonProps> = (props) => {
  const { text, buttonColour } = props;

  if (props.text2 == null) {
    if(props.isGoogle === true){
      return (
        <TouchableOpacity
          className='flex items-center justify-center mt-3.5 rounded-lg'
          style={[styles.buttonWidth, { backgroundColor: props.buttonColour }]}
          onPress={() => signIn()}
        >
          <Text className='text-xl' font-bold style={{ color: props.textColor }}>
            {props.text}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        className='flex items-center justify-center mt-3.5 rounded-lg'
        style={[styles.buttonWidth, { backgroundColor: props.buttonColour }]}
      >
        <Text className='text-xl' font-bold style={{ color: props.textColor }}>
          {props.text}
        </Text>
      </TouchableOpacity>
    );
  } else {
    if(props.isGoogle === true){
      return (
        <TouchableOpacity
          className='flex items-center justify-center mt-3.5 rounded-lg'
          style={[styles.buttonWidth, { backgroundColor: props.buttonColour }]}
          onPress={() => signIn()}
        >
          <Text className='text-xl font-bold' style={{ color: props.textColor }}>
            {props.text}
          </Text>
          <Text className='text-xl font-bold' style={{ color: props.textColor }}>
            {props.text2}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        className='flex items-center justify-center mt-3.5 rounded-lg'
        style={[styles.buttonWidth, { backgroundColor: props.buttonColour }]}
      >
        <Text className='text-xl font-bold' style={{ color: props.textColor }}>
          {props.text}
        </Text>
        <Text className='text-xl font-bold' style={{ color: props.textColor }}>
          {props.text2}
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
});

export default TextButton;
