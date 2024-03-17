import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AxiosInstance {
  axiosInstanceSetter: string | null;
}

const initialState: AxiosInstance = {
  axiosInstanceSetter: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.axiosInstanceSetter = action.payload;
    },
  },
});

// export const { setAxiosInstance } = axiosInstanceSlice.actions;

// export default axiosInstanceSlice.reducer;
