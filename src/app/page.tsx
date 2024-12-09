'use client';

import TasksList from "@/components/tasks"
import Panel from "@/components/panel";
export default function App() {
  return <main className="flex">
    <TasksList />
    <Panel />
  </main>
}