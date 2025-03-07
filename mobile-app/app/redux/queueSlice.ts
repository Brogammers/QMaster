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
  activeQueue: QueueItem | null;
}

const initialState: QueueState = {
  currentQueues: [],
  activeQueue: null,
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
        const newPosition = Number(action.payload.position) || 1;
        state.currentQueues[queueIndex].position = newPosition;
        state.currentQueues[queueIndex].estimatedTime = Number(action.payload.estimatedTime) || 0;
      }
    },
    clearAllQueues: (state) => {
      state.currentQueues = [];
    },
    setActiveQueue: (state, action: PayloadAction<QueueItem | null>) => {
      state.activeQueue = action.payload;
    },
  },
});

export const {
  setCurrentQueues,
  addToQueue,
  removeFromQueue,
  updateQueuePosition,
  clearAllQueues,
  setActiveQueue,
} = queueSlice.actions;

export default queueSlice.reducer;