import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "1fa7a14d-5efe-4981-abcf-4a3887852221"
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

// type CreateTodolistResponseType = {
//     resultCode: number
//     massages: Array<string>
//     data: {
//         item: TodolistType
//     }
// }
//
// type DeleteUpdateTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>
//     data: {}
// }

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export const todolistsAPI = {
    getTodolists() {
        const promise = axios.get<TodolistType[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
        return promise
    },
    createTodolists(title: string) {
        const promise = axios.post<ResponseType<{item: TodolistType}>>("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: title}, settings)
        return promise
    },
    deleteTodolists(id: string) {
        const promise = axios.delete<ResponseType<{}>>("https://social-network.samuraijs.com/api/1.1/todo-lists/"+id, settings)
        return promise
    },
    updateTodolists(id: string, title: string) {
        const promise = axios.put<ResponseType<{}>>("https://social-network.samuraijs.com/api/1.1/todo-lists/" +id, {title: title}, settings)
        return promise
    },
}