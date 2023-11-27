import * as React from 'react';
import { View, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const GoogleAuth = () => {
  const [userInfo, setUserInfo] = React.useState(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '417915066205-dcpj6gokigcfhpf7l9oqu47m5db8esdu.apps.googleusercontent.com',
    iosClientId: '417915066205-rabucr37ts892rl4cb6n2bg9t8b4010o.apps.googleusercontent.com',
    webClientId: '417915066205-0p5j27kr3ng63n917a0il2rv7aml49dg.apps.googleusercontent.com',
  }
  )


  React.useEffect(() => {
    handleSignInWithGoogle()
  },[response])
  
  
  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem('@user');
    if (!user) {
      try {
        if (response?.type === 'success') {
          await getUserInfo(response.authentication?.accessToken);
        }
      } catch (error) {
        console.error('Error handling Google Sign-In:', error);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }
  
  const getUserInfo = async (token: string | undefined) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  };

  return (
    <View className='flex items-center justify-center h-screen'>
      <Text>{JSON.stringify(userInfo)}</Text>
      <TouchableOpacity className='flex items-center justify-center w-40 h-10 bg-blue-500' onPress={() => promptAsync()}>
        <Text className='font-bold text-white'>
          Sign In With Google
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default GoogleAuth;