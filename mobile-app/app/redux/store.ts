import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import userSlice from './userSlice';
import queueReducer from './queueSlice';

export const store = configureStore({
  reducer: {
    emailSetter: authSlice,
    tokenSetter: authSlice,
    username: userSlice,
    firstName: userSlice,
    lastName: userSlice,
    phoneCode: userSlice,
    phoneNumber: userSlice,
    userId: userSlice,
    profileImage: userSlice,
    queue: queueReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch