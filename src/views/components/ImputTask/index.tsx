import React, {useEffect, useRef, useState} from "react";
import styles from "./index.module.scss";

interface IImputTaskProps {
    id: string
    title: string
    onDone: (id: string) => void;
    onUpdate: (id: string, title: string) => void;
    onRemove: (id: string) => void;
}

export const ImputTask: React.FC<IImputTaskProps> = (
    {
        id,
        title,
        onDone,
        onUpdate,
        onRemove,
    }) => {

    const [checked, setChecked] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(title)
    const editTitleInputRef = useRef<HTMLInputElement>(null)

    useEffect(()=> {
        if (editMode) {
            editTitleInputRef?.current?.focus()
        }
    }, [editMode])

    return (
        <div className={styles.ImputTask}>
            <div className={styles.ImputTask__label}>
                <input
                    type={`checkbox`}
                    checked={checked}
                    disabled={editMode}
                    className={styles.ImputTask__checkbox}
                    onChange={(event) => {
                        setChecked(event.target.checked)
                        if (event.target.checked) {
                            setTimeout(() => {
                                onDone(id)
                            }, 300)
                        }
                    }}
                />

                {/* Title Task || Input Title Task*/}
                {editMode ?
                    <input
                        type={`text`}
                        value={inputValue}
                        className={styles.ImputTask__input}
                        ref={editTitleInputRef}
                        onChange={(event) => {
                            setInputValue(event.target.value)
                        }}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                onUpdate(id, inputValue)
                                setEditMode(!editMode)
                            }
                        }}
                    /> :
                    <p className={styles.ImputTask__title}>{title}</p>
                }
            </div>

            {/* Button Save || Button Edit*/}
            {editMode ? (
                <button
                    aria-label={`Save`}
                    className={`${styles.ImputTask__button} ${styles.ImputTask__buttonSave}`}
                    onClick={() => {
                        onUpdate(id, inputValue)
                        setEditMode(!editMode)
                    }}
                />
            ) : (
                <button
                    aria-label={`Edit`}
                    className={`${styles.ImputTask__button} ${styles.ImputTask__buttonEdit}`}
                    onClick={() => {
                        setEditMode(!editMode)
                    }}
                />
            )}

            <button
                aria-label={`Remove`}
                className={`${styles.ImputTask__button} ${styles.ImputTask__buttonRemove}`}
                onClick={() => {
                    if (confirm('Are you sure?')) {
                        onRemove(id)
                    }
                }}
            />
        </div>
    )
};

