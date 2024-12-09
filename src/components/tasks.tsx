import type { RootState } from "../TasksStore/store";
import { useSelector } from 'react-redux'
import FadeIn from 'react-fade-in';
import TaskTile from "./Task/taskTile"
import { useState } from "react";

export default function TasksList() {
  const [areCompletedVisible,setCompletedVisibility] = useState(false)
  const tasks = useSelector((state: RootState) => state.tasks)
  const list = Object.values(tasks.list)
  return <FadeIn childClassName="w-full flex justify-center" className="flex flex-col w-[70%] items-center">
  {list.map(task => {
    if (task.isCompleted) return
    return <TaskTile key={task.id} task={task}/>
  })}
  {tasks.completedAmount > 0 ? 
    <div className="flex items-center gap-3 mb-2"><div className="text-lg font-semibold">
      Completed tasks ({tasks.completedAmount}/{tasks.tasksAmount}):
      </div>
      <div onClick={() => {setCompletedVisibility(!areCompletedVisible)}} className="px-2 rounded-lg hover:bg-slate-200 select-none opacity-60">{areCompletedVisible ? 'Hide' : 'Show'}</div> 
    </div> 
  : null}
  {areCompletedVisible ? list.map(task => {
    if (!task.isCompleted) return
    return <TaskTile key={task.id} task={task}/>
  }): null}
  </FadeIn>
}