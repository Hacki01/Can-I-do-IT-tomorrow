"use client"
import { useState } from "react"


export default function Daily() {
  const [date, updateDate] = useState<Date>(new Date())

  const dateFormat: string = [date.getDate(),date.getMonth()+1,date.getFullYear()].join('/')
  const timeFormat: string = [date.getHours(),date.getMinutes()].join(':')

  setInterval(() => {
    updateDate(new Date())
  }, 1000)

  return <div className='flex flex-col w-full items-center p-3'>
    <div className="text-2xl">Today is {dateFormat} {timeFormat}</div><br/>
    <div>Tasks to do: </div>
  </div>
}