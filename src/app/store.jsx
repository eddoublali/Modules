import { configureStore } from '@reduxjs/toolkit';
import moduleReducer from '../features/modules/moduleSlice';

export const store = configureStore({
  reducer: {
    modules: moduleReducer,
  },
});
