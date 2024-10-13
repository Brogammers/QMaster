// entitySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EntityState {
  name: string;
}

const initialState: EntityState = {
  name: '',
};

const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    setEntityName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setEntityName } = entitySlice.actions;
export default entitySlice.reducer;