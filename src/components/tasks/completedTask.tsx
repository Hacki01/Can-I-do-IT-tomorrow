import { setCompleted, Task } from "@/TasksStore/Features/tasks/taskManager"
import { faCaretDown, faCaretRight, faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"

export default function CompletedTask(props:{task:Task}) {
  const task = props.task
  const dispatch = useDispatch()
  const optionsMenu = useRef<HTMLDivElement>(null)
  const [isExpanded, setExpanded] = useState(false)
  
  useEffect(() => {
    /* Hide options menu on click outside */
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

  return <div className="mb-4 p-6 rounded-2xl border-4 border-green-500 bg-elementBg w-[95%] md:w-[80%] xl:w-[60%] flex items-center gap-4 ">
    {/* Completed mark */}
    <div className='text-3xl'><FontAwesomeIcon icon={faCheck} /></div>
    {/* Priority mark */}
    {task.isHighPriority 
    ? <div className='text-3xl'><FontAwesomeIcon icon={faExclamation} /></div>
    : null}
    <div className='flex justify-between w-full'>
      <div className='flex flex-col'>
        <div className='text-2xl'>{task.title}</div>
        <div className='text-md'>{task.desc}</div>
      </div> 
      {/* Is more options visible */}
      {isExpanded ? (
        <div 
          ref={optionsMenu}
          className="relative select-none p-4 bg-gray-300 hover:bg-gray-400 rounded-2xl aspect-square h-[50px] lg:h-[65px] flex justify-center items-center text-3xl"
        >
          <div className='absolute top-0 left-0 p-4 w-auto bg-gray-400 rounded-2xl'>
            <FontAwesomeIcon icon={faCaretDown} onClick={() => {setExpanded(false)}}/>
            <div className='flex flex-col gap-1 text-lg text-nowrap'>
              {/* List of options */}
              <button 
                onClick={() => {dispatch(setCompleted({id:task.id, status:false}))}} 
                className='p-1 rounded-md cursor-pointer hover:bg-gray-300'
              >
                Set as Uncompleted
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
    </div>
  </div>
}