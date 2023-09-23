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
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todolistId = 'c710f10f-ea1f-4971-8519-7187e6254aef'
        todolistsAPI.getTasks(todolistId)
            .then((res)=>{
                //debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todolistId = 'c710f10f-ea1f-4971-8519-7187e6254aef'
        const taskId = '555'
        todolistsAPI.deleteTasks(todolistId, taskId)
            .then((res)=>{
                //debugger
                setState(res.data)
            })
    }, [])

    const deleteTask = ()=>{

    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={"taskId"} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
        <div><button onClick={deleteTask}></button></div>
    </div>

}