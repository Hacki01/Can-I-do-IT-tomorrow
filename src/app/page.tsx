'use client';

import TasksList from "@/components/Tasks"
import Panel from "@/components/panel";
export default function App() {
  return <main className="flex">
    <TasksList />
    <Panel />
  </main>
}