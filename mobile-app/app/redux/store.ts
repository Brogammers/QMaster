import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import userSlice from './userSlice';
// import axiosInstanceSlice from './axiosInstanceSlice';

export const store = configureStore({
  reducer: {
    emailSetter: authSlice,
    tokenSetter: authSlice,
    username: userSlice,
    // axiosInstanceSetter: axiosInstanceSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch