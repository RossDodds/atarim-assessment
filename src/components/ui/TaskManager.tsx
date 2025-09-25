import { useState } from "react";
import { useTasks } from "../../hooks/task";
import { Task } from "../../types";
import { Plus } from "lucide-react";
import { TaskFormModal } from "./TaskFormModal";
import { TaskList } from "./TaskList";

export default function TaskManager() {
  const { tasks, addTask, updateTask, deleteTask, toggleCompletion } =
    useTasks();
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex justify-center space-x-6 items-center">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button
          onClick={() => {
            setSelectedTask(undefined);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded flex items-center gap-2"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>
      <TaskList
        tasks={tasks}
        onEdit={(task) => {
          setSelectedTask(task);
          setShowModal(true);
        }}
        onDelete={(id) => deleteTask(id)}
        onToggle={(id) => toggleCompletion(id)}
      />
      <TaskFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        existingTask={selectedTask}
        onSubmit={selectedTask ? updateTask : addTask}
      />
    </main>
  );
}
