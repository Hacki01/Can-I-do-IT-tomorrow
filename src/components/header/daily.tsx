"use client"
import { useRef } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

import type { RootState } from "../../TasksStore/store";
import { useDispatch, useSelector } from "react-redux"
import { setSelectedDate } from "@/TasksStore/Features/tasks/taskManager";

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function DateToString(date: Date) {
  return [date.getDate(),date.getMonth()+1].join('.');
}

function Button({children, onClick}: Readonly<{
  children: React.ReactNode;
  onClick?: () => void;
}>) {
  return <button className="text-2xl p-2 rounded-lg bg-elementBg aspect-square h-[48px]" 
    onClick={onClick}>{children}
  </button> 
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

  function IncrementButton(props: {value:number}) {
    const { value } = props;
    return <Button onClick={() => {changeSelected(value)}}>
      {value > 0 ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleLeft}/>}
    </Button> 
  }


  const today = DateToString(todayDate.current)
  const selected = DateToString(selectedDate)
  return <div className='flex justify-center gap-3 w-full items-center py-6'>
    <IncrementButton value={-1}/>
    <div className="text-2xl py-2 w-[200px] flex justify-center rounded-lg bg-elementBg">
      Tasks for {today == selected ? 'Today' : selected}
    </div>
    <IncrementButton value={1}/>
    <Button>
      <FontAwesomeIcon icon={faCalendarDays} />
    </Button>
  </div>
}