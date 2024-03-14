import axios from "axios";
import {GetTasksResponse, LoginParamsType, ResponseType, TaskType, TodolistType, UpdateTaskType} from "./types";


// const settings = {
//     withCredentials: true,
//     headers: {
//         "API-KEY": "1fa7a14d-5efe-4981-abcf-4a3887852221"
//     }
// }

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "1fa7a14d-5efe-4981-abcf-4a3887852221"
    }
})

//api
export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<TodolistType[]>("todo-lists")
        return promise
    },
    createTodolists(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>("todo-lists", {title: title})
        return promise
    },
    deleteTodolists(id: string) {
        const promise = instance.delete<ResponseType>("todo-lists/"+id)
        return promise
    },
    updateTodolists(id: string, title: string) {
        const promise = instance.put<ResponseType>("todo-lists/" +id, {title: title})
        return promise
    },
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    deleteTasks(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    createTask(todolistId: string, taskTitle: string) {
        const promise = instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/`, {title: taskTitle})
        return promise
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        const promise = instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
        return promise
    },
}

export const authAPI = {
    login (data: LoginParamsType) {
        const promise = instance.post<ResponseType<{userId?: number}>>("auth/login", data)
        return promise
    },
    logout () {
        const promise = instance.delete<ResponseType<{userId?: number}>>("auth/login")
        return promise
    },
    me () {
        const promise =  instance.get<ResponseType<{id: number, email: string, login: string}>>("auth/me")
        return promise
    }
}

