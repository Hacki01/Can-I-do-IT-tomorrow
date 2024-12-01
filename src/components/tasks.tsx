interface Task {
  id: number;
  title: string;
  more: string;
}

const tasks: Task[] = [
  { id: 1, title: 'Task 1', more: 'Description 1' },
  { id: 2, title: 'Task 2', more: 'Description 2' },
]

export default function TasksList() {
  return <div className="flex flex-col">{tasks.map(e => {
    return <div className="p-6 bg-slate-400" key={e.id}>{e.title} - {e.more}</div>
  })}</div>
}