import { useState } from "react";
import { Task } from "../types";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

  const updateTask = (updatedTask: Task) =>
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleCompletion = (id: string) =>
    setTasks((prev) =>
      prev
        .map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        .sort((a, b) => Number(a.completed) - Number(b.completed))
    );

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleCompletion,
  };
};
