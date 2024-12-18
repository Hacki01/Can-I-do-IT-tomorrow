import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEllipsis, faCircleExclamation, faTrash, faCircleRight, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import type { Task } from "@/TasksStore/Features/tasks/taskManager";
import { removeTask, setCompleted, setHighPriority, updatePlannedDate } from "@/TasksStore/Features/tasks/taskManager"
import { useDispatch } from 'react-redux'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {Tooltip} from "@nextui-org/tooltip";
import { Key } from 'react';

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}



export default function UncompletedTask(props:{task:Task}) {
  const task = props.task
  const id = task.id
  const dispatch = useDispatch()

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
    }
  }

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
            <DropdownItem key="updatePlannedDate" startContent={<FontAwesomeIcon icon={faCircleRight}/>}>Move to the next day</DropdownItem>
            {/* <DropdownItem key="editTask" startContent={"!"}>Edit task</DropdownItem> */}
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