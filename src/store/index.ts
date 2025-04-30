import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './expensesSlice';
import { saveToLocalStorage } from './expensesSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 