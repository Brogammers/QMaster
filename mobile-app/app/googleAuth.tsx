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
    androidClientId: '417915066205-5ttil2s76tgfahtmvn3ltvgl98vuntuk.apps.googleusercontent.com',
    iosClientId: '417915066205-eo3sb2te9mdkp4a1et2j4pmm4i559chh.apps.googleusercontent.com',
    
  })

  React.useEffect(() => {
    handleSignInWithGoogle()
  },[response])
  
  const getUserInfo = async (token: any) => {
    if (!token) return ;
    try{
      const response = await fetch (
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      )

      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
    } catch(error) {
      alert('something went wrong')
    };
  }

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem('@user');
    if (!user) {
      if(response?.type === "success"){
      await getUserInfo(response.authentication?.accessToken);
    }
    }
    else {
      setUserInfo(JSON.parse(user))
    }
  }


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