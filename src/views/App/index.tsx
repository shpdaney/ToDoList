import React from "react";
import styles from "./index.module.scss";

import {useToDoStore} from "@/data/stores/useToDoStore";
import {ImputPlus} from "@/views/components/ImputPlus";
import {ImputTask} from "@/views/components/ImputTask";

export const App: React.FC = () => {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask,
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ])

    return (
        <article className={styles.article}>
            <h1 className={styles.article__title}>To Do List</h1>
            <section
                className={styles.article__sectionInput}>
                <ImputPlus
                    onAdd={(title: string) => {
                        if (title) {
                            createTask(title)
                        }
                    }}
                />
            </section>
            <section
                className={styles.article__sectionTask}>
                {!tasks.length && (
                    <p className={styles.article__emptyText}>There is not one task.</p>
                )}
                {tasks.map(task => (
                    <ImputTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        onDone={removeTask}
                        onUpdate={updateTask}
                        onRemove={removeTask}
                    />
                ))}
            </section>
        </article>
    )
};

