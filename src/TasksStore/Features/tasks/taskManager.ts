"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let tasksAmount: number = 0

export interface Task {
  id: number;
  title: string,
  desc: string,
  isHighPriority: boolean,
  isCompleted: boolean,
  completedDate: Date | null;
  plannedDate: Date,
} 

export interface TasksSlice {
  list: {[key:number]:Task};
  tasksAmount: number;
  completedAmount:number;
  selectedDate: Date;
}

const initialState: TasksSlice = {
  list: {},
  tasksAmount: 0,
  completedAmount: 0,
  selectedDate: new Date(),
};


function createID() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(2)
  const month = (date.getMonth() + 1).toString().padStart(2,'0')
  const day = date.getDate().toString().padStart(2,'0')
  const id = parseInt(year+month+day+tasksAmount.toString().padStart(3,'0'))
  
  return id
}

export const TasksSlice = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    setSelectedDate: (state,action: PayloadAction<Date>) => {
      state.selectedDate = action.payload
      return state
    },
    setTasks: (state,action: PayloadAction<TasksSlice>) => {
      state = action.payload
      state.selectedDate = new Date()
      return state
    },
    addTask:  (state,action) => {
      const id = createID()
      const { title, desc } = action.payload
      const tomorrowDate = new Date();
      tomorrowDate.setDate(new Date().getDate() + 1);
      state.list[id] = {
        id,
        title: title || 'No Title Provided',
        desc,
        isHighPriority:false,
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
      state.list[id].completedDate = status ? new Date() : null 
      state.list[id].isCompleted = status
      return state
    },
    setHighPriority: (state, action: PayloadAction<{id:number, status?: boolean}>) => {
      const { id, status = true } = action.payload
      if (!id) return state
      state.list[id].isHighPriority = status
      return state
    } 
  },
})

export const { addTask, setCompleted, setTasks, setSelectedDate, setHighPriority } = TasksSlice.actions;

export default TasksSlice.reducer;