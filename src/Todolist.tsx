import React, {useState} from "react";
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
    return (
        <div>
            <h3>{props.title}</h3>
            <h3>{props.truck2}</h3>
            <div>
                <input value = {newTaskTitle} onChange={(e)=>{setNewTaskTitle(e.currentTarget.value)}}></input>
                <button onClick={()=>{props.addTask(newTaskTitle)}}>+</button>
            </div>
            <ul>
                {props.tasks.map((el: TaskType) => {
                    return (
                        <li key = {el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={()=>{props.removeTask(el.id)}}>x</button>
                        </li>
                    )
                })}
                
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter("all")}}>All</button>
                <button onClick={()=>{props.changeFilter("active")}}>Active</button>
                <button onClick={()=>{props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )

}