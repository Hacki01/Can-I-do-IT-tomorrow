"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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
  nextTaskID: number;
  selectedDate: Date;
}

const initialState: TasksSlice = {
  list: {},
  nextTaskID: 0,
  selectedDate: new Date(),
};


function createID(tasksForToday: number) {
  const date = new Date();

  const year = date.getFullYear().toString().slice(2)
  const month = (date.getMonth() + 1).toString().padStart(2,'0')
  const day = date.getDate().toString().padStart(2,'0')
  
  const id = parseInt(year+month+day+(tasksForToday + 1).toString().padStart(3,'0'))
  return id
}

function DateToString(date: Date) {
  return [date.getDate(),date.getMonth()+1].join('.');
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


function getTasksForDate(state: TasksSlice, date:Date) {
  return Object.values(state.list).filter(task => DateToString(task.plannedDate) === DateToString(date))
}

export const TasksSlice = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    setSelectedDate: (state,action: PayloadAction<{date: Date}>) => {
      state.selectedDate = action.payload.date
      return state
    },
    setTasks: (state,action: PayloadAction<{tasks: TasksSlice}>) => {
      state = action.payload.tasks
      state.selectedDate = new Date()
      return state
    },
    addTask:  (state,action: PayloadAction<{title: string, desc: string, plannedDate?: Date}>) => {
      const { title, desc, plannedDate = addDays(new Date(),1)} = action.payload
      const tasksForToday = getTasksForDate(state, plannedDate).length
      const id = createID(tasksForToday)
      state.list[id] = {
        id,
        title: title || 'No Title Provided',
        desc,
        isHighPriority:false,
        isCompleted: false,
        completedDate: null,
        plannedDate,
      };
      return state
    },
    updatePlannedDate: (state,action: PayloadAction<{id:number, date:Date}>) => {
      const { id, date } = action.payload
      if (!id || !state.list[id]) return state
      state.list[id].plannedDate = date
      return state
    },
    setCompleted: (state,action: PayloadAction<{id:number, status?: boolean}>) => {
      const { id, status = true } = action.payload
      if (!id || !state.list[id]) return state
      state.list[id].completedDate = status ? new Date() : null 
      state.list[id].isCompleted = status
      return state
    },
    setHighPriority: (state, action: PayloadAction<{id:number, status?: boolean}>) => {
      const { id, status = true } = action.payload
      if (!id || !state.list[id]) return state
      state.list[id].isHighPriority = status
      return state
    },
    removeTask: (state,action: PayloadAction<{id:number}>) => {
      const { id } = action.payload
      if (!id || !state.list[id]) return state
      delete state.list[id]
      return state
    }
  },
})

export const { addTask, removeTask, setCompleted, setTasks, setSelectedDate, setHighPriority, updatePlannedDate } = TasksSlice.actions;

export default TasksSlice.reducer;