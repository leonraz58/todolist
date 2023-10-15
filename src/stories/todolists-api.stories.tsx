import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "1fa7a14d-5efe-4981-abcf-4a3887852221"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistsAPI.getTodolists()
            .then((res)=>{
            //debugger
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolists('ololo todolist')
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c710f10f-ea1f-4971-8519-7187e6254aef'
        todolistsAPI.deleteTodolists(todolistId)
            .then((res)=>{
                setState(res.data)

            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4586d6c8-df51-41e3-832b-91395fe111c0'

            todolistsAPI.updateTodolists(todolistId, "Todolist mazafaka")
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")

    const getTasks = () => {
        //const todolistId = '287e0571-d8a1-4304-8a53-387ec894e4d9'
        todolistsAPI.getTasks(todolistId)
            .then((res)=>{
                //debugger
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={"todolistId"} value={todolistId}
               onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <div><button onClick={getTasks}>getTasks</button></div>
    </div>
    </div>


}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const deleteTask = ()=>{
        todolistsAPI.deleteTasks(todolistId, taskId)
            .then((res)=>{
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"todolistId"} value={todolistId}
               onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={"taskId"} value={taskId}
               onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
        <div><button onClick={deleteTask}>x</button></div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={"todolistId"} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input placeholder={"task title"} value={taskTitle}
               onChange={(e) => {
                   setTaskTitle(e.currentTarget.value)
               }}/>
        <div>
            <button onClick={createTask}>x</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [deadLine, setDeadLine] = useState<string>("")

    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: '',
            deadline: ''
        })
            .then((res) => {
                setState(res.data)
            })
    }

return <div>
    <input placeholder={"taskId"} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
    <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
    <input placeholder={"title"} value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
    <input placeholder={"description"} value={description} onChange={(e)=>{setDescription(e.currentTarget.value)}}/>
    <input placeholder={"status"} value={status} type="number" onChange={(e)=>{setStatus(+e.currentTarget.value)}}/>
    <input placeholder={"priority"} value={priority} onChange={(e)=>{setPriority(+e.currentTarget.value)}}/>
    <button onClick={updateTask}>x</button>
</div>
}