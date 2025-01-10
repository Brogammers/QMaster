import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import entityReducer from './features/entitySlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    entity: entityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 