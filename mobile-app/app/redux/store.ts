import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import userSlice from './userSlice';
import navigationSlice from './navigationSlice';

export const store = configureStore({
  reducer: {
    emailSetter: authSlice,
    username: userSlice,
    navigationSetter: navigationSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch