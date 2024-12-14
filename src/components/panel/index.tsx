import { useDispatch } from 'react-redux'
import { addTask } from "@/TasksStore/Features/tasks/taskManager";
import {Input, Textarea} from "@nextui-org/input";
import {DatePicker} from "@nextui-org/date-picker";
import type { CalendarDate } from "@internationalized/date"
import {parseDate} from "@internationalized/date";
import {Button} from "@nextui-org/button";
import React, {  useEffect, useState } from 'react';
export default function Panel() {
  const [addTaskDate, setAddTaskDate] = useState<Date>() // 24 hours later
  const dispatch = useDispatch()
  const [title,updateTitle] = useState('')
  const [desc,updateDesc] = useState('')

  useEffect(() => {
    setAddTaskDate(new Date(new Date().getTime() + 24*60*60*1000))
  },[])

  if (!addTaskDate) return;
  const dateString = [addTaskDate.getFullYear(),addTaskDate.getMonth() + 1,addTaskDate.getDate()].join('-').toString()
  const valueDate = parseDate(dateString)

  function handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
    updateTitle(e.currentTarget.value)
  }
  function handleDescChange(e: React.FormEvent<HTMLInputElement>) {
    updateDesc(e.currentTarget.value)
  }

  function handleAdd(plannedDate?: Date) {
    if (!plannedDate) plannedDate = new Date(new Date().getTime() + 24*60*60*1000) // 24 hours later
    if (title.length < 3) return alert('Title must be at least 3 characters long')
    if (desc.length > 300) return alert('Description is too long')
    dispatch(addTask({title,desc,plannedDate}))
    updateTitle('')
    updateDesc('')
  }

  function onPickerChange(value: CalendarDate | null) {
    if (!value) return; 
    const date = new Date(value.year,value.month-1,value.day)
    setAddTaskDate(date)
  }

  return <div className="w-[30%] h-full flex justify-center">
    <div className="w-[90%] p-4 rounded-3xl bg-elementBg flex flex-col gap-3">
      <Input label="Title" onChange={handleTitleChange} isRequired value={title} placeholder="Enter task title" variant='faded'/>
      <Textarea label="Description" onChange={handleDescChange} value={desc} maxRows={3} variant='faded'/>
      <div className='flex gap-4'>
        <Button color="secondary" onPress={() => {handleAdd()}}>Add Tommorow</Button>
        <div><DatePicker aria-label='Task Date' variant='faded' disableAnimation value={valueDate} onChange={onPickerChange}/></div>
        <Button color="warning" onPress={() => {handleAdd(addTaskDate)}}>Add</Button>
      </div>
    </div>
  </div>
}