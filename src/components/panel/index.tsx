import { useDispatch } from 'react-redux'
import { addTask } from "@/TasksStore/Features/tasks/taskManager";
import {Input, Textarea} from "@nextui-org/input";
import React, {  useState } from 'react';
export default function Panel() {
  const dispatch = useDispatch()
  const [title,updateTitle] = useState('')
  const [desc,updateDesc] = useState('')
  function handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
    updateTitle(e.currentTarget.value)
  }
  function handleDescChange(e: React.FormEvent<HTMLInputElement>) {
    updateDesc(e.currentTarget.value)
  }
  function handleAdd() {
    if (title.length < 3) return alert('Title must be at least 3 characters long')
    if (desc.length > 300) return alert('Description is too long')
    dispatch(addTask({title,desc}))
    updateTitle('')
    updateDesc('')
  }
  return <div className="w-[30%] h-full flex justify-center">
    <div className="w-[90%] p-4 rounded-3xl bg-elementBg flex flex-col items-center gap-3">
      <Input label="Title" onChange={handleTitleChange} isRequired value={title} placeholder="Enter task title" variant='faded'/>
      <Textarea label="Description" onChange={handleDescChange} maxRows={3} variant='faded'/>
      <button className="p-2 bg-green-400 hover:bg-green-500 text-white text-xl font-light rounded-xl" onClick={handleAdd}>Add</button>
    </div>
  </div>
}