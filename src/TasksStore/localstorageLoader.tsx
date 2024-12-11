'use client'

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";;
import { setTasks } from "./Features/tasks/taskManager";
import type { TaskSlice } from "./Features/tasks/taskManager";

export default function LocalStorageLoader ({children}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageData = localStorage.getItem("reduxState");
      if (localStorageData) {
        dispatch(setTasks(JSON.parse(localStorageData).tasks as TaskSlice));
      }
    }
  }, [dispatch]);

  return children;
};
