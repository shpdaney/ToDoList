import React, {useCallback, useState} from "react";
import styles from "./index.module.scss";

interface IImputPlusProps {
    onAdd: (title: string) => void;
}

export const ImputPlus: React.FC<IImputPlusProps> = ({onAdd}) => {
    const [inputValue, setInputValue] = useState('')
    const addTask = useCallback(() => {
        onAdd(inputValue)
        setInputValue('')
    }, [inputValue, onAdd])

    return (
        <div className={styles.ImputPlus}>
            <input
                type='text'
                placeholder={`Type here...`}
                className={styles.ImputPlus__input}
                value={inputValue}
                onChange={event => {
                    setInputValue(event.target.value)
                }}
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        addTask()
                    }
                }}
            />
            <button
                aria-label={`Add`}
                className={styles.ImputPlus__button}
                onClick={addTask}
            />
        </div>
    )
};

