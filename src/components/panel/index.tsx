import { useDispatch } from 'react-redux'
import { addTask } from "@/TasksStore/Features/tasks/taskManager";
import React, {  useState } from 'react';
export default function Panel() {
  const dispatch = useDispatch()
  const [title,updateTitle] = useState('')
  const [desc,updateDesc] = useState('')
  function handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
    updateTitle(e.currentTarget.value)
  }
  function handleDescChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    updateDesc(e.target.value)
  }
  function handleAdd() {
    if (title.length < 5) {
      alert('Title must be at least 5 characters long')
      return;
    }
    dispatch(addTask({title,desc}))
    updateTitle('')
    updateDesc('')
  }
  return <div className="w-[30%] h-full flex justify-center">
    <div className="w-[90%] p-4 rounded-3xl bg-[#f5f6fa] flex flex-col items-center gap-3">
      <input type="text" onChange={handleTitleChange} value={title} placeholder="Title" maxLength={70} className="w-full p-2 text-xl rounded-xl outline-none" />
      <textarea placeholder="Description" onChange={handleDescChange}  value={desc} rows={4} maxLength={200} className="w-full resize-none p-2 text-md rounded-xl outline-none" />
      <button className="p-2 bg-green-400 hover:bg-green-500 text-white text-xl font-light rounded-xl" onClick={handleAdd}>Add</button>
    </div>
  </div>
}