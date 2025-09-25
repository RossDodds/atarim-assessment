import { useState, useEffect } from "react";
import { Task } from "../types";

const TASKS_KEY = "atarim_tasks";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(TASKS_KEY);
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

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
