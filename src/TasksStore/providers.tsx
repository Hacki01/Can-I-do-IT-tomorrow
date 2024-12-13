'use client'

import { Provider } from "react-redux";
import {NextUIProvider} from '@nextui-org/react'
import { store } from "./store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";;
import { setTasks } from "./Features/tasks/taskManager";
import type { TasksSlice } from "./Features/tasks/taskManager";

function dateTimeReviver(key: string, value:string) {
  // Matches strings like "2022-08-25T09:39:19.288Z"
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

  return typeof value === 'string' && isoDateRegex.test(value) ? new Date(value) : value
}

function LocalStorageLoadProvider ({children}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageData = localStorage.getItem("reduxState");
      if (localStorageData) {
        dispatch(setTasks({tasks: JSON.parse(localStorageData,dateTimeReviver).tasks as TasksSlice}));
      }
    }
  }, [dispatch]);
  return children
}

export default function Providers ({children}: Readonly<{
  children: React.ReactNode;
}>) {

  return <Provider store={store}>
    <LocalStorageLoadProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </LocalStorageLoadProvider>
  </Provider>;
};