import { create } from 'zustand'
// import { devtools, persist } from 'zustand/middleware'

import {generateId} from "@/data/helpers";

interface ITask {
    id: string | null;
    title: string | null;
    createdAt: number | null;
}

interface IToDoStore {
    tasks: Array<ITask>;
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

export const useToDoStore = create<IToDoStore>((set, get) => ({
    tasks: [],
    createTask: (title: string) => {
        const {tasks} = get()
        const newTask = {
            id: generateId(),
            title: title,
            createdAt: Date.now(),
        }

        set({
            tasks: [newTask, ...tasks]
        })
    },
    updateTask: (id: string, title: string) => {
        const {tasks} = get()
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        })
    },
    removeTask: (id: string) => {
        const {tasks} = get()
        set({
            tasks: tasks.filter(task => task.id !== id)
        })
    },
}))
