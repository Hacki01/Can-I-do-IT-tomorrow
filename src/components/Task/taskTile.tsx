import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCaretDown,faCaretRight } from '@fortawesome/free-solid-svg-icons'

import type { Task } from "@/TasksStore/Features/tasks/taskManager";
import { setCompleted } from "@/TasksStore/Features/tasks/taskManager"

import { useDispatch } from 'react-redux'
import { useState, useRef } from 'react';

function CompletedTask(props:{task:Task}) {
  const task = props.task
  const dispatch = useDispatch()
  const optionsMenu = useRef<HTMLDivElement>(null)
  const [isExpanded,setExpanded] = useState(false)
  document.addEventListener('mousedown',(e) => {
    if(isExpanded && !optionsMenu.current?.contains(e.target as Node)){
      setExpanded(false)
    }
  })
  return <div className="mb-4 p-6 rounded-2xl border-4 border-green-500 bg-[#f5f6fa] w-[95%] md:w-[80%] xl:w-[60%] flex items-center gap-4 ">
    <div className='text-3xl'><FontAwesomeIcon icon={faCheck} /></div>
    <div className='flex justify-between w-full'>
      <div className='flex flex-col'>
        <div className='text-2xl'>{task.title}</div>
        <div className='text-md'>{task.desc}</div>
      </div> 
      {isExpanded ? <div ref={optionsMenu}
      className="relative select-none p-4 bg-gray-300 hover:bg-gray-400 rounded-2xl aspect-square h-[50px] lg:h-[65px] flex justify-center items-center text-3xl">
        <div className='absolute top-0 left-0 p-4 w-auto bg-gray-400 rounded-2xl'>
          <FontAwesomeIcon icon={faCaretDown} onClick={() => {setExpanded(false)}}/>
          <div className='flex flex-col gap-1 text-lg text-nowrap'>
            <button onClick={() => {dispatch(setCompleted({id:task.id, status:false}))}} className='p-1 rounded-md cursor-pointer hover:bg-gray-300'>Set as Uncompleted</button>
          </div>
        </div>
      </div>
      : <div title='More options'  onClick={() => {setExpanded(true)}}
      className="relative p-4 bg-gray-300 hover:bg-gray-400 rounded-2xl aspect-square h-[50px] lg:h-[65px] flex justify-center items-center text-3xl">
        <FontAwesomeIcon icon={faCaretRight} />
      </div>
      }
    </div>
  </div>
}

function UncompletedTask(props:{task:Task}) {
  const task = props.task
  const dispatch = useDispatch()
  return <div className="mb-4 p-6 rounded-2xl bg-[#f5f6fa] w-[95%] md:w-[80%] xl:w-[60%] flex justify-between">
    <div className='flex flex-col'>
      <div className='text-2xl'>{task.title}</div>
      <div className='text-md'>{task.desc}</div>
    </div> 
    <div className='flex gap-2'>
      <button title='More options' onClick={() => {}} 
        className="p-4 bg-gray-300 hover:bg-gray-400 rounded-2xl aspect-square h-[50px] lg:h-[65px] flex justify-center items-center text-3xl ">
        <FontAwesomeIcon icon={faCaretDown} />
      </button>
      <button title='Set as Completed!' onClick={() => {dispatch(setCompleted({id:task.id}))}} 
        className="p-4 bg-green-400 hover:bg-green-500 rounded-2xl aspect-square h-[50px] lg:h-[65px] flex justify-center items-center text-3xl text-white">
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  </div>
}

export default function TaskTile(props:{task:Task}) {
  const task = props.task
  if (task.isCompleted) return <CompletedTask task={props.task}/>
  return <UncompletedTask task={props.task}/>
}