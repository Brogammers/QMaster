import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QueueItem {
  id: number;
  name: string;
  serviceType: string;
  position: number;
  estimatedTime: number;
  location: string;
  timestamp: string;
  image?: string;
}

interface QueueState {
  currentQueues: QueueItem[];
}

const initialState: QueueState = {
  currentQueues: [],
};

export const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    setCurrentQueues: (state, action: PayloadAction<QueueItem[]>) => {
      state.currentQueues = action.payload;
    },
    addToQueue: (state, action: PayloadAction<QueueItem>) => {
      // Check if queue already exists to avoid duplicates
      const existingQueueIndex = state.currentQueues.findIndex(
        queue => queue.id === action.payload.id
      );

      if (existingQueueIndex >= 0) {
        // Update existing queue
        state.currentQueues[existingQueueIndex] = action.payload;
      } else {
        // Add new queue
        state.currentQueues.push(action.payload);
      }
    },
    removeFromQueue: (state, action: PayloadAction<number>) => {
      state.currentQueues = state.currentQueues.filter(
        queue => queue.id !== action.payload
      );
    },
    updateQueuePosition: (
      state,
      action: PayloadAction<{ id: number; position: number; estimatedTime: number }>
    ) => {
      const queueIndex = state.currentQueues.findIndex(
        queue => queue.id === action.payload.id
      );

      if (queueIndex >= 0) {
        state.currentQueues[queueIndex].position = action.payload.position;
        state.currentQueues[queueIndex].estimatedTime = action.payload.estimatedTime;
      }
    },
    clearAllQueues: (state) => {
      state.currentQueues = [];
    }
  },
});

export const {
  setCurrentQueues,
  addToQueue,
  removeFromQueue,
  updateQueuePosition,
  clearAllQueues
} = queueSlice.actions;

export default queueSlice.reducer;