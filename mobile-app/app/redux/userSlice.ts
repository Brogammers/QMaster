import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUsername: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
