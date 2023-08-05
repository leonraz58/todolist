import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo( (props: TaskPropsType) => {
    const dispatch = useDispatch()
    const onRemoveHandler = useCallback( () => {
        const action = removeTaskAC(props.task.id, props.todolistId)
        dispatch(action)
    },[props.task.id])
    const onChangeStatusHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        const action = changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId)
        dispatch(action)
    },[props.task.id])

    const onChangeTitleHandler = useCallback( (newValue: string) => {
        //props.changeTaskTitle(el.id, newValue, props.id)
        const action = changeTaskTitleAC(props.task.id, newValue, props.todolistId)
        dispatch(action)
    },[props.task.id])

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.task.isDone}
                onChange={onChangeStatusHandler}
            />
            {/*<span>{el.title}</span>*/}
            <EditableSpan title={props.task.title} onChangeTask={onChangeTitleHandler}/>
            {/*<button onClick={onRemoveHandler}>x</button>*/}
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})