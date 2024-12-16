import type { RootState } from "../../TasksStore/store";
import { useSelector } from 'react-redux';
import FadeIn from 'react-fade-in';
import TaskTile from "./taskTile";
import { useState } from "react";

function DateToString(date: Date) {
  return [date.getDate(),date.getMonth()+1].join('.');
}

export default function TasksList() {
  const [areCompletedVisible, setCompletedVisibility] = useState(false);
  const tasks = useSelector((state: RootState) => state.tasks);
  const selectedDate = tasks.selectedDate
  let list = Object.values(tasks.list);
  list = list.filter(task => DateToString(task.plannedDate) === DateToString(selectedDate))
  list = list.sort((a,b) => {
    return (a.isHighPriority === b.isHighPriority) ? 0 : a.isHighPriority ? -1 : 1;
  })

  const uncompletedTasks = list.filter(task => !task.isCompleted);
  const completedTasks = list.filter(task => task.isCompleted);

  return (
    <FadeIn childClassName="w-full flex justify-center" className="flex flex-col w-[70%] items-center">
      {uncompletedTasks.length === 0 ? 
        <div className="flex flex-col gap-2 py-20">
          <div className="text-6xl text-textGray hover:text-green-300 transition-all duration-500 font">
            Great!
          </div>
          <div className="text-lg font-semibold text-textGray">
            You have no more tasks for {DateToString(selectedDate)}
          </div>
        </div>
        :
        uncompletedTasks.map(task => {
          return <TaskTile key={task.id} task={task}/>
        })
      }
      {completedTasks.length > 0 ? (
        <div className="flex items-center gap-3 mb-2">
          <div className="text-lg font-semibold">
            Completed tasks ({completedTasks.length}/{list.length}):
          </div>
          <button
            onClick={() => setCompletedVisibility(!areCompletedVisible)}
            className="px-2 rounded-lg hover:bg-slate-200 select-none opacity-60"
          >
            {areCompletedVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      ) : null}

      {areCompletedVisible ? 
        completedTasks.map(task => (
          <TaskTile key={task.id} task={task} />
        ))
      : null}
    </FadeIn>
  );
}
