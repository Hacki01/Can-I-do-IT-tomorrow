'use client';

import TasksList from "@/components/tasks"

import type { RootState } from "../TasksStore/store";
import { useSelector, useDispatch } from 'react-redux'
import {increment,decrement,reset} from '../TasksStore/Features/counter/counterSlice'

export default function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
  return <main>
      <TasksList />
      {count}<br/>
      <button onClick={() => dispatch(increment())}>Increment</button><br/>
      <button onClick={() => dispatch(decrement())}>Decrement</button><br/>
    </main>
}