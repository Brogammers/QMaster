import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define your base URL (adjust this to your actual backend URL)
const BASE_URL = "http://localhost:8080/api/v1";

// const token = await AsyncStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 6000,
  headers: {
    // Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
});

console.log("Before axios call. Headers: ", axiosInstance.defaults.headers);

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors here
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., logout user, redirect to login page)
      // You may dispatch actions to handle logout here
    }
    return Promise.reject(error);
  }
);

console.log(
  "After axios interceptors. Headers: ",
  axiosInstance.defaults.headers
);

export default axiosInstance;
