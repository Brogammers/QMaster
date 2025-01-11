import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EntityState {
  name: string;
  id: string | null;
  type: string | null;
}

const initialState: EntityState = {
  name: '',
  id: null,
  type: null
};

const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    setEntity: (state, action: PayloadAction<EntityState>) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.type = action.payload.type;
    },
    clearEntity: (state) => {
      state.name = '';
      state.id = null;
      state.type = null;
    }
  }
});

export const { setEntity, clearEntity } = entitySlice.actions;
export default entitySlice.reducer; 