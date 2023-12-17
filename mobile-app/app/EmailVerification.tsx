import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  ImageBackground, 
  Image,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import TextButton from '@/shared/components/TextButton';
import background from '@/assets/images/background.png';
import EmailVerifImg from '@/assets/images/email-verification.png';
import Loading from '@/app/SplashScreen';

export default function EmailVerification() {
  const handleEmailSearch = (values: any) => {
    console.log('Finding your email...', values);
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.row}>
      <StatusBar
        translucent
        backgroundColor='rgba(000, 000, 000, 0.5)'  
        barStyle='light-content'  
      />
        <Text
          style={styles.title}
          className='mt-14 mb-10 text-2xl text-white'
        >
          Find Your Account
        </Text>
        <Image source={EmailVerifImg} className='mt-8 mb-12' />
        <Text style={styles.description} className="w-4/5 mb-10 text-base text-center text-white">
          Already have an account but don't remember the email? Enter it below and we'll check for an existing account.
        </Text>
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={handleEmailSearch}
        >
          {({ handleChange, values }) => (
            <View className='flex items-center justify-center w-full gap-4'>
              <TextInput
                style={styles.input}
                placeholder='Enter your email'
                placeholderTextColor={'#515151'}
                onChangeText={handleChange('email')}
                keyboardType='email-address'
                value={values.email}
                autoCapitalize='none'
              />
            </View>
          )}
        </Formik>
        <View className='mt-12'>
          <Link href='/SplashScreen'>
            <TextButton
              text={'Find My Account'}
              buttonColor={'#1DCDFE'}
              textColor={'white'}
              // onPress={() => !loading && handleEmailSearch('values.email')}
            />
          </Link>
          <Link href='/Onboarding'>
            <TextButton text={'Explore QMaster'} buttonColor={'white'} textColor={'#17222D'} />
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
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
  returnButton: {
    position: 'absolute',
    top: 60, 
    left:18, 
  },
  title: {
    fontFamily: 'InterBold',
    fontSize: 28, 
    color: '#FFF', 
    marginBottom: 16, 
  },
  description: {
    fontFamily: 'JostReg',
  },
  baseText: {
    fontSize: 16, 
    color: '#FFF', 
    marginBottom: 40, 
  },
  input: {
    backgroundColor: '#DFDFDF',
    color: '#515151',
    fontSize: 16,
    fontFamily: 'InterBold',
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
    marginTop: 10, 
    paddingVertical: 16, 
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
    marginTop: 10, 
    paddingVertical: 16, 
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