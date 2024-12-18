import { useDispatch } from 'react-redux'
import { addTask } from "@/TasksStore/Features/tasks/taskManager";
import {Input, Textarea} from "@nextui-org/input";
import {DatePicker} from "@nextui-org/date-picker";
import {Button} from "@nextui-org/button";
import {Form} from "@nextui-org/form";
import {TimeInput} from "@nextui-org/date-input";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import type { CalendarDate } from "@internationalized/date"
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import React, {  FormEvent, useEffect, useState } from 'react';
export default function Panel() {
  const [plannedDate, setPlannedDate] = useState<Date>()
  const dispatch = useDispatch()

  useEffect(() => {
    setPlannedDate(new Date(new Date().getTime() + 24*60*60*1000))
  },[])

  if (!plannedDate) return;
  const dateString = [plannedDate.getFullYear(),(plannedDate.getMonth() + 1).toString().padStart(2,"0"),(plannedDate.getDate()).toString().padStart(2,"0")].join('-').toString()
  const valueDate = parseDate(dateString)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const data = {...formData , plannedDate} as {
      title:string
      desc:string
      plannedDate: Date
      location?: string
      time?: string
    }
    data.time = data.time?.slice(0,5)
    if (!data.title) return
    dispatch(addTask(data))
    e.preventDefault()
    e.currentTarget.reset()
  }


  function onPickerChange(value: CalendarDate | null) {
    if (!value) return; 
    const date = new Date(value.year,value.month-1,value.day)
    setPlannedDate(date)
  }

  return <div className="w-[30%] h-full flex justify-center">
    <Form validationBehavior="native" className="w-[90%] p-4 rounded-3xl bg-elementBg flex flex-col gap-4" onSubmit={onSubmit}>
      <div className='flex flex-col gap-2 w-full'>
        <Input validate={(value) => {
          if (value.length < 3) {
            return "Title must be at least 3 characters long";
          }
          if (value.length > 100) {
            return "Title is too long";
          }
        }} label="Title" name="title" isRequired placeholder="Enter task title" variant='faded'/>
        <Textarea validate={(value) => {
          if (value.length > 300) {
            return "Description is too long";
          }
        }} label="Description" name="desc" maxRows={3} variant='faded'/>
        {/* More options */}
        <Accordion>
          <AccordionItem key="1" aria-label="More options" title="Show more options">
            <div className="flex gap-2">
              <Input validate={(value) => {
                  if (value.length > 50) {
                    return "Location is too long";
                  }
                }} label="Location" name="location" variant='faded'/>
              <TimeInput hourCycle={24} label="Time" name="time"  variant='faded' className='w-min'/>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      <div className='flex justify-between w-full'>
        <div className='flex gap-4'>
        <Button color="secondary" onPress={() => {setPlannedDate(new Date(new Date().getTime() + 24*60*60*1000))}}>Tommorow</Button>
        <DatePicker minValue={today(getLocalTimeZone())} aria-label='Task Date' variant='faded' disableAnimation value={valueDate} onChange={onPickerChange}/>
        </div>
          <Button type='submit' color="warning">Add</Button>
      </div>
    </Form>
  </div>
}