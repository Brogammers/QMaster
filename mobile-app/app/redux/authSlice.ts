import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  email: string | null
}

const initialState: AuthState = {
  email: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEmail } = authSlice.actions

export default authSlice.reducer