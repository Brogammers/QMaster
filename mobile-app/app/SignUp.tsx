import { StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextButton from '@/shared/components/TextButton';
import Return from '@/shared/components/Return';
import background from '@/assets/images/background.png';


const handleSignUp = (values: any) => {
  console.log('Form values:', values);
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z]+$/, 'Full name must contain only letters')
    .required("Name required"),
  email: Yup.string().email('Invalid email').required("Email required"),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one numeric digit'
    )
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required("Password confirmation required"),
});


export default function SignUp() {
  // const initialValues = { firstName: "", email: "", password: "", confirmPassword: "" };
  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <ImageBackground source={background} style={styles.container}>
      <Link href='/Onboarding' style={styles.returnButton}>
        <Return size={36} color='white' />
      </Link>
      <View style={styles.row} className='relative'>
        <Text
          style={styles.title}
          className='mt-10 mb-4 text-2xl text-white'
        >
          Welcome!
        </Text>
        <Text className='text-base text-white mb-16' style={styles.subTitle}>
          Let's help you save more time.
        </Text>
        <Formik
          initialValues={{
            firstName: '',
            lastName: null,
            dateOfBirth: null,
            counrtyOfOrigin: null,
            email: '',
            password: '',
            username: null,
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignUp}

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
                placeholder='Enter your full name'
                placeholderTextColor={'#515151'}
                onChangeText={handleChange('firstName')}
                value={values.firstName}
                autoCapitalize='words'
              />
              {(errors.firstName && touched.firstName) &&
                <Text style={{ fontSize: 12, color: 'red', textAlign: 'center' }}>{errors.firstName}</Text>
              }
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
                placeholder='Enter new password'
                placeholderTextColor={'#515151'}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                value={values.password}
              />
              {(errors.password && touched.password) &&
                <Text style={{ fontSize: 12, color: 'red', textAlign: 'center' }}>{errors.password}</Text>
              }
              <TextInput
                style={styles.input}
                placeholder='Confirm new password'
                placeholderTextColor={'#515151'}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry
                value={values.confirmPassword}
              />
              {(errors.confirmPassword && touched.confirmPassword) &&
                <Text style={{ fontSize: 12, color: 'red', textAlign: 'center' }}>{errors.confirmPassword}</Text>
              }
              <View className='my-4' />
              <View className='mt-16'>
                <TextButton 
                  text={'Sign Up'} 
                  buttonColor={!isValid ? '#C5C5C5' : '#1DCDFE'} 
                  textColor={'white'} 
                  onPress={handleSubmit} 
                  disabled={!isValid} 
                />
                <TextButton 
                  text={'Continue with Google'} 
                  text2={'google'} 
                  buttonColor={'white'} 
                  textColor={'#17222D'} />
              </View>
            </View>
          )}
        </Formik>
        {/* <View className='mt-16'>
          <TextButton text={'Sign Up'} buttonColor={'#1DCDFE'} textColor={'white'} onPress={() => handleSubmit()} />
          <TextButton text={'Continue with Google'} text2={'google'} buttonColor={'white'} textColor={'#17222D'} />
        </View> */}
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
    top: 60, // Adjust the top value as needed
    left: 18, // Adjust the left value as needed
  },
  title: {
    fontFamily: 'InterBold',
    fontSize: 28, // Corresponds to text-2xl in Tailwind
    color: '#FFF', // Text color
    marginBottom: 16, // Corresponds to mb-4 in Tailwind
  },
  subTitle: {
    fontFamily: 'JostReg',
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
    fontFamily: 'JostBold',
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

