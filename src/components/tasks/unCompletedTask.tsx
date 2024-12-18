import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEllipsis, faCircleExclamation, faTrash, faCircleRight, faClock, faLocationDot, faPencil } from '@fortawesome/free-solid-svg-icons'
import { Task, editTask } from "@/TasksStore/Features/tasks/taskManager";
import { removeTask, setCompleted, setHighPriority, updatePlannedDate } from "@/TasksStore/Features/tasks/taskManager"
import { useDispatch } from 'react-redux'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Form, Input, Textarea, TimeInput, Checkbox} from "@nextui-org/react";
import {Tooltip} from "@nextui-org/tooltip";
import { FormEvent, Key, useState } from 'react';
import { Time } from '@internationalized/date';
import React from 'react';

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function EditTask(props:{task:Task, doTaskAction: (actionName:string) => void }) {
  const dispatch = useDispatch()
  const { task, doTaskAction } = props
  const time = [
    parseInt(task.time?.split(":")[0] as string),
    parseInt(task.time?.split(":")[1] as string)
  ]
  function onSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const isHighPriority= formData.isHighPriority === undefined ? false : true
      const data = {...formData, id: task.id, isHighPriority } as {
        id: number
        title:string
        desc?:string
        isHighPriority?:boolean
        location?: string
        time?: string
      }
      data.time = data.time?.slice(0,5)
      if (!data.title) return
      dispatch(editTask(data))
      doTaskAction("editTask")
    }
  //render edit form
  return <Form onSubmit={onSubmit} className="mb-4 px-6 py-2 min-h-30 rounded-2xl bg-elementBg w-[95%] md:w-[80%] xl:w-[60%] border-2 border-warning">
    <div className='flex items-center gap-4 w-full'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-col gap-2'>
            <Input defaultValue={task.title} validate={(value) => {
              if (value.length < 3) {
                return "Title must be at least 3 characters long";
              }
              if (value.length > 100) {
                return "Title is too long";
              }
            }} label="Title" name="title" type='title' isRequired variant="faded"/>
            <Textarea defaultValue={task.desc} validate={(value) => {
          if (value.length > 300) {
            return "Description is too long";
          }
        }} label="Description" name="desc" type='description' maxRows={3} variant='faded'/>
          </div>
          <div className='text-sm text-gray-500 flex gap-2 font-medium'>
            <Input defaultValue={task.location as string} validate={(value) => {
                  if (value.length > 50) {
                    return "Location is too long";
                  }
                }} label="Location" name="location" variant="faded" type='location'/>
            <TimeInput defaultValue={time[0] ? new Time(time[0],time[1]) : null} hourCycle={24} label="Time" name="time"  variant='faded' className='w-min'/>
          </div>
        </div> 
      </div>
      <div className='flex flex-col justify-around h-full'>
        <Checkbox className='text-nowrap' color='danger' name='isHighPriority' defaultSelected={task.isHighPriority}>High Priority</Checkbox>
        <div className="flex flex-col gap-2">
          <Button type='submit' color='success'>Save</Button>
          <Button variant="ghost" color='danger' onPress={() => {doTaskAction("editTask")}}>Cancel</Button>
        </div>
      </div>
    </div>
  </Form>
}

export default function UncompletedTask(props:{task:Task}) {
  const task = props.task
  const id = task.id
  const dispatch = useDispatch()
  const [isEditingEnabled,setEditingEnabled] = useState(false)

  function doTaskAction(actionName: string | Key) {
    switch (actionName) {
      case "changePriority":
        dispatch(setHighPriority({id, status: !task.isHighPriority }))
        break;
      case "deleteTask":
        dispatch(removeTask({id}))
        break;
      case "completeTask":
        dispatch(setCompleted({id, status:true}))
        break;
      case "updatePlannedDate":
        dispatch(updatePlannedDate({id, date: addDays(task.plannedDate, 1)}))
        break;
      case "editTask":
        //open edit form
        setEditingEnabled(!isEditingEnabled)
        break;
    }
  }

  if (isEditingEnabled) return <EditTask task={task} doTaskAction={doTaskAction}/>

  return <div className={`mb-4 px-6 py-2 min-h-20 rounded-2xl bg-elementBg w-[95%] md:w-[80%] xl:w-[60%] flex items-center gap-4 border-2  ${task.isHighPriority ? 'border-danger ' : ' '}`}>
    {/* Priority Mark */}
    {task.isHighPriority 
    ? <Tooltip content="High priority" color='danger'>
        <FontAwesomeIcon className='text-4xl text-danger' icon={faCircleExclamation} />
      </Tooltip>
    : null}
    <div className='flex justify-between items-center w-full'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <div className='text-2xl'>{task.title}</div>
          <div className='text-md pl-1'>{task.desc}</div>
        </div>
        <div className='text-sm text-gray-500 flex gap-2 font-medium'>
          {task.time ? <div className='flex gap-1 items-center'><FontAwesomeIcon icon={faClock} />{task.time}</div> : null}
          {task.location ? <div className='flex gap-1 items-center'><FontAwesomeIcon icon={faLocationDot} />{task.location}</div> : null}
        </div>
      </div> 
      <div className='flex items-center gap-2'>
        <Dropdown>
            <Tooltip content="More options">
              <div>
                <DropdownTrigger>
                    <Button variant="solid" size="lg" isIconOnly className='text-white text-2xl'><FontAwesomeIcon icon={faEllipsis} /></Button>
                </DropdownTrigger>
              </div>
            </Tooltip>
          <DropdownMenu onAction={(key) => doTaskAction(key)} aria-label="Static Actions">
            <DropdownItem key="changePriority"  startContent={<FontAwesomeIcon icon={faCircleExclamation}/>} className="text-warning">Set as {task.isHighPriority ? "Normal Priority" : "High Priority"}</DropdownItem>
            <DropdownItem key="editTask" startContent={<FontAwesomeIcon icon={faPencil}/>}>Edit task</DropdownItem>
            <DropdownItem key="updatePlannedDate" startContent={<FontAwesomeIcon icon={faCircleRight}/>}>Move to the next day</DropdownItem>
            <DropdownItem key="deleteTask" startContent={<FontAwesomeIcon icon={faTrash}/>} className="text-danger" color="danger">
              Delete task
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Tooltip content="Set as completed!" color='success'>
          <Button size="lg" isIconOnly onPress={() => {doTaskAction("completeTask")}}  className='text-white text-2xl' aria-label='Set as Completed' color='success'><FontAwesomeIcon icon={faCheck} /></Button>
        </Tooltip>
      </div>
    </div>
  </div>
}