import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm is rendering...")
    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            props.addItem(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    const onAddTaskHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
        } else {
            props.addItem(newTaskTitle)
            setNewTaskTitle('');
        }
    }

    return (
        <div>
            <TextField value={newTaskTitle}
                       variant={"outlined"}
                       label={"type value"}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   //className={error ? 'error' : ''}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={onAddTaskHandler}  color={"primary"}
            ><ControlPoint/>
            </IconButton>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    )

})