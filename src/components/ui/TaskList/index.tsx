import { TaskListItem } from "./components/TaskListItem";
import { Task } from "../../../types";
import { AnimatePresence } from "framer-motion";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export const TaskList = ({ tasks, onEdit, onDelete, onToggle }: Props) => {
  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
            onToggle={() => onToggle(task.id)}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
};
