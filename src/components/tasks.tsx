import type { RootState } from "../TasksStore/store";
import { useSelector } from 'react-redux'
import FadeIn from 'react-fade-in';
import TaskTile from "./Task/taskTile"

export default function TasksList() {
  const tasks = useSelector((state: RootState) => state.tasks)
  const list = Object.values(tasks.list)
  return <FadeIn childClassName="w-full flex justify-center" className="flex flex-col w-[70%] items-center">
  {list.map(task => {
    if (task.isCompleted) return
    return <TaskTile key={task.id} task={task}/>
  })}
  {tasks.completedAmount > 0 ? <div className="text-lg font-semibold">Completed tasks ({tasks.completedAmount}/{tasks.tasksAmount}):</div> : null}
  {list.map(task => {
    if (!task.isCompleted) return
    return <TaskTile key={task.id} task={task}/>
  })}
  </FadeIn>
}