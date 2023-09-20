import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "1fa7a14d-5efe-4981-abcf-4a3887852221"
    }
}

export const todolistsAPI = {
    getTodolists() {
        const promise = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
        return promise
    },
    createTodolists(title: string) {
        const promise = axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: title}, settings)
        return promise
    },
    deleteTodolists(id: string) {
        const promise = axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {id}, settings)
        return promise
    },
    updateTodolists(title: string) {
        const promise = axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: title}, settings)
        return promise
    },
}