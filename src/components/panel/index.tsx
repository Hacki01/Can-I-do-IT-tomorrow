import { useDispatch } from 'react-redux'
import { addTask } from "@/TasksStore/Features/tasks/taskManager";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import type { CalendarDate } from "@internationalized/date"
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import React, {  FormEvent, useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  TimeInput,
  Input,
  Textarea,
  useDisclosure,
  DatePicker,
} from "@nextui-org/react";


function PanelContent(props: {close?: () => void}) {
  const { close } = props
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
      desc?:string
      plannedDate: Date
      location?: string
      time?: string
    }
    data.time = data.time?.slice(0,5)
    if (!data.title) return
    dispatch(addTask(data))
    e.preventDefault()
    e.currentTarget.reset()
    if (close) close()
  }


  function onPickerChange(value: CalendarDate | null) {
    if (!value) return; 
    const date = new Date(value.year,value.month-1,value.day)
    setPlannedDate(date)
  }

  return <Form validationBehavior="native" className="w-[90%] p-4 rounded-3xl bg-elementBg flex flex-col gap-4" onSubmit={onSubmit}>
      <div className='flex flex-col gap-2 w-full'>
        <Input validate={(value) => {
          if (value.length < 3) {
            return "Title must be at least 3 characters long";
          }
          if (value.length > 100) {
            return "Title is too long";
          }
        }} label="Title" name="title" type='title' isRequired placeholder="Enter task title" variant='faded'/>
        <Textarea validate={(value) => {
          if (value.length > 300) {
            return "Description is too long";
          }
        }} label="Description" name="desc" type='description' maxRows={3} variant='faded'/>
        {/* More options */}
        <Accordion>
          <AccordionItem key="1" aria-label="More options" title="Show more options">
            <div className="flex gap-2 max-lg:flex-wrap">
              <Input validate={(value) => {
                  if (value.length > 50) {
                    return "Location is too long";
                  }
                }} label="Location" name="location" type='location' variant='faded'/>
              <TimeInput hourCycle={24} label="Time" name="time"  variant='faded' className='w-min'/>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      <div className='flex justify-between w-full flex-wrap gap-2'>
        <div className='flex gap-2'>
          <Button className="max-md:hidden" color="secondary" onPress={() => {setPlannedDate(new Date(new Date().getTime() + 24*60*60*1000))}}>Tomorrow</Button>
          <DatePicker minValue={today(getLocalTimeZone())} aria-label='Task Date' variant='faded' disableAnimation value={valueDate} onChange={onPickerChange}/>
        </div>
          <Button type='submit' color="warning">Add</Button>
      </div>
    </Form>
}

function ModalPanel() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  function close() {
    onOpenChange()
  }
  return <>
    <Button color='warning' onPress={onOpen}>Add new task</Button>
    <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add new task</ModalHeader>
            <ModalBody>
              <PanelContent close={close}/>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>
}

export default function Panel() {
  return <div className='w-full lg:w-[50%] xl:w-[40%]'>
    <div className='hidden md:flex h-full justify-center'>
      <PanelContent/>
    </div>
    <div className='md:hidden flex justify-center mb-4'>
      <ModalPanel/>
    </div>
  </div>
}