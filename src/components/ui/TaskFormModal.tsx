import * as Dialog from "@radix-ui/react-dialog";
import { Task } from "../../types";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type FormErrors = {
  title?: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  existingTask?: Task;
}

export const TaskFormModal = ({
  open,
  onClose,
  onSubmit,
  existingTask,
}: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description || "");
      setPriority(existingTask.priority);
      setDueDate(existingTask.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("low");
      setDueDate("");
    }
  }, [existingTask]);

  const handleSubmit = () => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const task: Task = {
      id: existingTask?.id || Date.now().toString(),
      title,
      description,
      priority,
      dueDate,
      completed: existingTask?.completed || false,
      createdAt: existingTask?.createdAt || new Date().toISOString(),
    };

    onSubmit(task);
    setTitle("");
    setDescription("");
    setPriority("low");
    setDueDate("");
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <AnimatePresence>
          {open && (
            <div
              className="fixed inset-0 flex items-center justify-center px-4"
              aria-modal="true"
              role="dialog"
            >
              <Dialog.Content asChild forceMount>
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <Dialog.Title className="text-lg font-semibold">
                      {existingTask ? "Edit Task" : "New Task"}
                    </Dialog.Title>
                    <button onClick={onClose} aria-label="Close">
                      <X />
                    </button>
                  </div>

                  <div>
                    <input
                      placeholder="Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (errors.title) {
                          setErrors((prev) => ({ ...prev, title: undefined }));
                        }
                      }}
                      className={`w-full border px-3 py-2 rounded ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
                  </div>

                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) =>
                        setPriority(e.target.value as "low" | "medium" | "high")
                      }
                      className="w-full border px-3 py-2 rounded"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due date
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      {existingTask ? "Update" : "Add"} Task
                    </button>
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
