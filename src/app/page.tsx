'use client';

import TasksList from "@/components/tasks"
import Panel from "@/components/panel";
export default function App() {
  return <main className="flex  max-md:flex-col-reverse">
    <TasksList />
    <Panel />
  </main>
}