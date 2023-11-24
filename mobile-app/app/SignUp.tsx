import React, { FormEvent } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  GestureResponderEvent 
} from 'react-native';
import { Formik } from 'formik';

export function SignUp() {
  const handleSignUp = (values: any) => {
    console.log("Signing up...", values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Let's help you save more time</Text>

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
          <View>
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
            <TouchableOpacity
              style={styles.button}
              onPress={(e: GestureResponderEvent) => handleSubmit(e as unknown as FormEvent<HTMLFormElement>)}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
