import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useGoogleAuth } from '@/ctx/GoogleAuthContext';
import GoogleUserDetailsForm from '@/components/GoogleUserDetails';
import background from '@/assets/images/background.png';
import Return from '@/shared/components/Return';

export default function GoogleUserDetails() {
  const { googleUser, completeGoogleSignIn } = useGoogleAuth();

  if (!googleUser) {
    return null;
  }

  return (
    <ImageBackground source={background} style={styles.container}>
      <Return href="/(auth)/Login" size={36} color="white" />
      <View style={styles.formContainer}>
        <GoogleUserDetailsForm
          initialEmail={googleUser.email}
          initialFirstName={googleUser.firstName}
          initialLastName={googleUser.lastName}
          onSubmit={completeGoogleSignIn}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17222D',
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
}); 