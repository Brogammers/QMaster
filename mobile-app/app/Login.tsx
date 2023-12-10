import React from 'react';
import { 
  StyleSheet, 
  ImageBackground, 
  Image,
  View,
  Text,
  TextInput,
} from 'react-native';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import TextButton from '@/shared/components/TextButton';
import Return from '@/shared/components/Return';
import background from '@/assets/images/background.png';
import LoginImg from '@/assets/images/login.png';


export default function Login() {
  const handleSignUp = (values: any) => {
    console.log("Signing up...", values);
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <Link href='/Onboarding' style={styles.returnButton}>
        <Return size={36} color='white' />
      </Link>
      <View style={styles.row}>
        <Text
          style={styles.title}
          className='mt-14 mb-10 text-2xl text-white'
        >
          Welcome Back!
        </Text>
        <Image source={LoginImg} className='mt-6 mb-12' />
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
                autoCapitalize='none'
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
        <Text
          className='text-baby-blue underline mt-2 text-sm'
        >
          Forgot password?
        </Text>
        <View className='mt-8'>
          <TextButton text={'Log In'} buttonColor={'#1DCDFE'} textColor={'white'} />
          <TextButton text={'Continue with Google'} text2={'google'} buttonColor={'white'} textColor={'#17222D'} />
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

