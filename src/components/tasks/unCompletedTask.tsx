import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEllipsis, faCircleExclamation, faTrash, faCircleRight } from '@fortawesome/free-solid-svg-icons'
import type { Task } from "@/TasksStore/Features/tasks/taskManager";
import { removeTask, setCompleted, setHighPriority, updatePlannedDate } from "@/TasksStore/Features/tasks/taskManager"
import { useDispatch } from 'react-redux'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
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

  return <div className={`mb-4 p-6 rounded-2xl bg-elementBg w-[95%] md:w-[80%] xl:w-[60%] flex items-center gap-4 border-2 ${task.isHighPriority ? 'border-danger ' : ' '}`}>
    {/* Priority Mark */}
    {task.isHighPriority 
    ? <FontAwesomeIcon className='text-5xl text-danger' icon={faCircleExclamation} />
    : null}
    <div className='flex justify-between w-full'>
      <div className='flex flex-col'>
        <div className='text-2xl'>{task.title}</div>
        <div className='text-md'>{task.desc}</div>
      </div> 
      <div className='flex items-center gap-2'>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="solid" size="lg" isIconOnly className='text-white text-2xl'><FontAwesomeIcon icon={faEllipsis} /></Button>
          </DropdownTrigger>
          <DropdownMenu onAction={(key) => doTaskAction(key)} aria-label="Static Actions">
            <DropdownItem key="changePriority"  startContent={<FontAwesomeIcon icon={faCircleExclamation}/>} className="text-warning">Set as {task.isHighPriority ? "Normal Priority" : "High Priority"}</DropdownItem>
            <DropdownItem key="updatePlannedDate" startContent={<FontAwesomeIcon icon={faCircleRight}/>}>Move to the next day</DropdownItem>
            {/* <DropdownItem key="editTask" startContent={"!"}>Edit task</DropdownItem> */}
            <DropdownItem key="deleteTask" startContent={<FontAwesomeIcon icon={faTrash}/>} className="text-danger" color="danger">
              Delete task
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button size="lg" isIconOnly onPress={() => {doTaskAction("completeTask")}}  className='text-white text-2xl' aria-label='Set as Completed' color='success'><FontAwesomeIcon icon={faCheck} /></Button>
      </div>
    </div>
  </div>
}