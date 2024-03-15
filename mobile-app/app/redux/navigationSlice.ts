import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { NavigationState } from '@/types';

const initialState: NavigationState = {
  navigationSetter: false,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigation: (state, action: PayloadAction<boolean>) => {
      state.navigationSetter = action.payload;
    },
  },
});

export const { setNavigation } = navigationSlice.actions;

export default navigationSlice.reducer;
