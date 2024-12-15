import type { Task } from "@/TasksStore/Features/tasks/taskManager";
import CompletedTask from "./completedTask";
import UncompletedTask from "./unCompletedTask";

export default function TaskTile(props:{task:Task}) {
  const task = props.task
  if (task.isCompleted) return <CompletedTask task={props.task}/>
  return <UncompletedTask task={props.task}/>
}
