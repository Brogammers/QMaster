import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { FormEvent } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  GestureResponderEvent,
} from 'react-native';
import { Formik } from 'formik';

export default function TabTwoScreen() {
  const handleSignUp = (values: any) => {
    console.log("Signing up...", values);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text
          style={styles.title}
          className='font-extrabold'
        >
          Welcome!
        </Text>
        <Text style={styles.subtitle}>Let's help you save more time.</Text>

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleSignUp}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder='Enter your full name'
                onChangeText={handleChange('fullName')}
                value={values.fullName}
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
                placeholder='Enter password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                value={values.password}
              />
              <TextInput
                style={styles.input}
                placeholder='Confirm password'
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry
                value={values.confirmPassword}
              />
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={(e: GestureResponderEvent) => handleSubmit(e as unknown as FormEvent<HTMLFormElement>)}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.googleButton]}
                >
                  <FontAwesome name="google" size={24} color="#17222D" />
                  <Text style={[styles.buttonText, styles.googleButtonText]}>Continue with Google</Text>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 32,
    color: '#FFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  input: {
    borderRadius: 40,
    backgroundColor: '#DFDFDF',
    color: '#515151',
    fontSize: 16,
    width: '100%',
    height: 48,
    marginBottom: 20,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  buttons: {
    width: '100%',
    marginTop: 32,
    display: 'flex',
    gap: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#1DCDFE',
    display: 'flex',
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 10,
  },
  googleButton: {
    backgroundColor: '#FFF',
    color: '#17222D',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  googleButtonText: {
    color: '#17222D',
  },
});
