import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCaretDown, faCaretRight, faExclamation } from '@fortawesome/free-solid-svg-icons'
import type { Task } from "@/TasksStore/Features/tasks/taskManager";
import { removeTask, setCompleted, setHighPriority, updatePlannedDate } from "@/TasksStore/Features/tasks/taskManager"
import { useDispatch } from 'react-redux'
import { useState, useRef, useEffect } from 'react';
import { Button } from "@nextui-org/button";

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


export default function UncompletedTask(props:{task:Task}) {
  const task = props.task
  const dispatch = useDispatch()
  const optionsMenu = useRef<HTMLDivElement>(null)
  const [isExpanded, setExpanded] = useState(false)
  
  useEffect(() => {
    /* Hide options menu when clicked outside */
    const handleClickOutside = (e: MouseEvent) => {
      if(isExpanded && !optionsMenu.current?.contains(e.target as Node)){
        setExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])
  return <div className={`mb-4 p-6 rounded-2xl bg-elementBg w-[95%] md:w-[80%] xl:w-[60%] flex items-center gap-4 border-2 ${task.isHighPriority ? 'border-rose-600 ' : ' '}`}>
    {/* Priority Mark */}
    {task.isHighPriority 
    ? <div title='High Priority' className='relative select-none p-4  bg-rose-500 rounded-full aspect-square h-[50px] lg:h-[60px] flex justify-center items-center text-3xl text-white'>
        <FontAwesomeIcon icon={faExclamation} />
      </div>
    : null}
    <div className='flex justify-between w-full'>
      <div className='flex flex-col'>
        <div className='text-2xl'>{task.title}</div>
        <div className='text-md'>{task.desc}</div>
      </div> 
      <div className='flex gap-2 items-center'>
        {/* Is More options visible */}
      {isExpanded ? (
          <div 
            ref={optionsMenu}
            className="relative z-50 select-none p-4 bg-gray-300 hover:bg-gray-400 rounded-2xl aspect-square h-[50px] lg:h-[65px] flex justify-center items-center text-3xl"
          >
            <div className='absolute top-0 left-0 p-4 w-auto bg-gray-400 rounded-2xl'>
              <FontAwesomeIcon icon={faCaretDown} onClick={() => {setExpanded(false)}}/>
              <div className='flex flex-col gap-1 text-lg text-nowrap'>
                {/* List of options */}
                <button 
                  onClick={() => {dispatch(updatePlannedDate({id: task.id, date: addDays(task.plannedDate,1)}))}} 
                  className='p-1 rounded-md cursor-pointer hover:bg-gray-300'
                >
                  Move to the next day
                </button>
                {task.isHighPriority ? 
                  <button 
                    onClick={() => {dispatch(setHighPriority({id: task.id, status:false}))}} 
                    className='p-1 rounded-md cursor-pointer hover:bg-gray-300'
                  >
                    Set as Normal Priority
                  </button> 
                :
                  <button 
                    onClick={() => {dispatch(setHighPriority({id: task.id}))}} 
                    className='p-1 rounded-md cursor-pointer hover:bg-gray-300'
                  >
                    Set as High Priority
                  </button>
                }
                <button 
                  onClick={() => {dispatch(removeTask({id: task.id}))}} 
                  className='p-1 rounded-md cursor-pointer bg-red-500 hover:bg-red-600'
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Show more options button */
          <div 
            title='More options'  
            onClick={() => {setExpanded(true)}}
            className="relative p-4 bg-gray-300 hover:bg-gray-400 rounded-2xl aspect-square h-[50px] lg:h-[65px] flex justify-center items-center text-3xl"
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </div>
        )}
        {/* Set as completed button */}
        <Button isIconOnly onPress={() => {dispatch(setCompleted({id:task.id}))}}  className='text-white text-2xl scale-150' aria-label='Set as Completed' color='success'><FontAwesomeIcon icon={faCheck} /></Button>
      </div>
    </div>
  </div>
}