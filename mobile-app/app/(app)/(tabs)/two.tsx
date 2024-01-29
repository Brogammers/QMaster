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
        <Text className='mb-10 text-base text-white'>
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
            <View className='w-full'>
              <TextInput
                className='rounded-full bg-[#DFDFDF] text-[#515151] text-base w-full h-12 mb-5 p-6 placeholder:text-[#515151] focus:text-black'
                placeholder='Enter your full name'
                placeholderTextColor={'#515151'}
                onChangeText={handleChange('fullName')}
                value={values.fullName}
                autoFocus={true}
                autoCapitalize='words'
              />
              <TextInput
                className='rounded-full bg-[#DFDFDF] text-[#515151] text-base w-full h12 mb-5 p-6 placeholder:text-[#515151]'
                placeholder='Enter your email'
                onChangeText={handleChange('email')}
                keyboardType='email-address'
                value={values.email}
              />
              <TextInput
                className='rounded-full bg-[#DFDFDF] text-[#515151] text-base w-full h12 mb-5 p-6 placeholder:text-[#515151]'
                placeholder='Enter password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                value={values.password}
              />
              <TextInput
                className='rounded-full bg-[#DFDFDF] text-[#515151] text-base w-full h12 mb-5 p-6 placeholder:text-[#515151]'
                placeholder='Confirm password'
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
  },
});
