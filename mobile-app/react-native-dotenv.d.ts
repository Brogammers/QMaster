// react-native-dotenv.d.ts
declare module '@env' {
  // IOS Simulator
  export const BASE_URL: string;
  export const API_BASE_URL: string;
  export const API_BASE_URL_LOGIN: string;
  export const API_BASE_URL_SEARCH: string;
  export const API_BASE_URL_HISTORY: string;

  // Android
  export const API_BASE_URL_ANDROID: string;
  export const API_BASE_URL_LOGIN_ANDROID: string;
  export const API_BASE_URL_SEARCH_ANDROID: string;
  export const API_BASE_URL_HISTORY_ANDROID: string;
}
