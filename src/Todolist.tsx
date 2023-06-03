import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType} from "./App";

type PropsType = {
    title: string;
    truck2?: number;
    tasks: Array<TaskType>
    removeTask: (idtodelete: string) => void
    changeFilter: (value: filterValuesType) => void
    addTask: (title:string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{setNewTaskTitle(e.currentTarget.value)}

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>)=>{
        if (e.ctrlKey && e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }}
    const addTaski = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('');
    }

    const onAllClickHandler = ()=>{props.changeFilter("all")}
    const onActiveClickHandler = ()=>{props.changeFilter("active")}
    const onCompletedClickHandler = ()=>{props.changeFilter("completed")}

    return (
        <div>
            <h3>{props.title}</h3>
            <h3>{props.truck2}</h3>
            <div>
                <input value = {newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTaski}
                >+</button>
            </div>
            <ul>
                {props.tasks.map((el: TaskType) => {
                    const onRemoveHandler = ()=>{
                        props.removeTask(el.id)
                    }
                    return (
                        <li key = {el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    )
                })}
                
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )

}