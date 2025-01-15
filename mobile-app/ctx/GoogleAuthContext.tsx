import React, { createContext, useContext, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setEmail, setToken } from '@/app/redux/authSlice';
import { setFirstName, setLastName, setPhoneCode, setPhoneNumber, setUserId, setUsername } from '@/app/redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configConverter from '@/api/configConverter';

WebBrowser.maybeCompleteAuthSession();

interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
}

interface GoogleAuthContextType {
  googleUser: GoogleUser | null;
  promptAsync: () => Promise<any>;
  handleGoogleSignIn: () => Promise<void>;
  completeGoogleSignIn: (additionalDetails: any) => Promise<void>;
  isLoading: boolean;
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

export function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await promptAsync();
      
      if (result?.type === 'success') {
        const { authentication } = result;
        
        // Get user info from Google
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { Authorization: `Bearer ${authentication?.accessToken}` },
          }
        );

        const userInfo = await userInfoResponse.json();
        
        setGoogleUser({
          email: userInfo.email,
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          photoUrl: userInfo.picture,
        });

        // Navigate to additional details screen
        router.push('/(auth)/GoogleUserDetails');
      }
    } catch (error) {
      console.error('Google Sign In Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeGoogleSignIn = async (additionalDetails: any) => {
    try {
      setIsLoading(true);
      
      const userData = {
        ...googleUser,
        ...additionalDetails,
      };

      // Send to your backend
      const response = await axios.post(
        `${configConverter('EXPO_PUBLIC_API_BASE_URL_LOGIN')}/google`,
        userData
      );

      if (response.status === 200 || response.status === 201) {
        // Update Redux store
        dispatch(setEmail(userData.email));
        dispatch(setToken(response.data.token));
        dispatch(setUsername(userData.firstName + ' ' + userData.lastName));
        dispatch(setUserId(response.data.userID));
        dispatch(setFirstName(userData.firstName));
        dispatch(setLastName(userData.lastName));
        dispatch(setPhoneCode(userData.phoneCode));
        dispatch(setPhoneNumber(userData.phoneNumber));

        // Store token
        await AsyncStorage.setItem('token', response.data.token);
        
        // Update axios defaults
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        axios.defaults.headers.common['Content-Type'] = 'application/json';

        // Navigate to main app
        router.replace('/(app)/(tabs)');
      }
    } catch (error) {
      console.error('Complete Google Sign In Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleAuthContext.Provider
      value={{
        googleUser,
        promptAsync,
        handleGoogleSignIn,
        completeGoogleSignIn,
        isLoading,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
}

export function useGoogleAuth() {
  const context = useContext(GoogleAuthContext);
  if (context === undefined) {
    throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
  }
  return context;
} 