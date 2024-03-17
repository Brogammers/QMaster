import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


// Define your base URL (adjust this to your actual backend URL)
const BASE_URL = 'http://localhost:8080/asdasd';

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Set the base URL for all requests
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    console.log("JWT in Axios", token);
    Alert.alert("Token", token?.toString())
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorized JWT", config.headers.Authorization.toString());
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Handle 401 Unauthorized errors here
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., logout user, redirect to login page)
      // You may dispatch actions to handle logout here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
