import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    title: string;
    tasks: Array<TaskType>
    removeTask: (idtodelete: string, todolistId:string) => void
    changeFilter: (value: filterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter:filterValuesType
    removeTodolist:(todolistId: string) => void
    changeTaskTitle:(taskId: string, newTitle:string, todolistId: string) => void
    changeTodolistTitle:(id: string, newTitle: string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle('');
        }
    }
    const onAddTaskHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
        } else {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle('');
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle:string) =>{
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} onChangeTask={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>



            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((el: TaskType) => {
                    const onRemoveHandler = () => {
                        props.removeTask(el.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(el.id, newValue, props.id)
                    }

                    return (
                        <li key={el.id} className={el.isDone?"is-done":""}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={onChangeStatusHandler}
                            />
                            {/*<span>{el.title}</span>*/}
                            <EditableSpan title={el.title} onChangeTask={onChangeTitleHandler}/>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button className={props.filter==='all'? "active-filter":""}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter==='active'? "active-filter":""}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter==='completed'? "active-filter":""}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

