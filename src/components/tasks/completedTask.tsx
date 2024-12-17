import { removeTask, setCompleted, Task } from "@/TasksStore/Features/tasks/taskManager"
import { faCheck, faCircleExclamation, faEllipsis, faReply, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from "@nextui-org/react"
import { Key } from "react"
import { useDispatch } from "react-redux"

export default function CompletedTask(props:{task:Task}) {
  const task = props.task
  const id = task.id
  const dispatch = useDispatch()

  function doTaskAction(actionName: string | Key) {
    switch (actionName) {
      case "setUncompleted":
        dispatch(setCompleted({id, status: !task.isCompleted }))
        break;
      case "deleteTask":
        dispatch(removeTask({id}))
        break;
    }
  }

  return <div className="mb-4 p-6 rounded-2xl border-4 border-green-500 bg-elementBg w-[95%] md:w-[80%] xl:w-[60%] flex items-center gap-4 ">
    {/* Completed mark */}
    <div className='text-3xl'><FontAwesomeIcon icon={faCheck} /></div>
    {/* Priority Mark */}
    {task.isHighPriority 
    ? <Tooltip content="High priority" color='danger'>
        <FontAwesomeIcon className='text-4xl text-danger' icon={faCircleExclamation} />
      </Tooltip>
    : null}
    <div className='flex justify-between w-full'>
      <div className='flex flex-col'>
        <div className='text-2xl'>{task.title}</div>
        <div className='text-md'>{task.desc}</div>
      </div> 
      <Dropdown>
            <Tooltip content="More options">
              <div>
                <DropdownTrigger>
                    <Button variant="solid" size="lg" isIconOnly className='text-white text-2xl'><FontAwesomeIcon icon={faEllipsis} /></Button>
                </DropdownTrigger>
              </div>
            </Tooltip>
          <DropdownMenu onAction={(key) => doTaskAction(key)} aria-label="Static Actions">
            <DropdownItem key="setUncompleted" startContent={<FontAwesomeIcon icon={faReply}/>}>Set as Uncompleted</DropdownItem>
            {/* <DropdownItem key="editTask" startContent={"!"}>Edit task</DropdownItem> */}
            <DropdownItem key="deleteTask" startContent={<FontAwesomeIcon icon={faTrash}/>} className="text-danger" color="danger">
              Delete task
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
    </div>
  </div>
}