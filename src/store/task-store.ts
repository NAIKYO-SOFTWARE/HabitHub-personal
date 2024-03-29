import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Task {
  key?: string;
  label: string;
  description: string;
  color: string;
  icon: string;
  cycle?: string;
  repeat: boolean;
  tags: Array<string>;
  createdAt: Date;
}

interface ITaskState {
  tasks: Array<Task>;
  addNewTask: (task: Task) => void;
  removeTask: (key: string) => void;
}

export const useTaskStore = create<ITaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      addNewTask: (task: Task) => {
        const key = Math.random().toString(16).slice(2);
        const newTask = { ...task, key };
        set(() => ({ tasks: [...get().tasks, newTask] }));
        toast("Add new task successfully", { type: "success" });
      },
      removeTask: (key: string) => {
        const tasks = get().tasks.filter((task) => task.key !== key);
        set(() => ({ tasks: tasks }));
        toast("Remove task successfully", { type: "success" });
      },
    }),
    {
      name: "tasks",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
