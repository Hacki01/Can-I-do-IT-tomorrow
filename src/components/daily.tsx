"use client"
import { useRef, useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function DateToString(date: Date) {
  return [date.getDate(),date.getMonth()+1].join('.');
}

export default function Daily() {
  const todayDate = useRef(new Date)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  
  setInterval(() => {
    todayDate.current = new Date()
  }, 1000)

  function changeSelected(incrementation: number) {
    setSelectedDate(addDays(selectedDate, incrementation))
  }

  function IncrementButton(props: {value:number}) {
    const { value } = props;
    return <button className="text-2xl p-2 rounded-lg bg-[#f5f6fa] aspect-square h-[48px]" 
      onClick={() => {changeSelected(value)}}>{value > 0 ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleLeft}/>}
    </button> 
  }


  const today = DateToString(todayDate.current)
  const selected = DateToString(selectedDate)
  return <div className='flex justify-center gap-3 w-full items-center py-6'>
    <IncrementButton value={-1}/>
    <div className="text-2xl py-2 w-[200px] flex justify-center rounded-lg bg-[#f5f6fa]">
      {today == selected ? 'Today is ' : 'Tasks for '}{selected}
    </div>
    <IncrementButton value={1}/>
  </div>
}