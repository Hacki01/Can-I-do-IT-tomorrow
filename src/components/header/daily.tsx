"use client"
import { useEffect, useRef } from "react"
import {DatePicker} from "@nextui-org/date-picker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import {parseDate} from "@internationalized/date";
import type { CalendarDate } from "@internationalized/date"

import type { RootState } from "../../TasksStore/store";
import { useDispatch, useSelector } from "react-redux"
import { setSelectedDate } from "@/TasksStore/Features/tasks/taskManager";

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function Daily() {
  const todayDate = useRef<Date>()
  const selectedDate = useSelector((state: RootState) => state.tasks).selectedDate
  const dispatch = useDispatch()
  const tasks =useSelector((state: RootState) => state.tasks).list

  useEffect(() => {
    todayDate.current = new Date()
    return () => {
      todayDate.current = undefined;
    }
  })

  setInterval(() => {
    todayDate.current = new Date()
  }, 1000)

  function changeSelected(incrementation: number) {
    const newSelectedDate =  addDays(selectedDate, incrementation)
    dispatch(setSelectedDate({date: newSelectedDate}))
  }

  function onPickerChange(value: CalendarDate | null) {
    if (!value) return; 
    const date = new Date(value.year,value.month-1,value.day)
    dispatch(setSelectedDate({date}))
  }

  function IncrementButton(props: {value:number}) {
    const { value } = props;
    return <button className="text-2xl p-2 rounded-lg aspect-square h-[48px]" onClick={() => {changeSelected(value)}}>
      {value > 0 ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleLeft}/>}
    </button> 
  }

  function UncompletedTasks({ count }: { count: number }) {
    if (count > 5) {
      return <div className="text-danger">Uncompleted tasks: {count}</div>;
    }
    if (count > 2) {
      return <div className="text-warning">Uncompleted tasks: {count}</div>;
    }
    if (count > 0) {
      return <div className="text">Uncompleted tasks: {count}</div>;
    }
    return null;
  }
  const tomorrow = selectedDate
  tomorrow.setHours(0, 0, 0, 0);

  const uncompletedTasksCount = Object.values(tasks).filter((task) => {
    const taskDate = new Date(task.plannedDate);
    taskDate.setHours(0, 0, 0, 0);
    console.log(taskDate)
    return !task.isCompleted && taskDate.getTime() === tomorrow.getTime();
  }).length;
  console.log(uncompletedTasksCount)
  const dateString = [selectedDate.getFullYear(),(selectedDate.getMonth() + 1).toString().padStart(2,'0'),(selectedDate.getDate()).toString().padStart(2,'0')].join('-').toString()
  const valueDate = parseDate(dateString)

  return <div className="flex flex-col items-center">
    <div className='flex justify-center gap-3 w-full items-center pt-5'>
      <IncrementButton value={-1}/>
      <div className=""><DatePicker disableAnimation label="Tasks for" value={valueDate} onChange={onPickerChange}/></div>
      <IncrementButton value={1}/>
    </div>
    <div className="py-2">
      <UncompletedTasks count={uncompletedTasksCount} />
    </div>
  </div>
}