import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  View,
  Text,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextButton from '@/shared/components/TextButton';
import Return from '@/shared/components/Return';
import background from '@/assets/images/background.png';
import LoginImg from '@/assets/images/login.png';
import axios, { AxiosError } from 'axios';
import { useAuth } from '@/ctx/AuthContext';
import { API_BASE_URL_LOGIN, API_BASE_URL_LOGIN_ANDROID } from '@env';

import { useDispatch } from 'react-redux';
import { setEmail } from '../redux/authSlice'; // replace with the actual path


const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required("Email required"),
  password: Yup.string().required("Password required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const auth = useAuth();

  const handleLogin = async (values: any) => {
    console.log("Logging in...", values);

    try {
      // IOS Simulator
      // const response = await axios.post(`${API_BASE_URL_LOGIN}`, values);
      // Android Emulator
      const response = await axios.post('http://10.0.2.2:8080/api/v1/login', values);


      if (response.status === 200 || response.status === 201) {
        console.log('Login successful', values);
        if (auth && auth.signIn) {
          console.log("This is the type of response: " + typeof response.data);
          console.log("This is the email of the user: ", response.data.email, " and type: ", typeof response.data.email)
          // Update the session state and wait for the update to complete
          await new Promise<void>(resolve => {
            dispatch(setEmail(response.data.email));
            resolve();
          });

          auth.signIn();
        }
      } else {
        console.error('Login failed', response.data);
        Alert.alert('Signup Failed', 'Please check your input and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          console.error('Axios error status:', axiosError.response.status);
          console.error('Axios error data:', axiosError.response.data);
        } else if (axiosError.request) {
          console.error('Axios error request:', axiosError.request);
        } else {
          console.error('Axios error message:', axiosError.message);
        }
      } else {
        // Handle non-Axios errors
        console.error('Non-Axios error:', error);
      }
    }
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <Link href='/Onboarding' style={styles.returnButton}>
        <Return size={36} color='white' />
      </Link>
      <StatusBar
        translucent
        backgroundColor='rgba(000, 000, 000, 0.5)'
        barStyle='light-content'
      />
      <View style={styles.row}>
        <Text
          style={styles.title}
          className='mb-10 text-2xl text-white mt-14'
        >
          Welcome Back!
        </Text>
        <Image source={LoginImg} className='mt-6 mb-12' />
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isValid
          }) => (
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
              {(errors.email && touched.email) &&
                <Text style={{ fontSize: 12, color: 'red', textAlign: 'center' }}>{errors.email}</Text>
              }
              <TextInput
                style={styles.input}
                placeholder='Enter your password'
                placeholderTextColor={'#515151'}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                value={values.password}
              />
              {(errors.password && touched.password) &&
                <Text style={{ fontSize: 12, color: 'red', textAlign: 'center' }}>{errors.password}</Text>
              }
              <Text
                className='mt-2 text-sm underline text-baby-blue'
              >
                Forgot password?
              </Text>
              <View className='mt-8'>
                <TextButton
                  text={'Log In'}
                  buttonColor={!isValid ? '#C5C5C5' : '#1DCDFE'}
                  textColor={'white'}
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
                <TextButton
                  text={'Continue with Google'}
                  icon={'google'}
                  buttonColor={'white'}
                  textColor={'#17222D'}
                />
              </View>
            </View>
          )}
        </Formik>
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
    left: 18,
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

