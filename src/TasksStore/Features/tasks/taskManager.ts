"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let tasksAmount: number = 0

export interface Task {
  id: number;
  title: string,
  desc: string,
  isCompleted: boolean,
  completedDate: Date | null;
  plannedDate: Date,
} 

interface TaskSlice {
  list: {[key:number]:Task};
  tasksAmount: number;
  completedAmount:number;
}

const initialState: TaskSlice = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem('reduxState') || '').tasks : {
  list: {},
  tasksAmount: tasksAmount,
  completedAmount: 0
};
console.log(initialState)

function createID() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(2)
  const month = (date.getMonth() + 1).toString().padStart(2,'0')
  const day = date.getDate().toString().padStart(2,'0')
  const id = parseInt(year+month+day+tasksAmount.toString().padStart(3,'0'))
  
  return id
}

export const taskSlice = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    addTask:  (state,action) => {
      const id = createID()
      const { title, desc } = action.payload
      const tomorrowDate = new Date();
      tomorrowDate.setDate(new Date().getDate() + 1);
      state.list[id] = {
        id,
        title: title || 'No Title Provided',
        desc,
        isCompleted: false,
        completedDate: null,
        plannedDate: tomorrowDate,
      };
      tasksAmount++
      state.tasksAmount = tasksAmount
      return state
    },
    setCompleted: (state,action: PayloadAction<{id:number, status?: boolean}>) => {
      const { id, status = true } = action.payload
      if (!id) return state
      if (state.list[id].isCompleted != status) {
        state.completedAmount += status ? 1 : -1
      }
      state.list[id].isCompleted = status
      return state
    }
  },
})

export const { addTask, setCompleted } = taskSlice.actions;

export default taskSlice.reducer;