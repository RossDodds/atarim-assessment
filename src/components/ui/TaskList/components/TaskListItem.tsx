import { Task } from "../../../../types";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const TaskListItem = ({ task, onToggle, onDelete, onEdit }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "flex items-center p-4 border rounded-lg cursor-pointer group",
        task.completed
          ? "opacity-50 line-through bg-green-100"
          : "hover:bg-gray-100",
        task.priority === "medium",
        {
          "border-orange-300": task.priority === "medium" && !task.completed,
          "border-red-500": task.priority === "high" && !task.completed,
        }
      )}
      onClick={onToggle}
    >
      <div
        className="flex items-start gap-2 mr-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded-lg p-1 hover:bg-gray-200"
        >
          <ChevronDown
            className={clsx(
              "transition-transform",
              expanded ? "rotate-180" : ""
            )}
          />
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate whitespace-nowrap overflow-hidden">
          {task.title}
        </div>
        {expanded && (
          <div className="mt-1 text-sm text-gray-600">
            <p>{task.description || "No description"}</p>
            {task.dueDate && (
              <p className="text-xs text-gray-500 mt-1">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onEdit} className="rounded-lg p-2 hover:bg-gray-200">
          <Pencil size={18} />
        </button>
        <button onClick={onDelete} className="rounded-lg p-2 hover:bg-gray-200">
          <Trash size={18} className="text-red-500" />
        </button>
      </div>
    </motion.li>
  );
};
