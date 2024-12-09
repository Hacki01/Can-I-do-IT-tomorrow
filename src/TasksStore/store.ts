'use client';

import { configureStore } from "@reduxjs/toolkit";
import Tasks from './Features/tasks/taskManager'

export const store = configureStore({
  reducer: {
    tasks: Tasks,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;