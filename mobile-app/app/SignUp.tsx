import { StyleSheet, useColorScheme } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { FormEvent, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z]+$/, 'Full name must contain only letters')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one numeric digit'
    )
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export default function TabTwoScreen() {

  const handleSignUp = (values: any) => {
    console.log("Signing up...", values);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text
          style={styles.title}
          className='mb-4 text-2xl text-white'
        >
          Welcome!
        </Text>
        <Text className='text-base text-white mb-14'>
          Let's help you save more time.
        </Text>

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignUp}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View className='w-full gap-4'>
              <TextInput
                style={styles.input}
                placeholder='Enter your full name'
                placeholderTextColor={'#515151'}
                onChangeText={handleChange('fullName')}
                value={values.fullName}
                autoFocus={true}
                autoCapitalize='words'
              />
              <TextInput
                style={styles.input} 
                placeholder='Enter your email'
                onChangeText={handleChange('email')}
                keyboardType='email-address'
                value={values.email}
              />
              <TextInput
                style={styles.input} 
                placeholder='Enter new password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                value={values.password}
              />
              <TextInput
                style={styles.input} 
                placeholder='Confirm new password'
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry
                value={values.confirmPassword}
              />
              <View className='flex flex-col items-center justify-center w-full gap-8 mt-8'>
                <TouchableOpacity
                  className='rounded-xl w-full bg-[#1DCDFE] mt-2.5 py-4 flex gap-4 flex-row justify-center items-center'
                  onPress={(e: GestureResponderEvent) => handleSubmit(e as unknown as FormEvent<HTMLFormElement>)}
                >
                  <Text className='text-base text-center text-white'>
                    Sign Up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className='rounded-xl w-full bg-white text-[#17222D] mt-2.5 py-4 flex gap-4 flex-row justify-center items-center'>
                  <FontAwesome name="google" size={24} color="#17222D" />
                  <Text className='text-base text-[#17222D] text-center'>
                    Continue with Google
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
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

