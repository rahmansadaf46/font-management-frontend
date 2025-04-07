// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import fontReducer from './fontSlice';

export const store = configureStore({
  reducer: {
    font: fontReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
