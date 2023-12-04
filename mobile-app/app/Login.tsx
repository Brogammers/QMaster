import React from 'react';
import { 
  StyleSheet, 
  ImageBackground, 
  Image,
  View,
  Text,
  TextInput,
} from 'react-native';
import { Formik } from 'formik';
import TextButton from '../components/TextButton';
import background from '../assets/images/background.png';
import LoginImg from '../assets/images/login.png';

export default function Login() {

  const handleSignUp = (values: any) => {
    console.log("Signing up...", values);
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.row}>
        <Text
          style={styles.title}
          className='mb-10 text-2xl text-white'
        >
          Welcome Back!
        </Text>
        <Image source={LoginImg} className='w-full my-10' />

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleSignUp}
        >
          {({ handleChange, handleBlur, values }) => (
            <View className='flex items-center justify-center w-full gap-4'>
              <TextInput
                style={styles.input}
                placeholder='Enter your email'
                placeholderTextColor={'#515151'}
                onChangeText={handleChange('email')}
                keyboardType='email-address'
                value={values.email}
              />
              <TextInput
                style={styles.input}
                placeholder='Enter your password'
                placeholderTextColor={'#515151'}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                value={values.password}
              />
            </View>
          )}
        </Formik>
        <View className='mt-14'>
          <TextButton text={'Log In'} buttonColour={'#1DCDFE'} textColor={'white'} />
          <TextButton text={'Continue with Google'} text2={'google'} buttonColour={'white'} textColor={'#17222D'} />
        </View>
      </View>
    </ImageBackground>
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
    width: '80%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'InterBold',
    fontSize: 28, // Corresponds to text-2xl in Tailwind
    color: '#FFF', // Text color
    marginBottom: 16, // Corresponds to mb-4 in Tailwind
  },
  baseText: {
    fontSize: 16, // Corresponds to text-base in Tailwind
    color: '#FFF', // Text color
    marginBottom: 40, // Corresponds to mb-10 in Tailwind
  },
  input: {
    backgroundColor: '#DFDFDF',
    color: '#515151',
    fontSize: 16, // Corresponds to text-base in Tailwind
    borderRadius: 42,
    height: 56,
    marginBottom: 5,
    paddingVertical: 4,
    paddingHorizontal: 24,
    width: '100%'
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  signUpButton: {
    backgroundColor: '#1DCDFE',
    marginTop: 10, // Corresponds to mt-2.5 in Tailwind
    paddingVertical: 16, // Corresponds to py-4 in Tailwind
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#FFF',
    color: '#17222D',
    marginTop: 10, // Corresponds to mt-2.5 in Tailwind
    paddingVertical: 16, // Corresponds to py-4 in Tailwind
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    fontSize: 16,
    color: '#17222D',
    textAlign: 'center',
  },
});

