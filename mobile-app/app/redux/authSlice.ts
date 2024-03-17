import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '@/types'

const initialState: AuthState = {
  email: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEmail, setToken } = authSlice.actions

export default authSlice.reducer