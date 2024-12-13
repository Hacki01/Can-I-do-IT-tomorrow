"use client"
import { useRef } from "react"
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
  const todayDate = useRef(new Date())
  const selectedDate = useSelector((state: RootState) => state.tasks).selectedDate
  const dispatch = useDispatch()
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

  const dateString = [selectedDate.getFullYear(),selectedDate.getMonth() + 1,selectedDate.getDate()].join('-').toString()
  const valueDate = parseDate(dateString)

  return <div className='flex justify-center gap-3 w-full items-center py-6'>
    <IncrementButton value={-1}/>
    <div className=""><DatePicker disableAnimation label="Tasks for" value={valueDate} onChange={onPickerChange}/></div>
    <IncrementButton value={1}/>
  </div>
}