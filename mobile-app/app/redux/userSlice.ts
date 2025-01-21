import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  username: string | null;
  phoneCode: string | null;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
}

const initialState: UserState = {
  userId: null,
  username: null,
  phoneCode: null,
  phoneNumber: null,
  firstName: null,
  lastName: null,
  profileImage: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPhoneCode: (state, action: PayloadAction<string>) => {
      state.phoneCode = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setProfileImage: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
    },
  },
});

export const {
  setUserId,
  setUsername,
  setFirstName,
  setLastName,
  setPhoneCode,
  setPhoneNumber,
  setProfileImage
} = userSlice.actions;

export default userSlice.reducer;
