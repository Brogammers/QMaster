import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  View,
  Text,
  TextInput,
  StatusBar,
  Alert,
  I18nManager,
} from 'react-native';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import TextButton from '@/shared/components/TextButton';
import background from '@/assets/images/background.png';
import EmailVerifImg from '@/assets/images/email-verification.png';
import Loading from '@/app/SplashScreen';
import { EmailVerificationText } from '@/constants';
import i18n from '@/i18n';

export default function EmailVerification() {
  const [loading, setLoading] = useState(false);

  const handleEmailSearch = (values: any) => {
    setLoading(true);
    console.log('Finding your email...', values);

    setTimeout(() => {
      setLoading(false);
      showAlertNoAccountFound();
    }, 5000)
  };

  const showAlertNoAccountFound = () => {
    Alert.alert(
      i18n.t('accountNotFound'),
      i18n.t('accountNotFoundComment'),
      [
        {
          text: i18n.t('reEnter'),
          onPress: () => console.log('Re-enter Pressed'),
        },
        {
          text: i18n.t('register'),
          onPress: () => console.log('Register Pressed'),
        },
      ],
    );
  };

  const showAlertAccountFound = () => {
    Alert.alert(
      i18n.t('accountFound'),
      i18n.t('accountFoundComment'),
      [
        {
          text: i18n.t('login'),
          onPress: () => console.log('Login Pressed'),
        },
        {
          text: i18n.t('resetPassword'),
          onPress: () => console.log('Reset Password Pressed'),
        },
      ],
    );
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      {loading && (
        <LoadingOverlay
          backgroundColor="rgba(23, 34, 45, 0.925)"
        />
      )}
      <View style={styles.row}>
        <StatusBar
          translucent
          backgroundColor='rgba(000, 000, 000, 0.5)'
          barStyle='light-content'
        />
        <Text
          style={styles.title}
          className='mb-10 text-2xl text-white mt-14'
        >
          {i18n.t('findAccount')}
        </Text>
        <Image source={EmailVerifImg} className='mt-8 mb-12' />
        <Text style={styles.description} className="w-full mt-2 mb-10 text-base text-center text-white">
          {i18n.t('findAccountComment')}
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
                style={[
                  styles.input,
                  I18nManager.isRTL ? styles.inputRTL : styles.inputLTR,
                ]}
                placeholder={i18n.t('enterEmail')}
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
          <TextButton
            text={i18n.t('findMyAccount')}
            buttonColor={'#1DCDFE'}
            textColor={'white'}
            onPress={() => !loading && handleEmailSearch('values.email')}
          />
          <Link href='/Onboarding'>
            <TextButton text={i18n.t('exploreQMaster')} buttonColor={'white'} textColor={'#17222D'} />
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}


const LoadingOverlay = ({ backgroundColor }: { backgroundColor: string }) => (
  <View style={[styles.overlay, { backgroundColor }]}>
    <Loading additionalText={EmailVerificationText} />
  </View>
);


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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    width: '100%',
    backgroundColor: 'rgba(23, 34, 45, 0.925)', // Adjust the opacity as needed
    // rgba(0, 0, 0, 0.5)
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
  inputRTL: {
    textAlign: "right", // Align text to the right for RTL languages
  },
  inputLTR: {
    textAlign: "left", // Align text to the left for LTR languages
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