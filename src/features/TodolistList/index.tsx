import {asyncActions as tasksAsyncActions} from './tasks-reducer'
import {slice} from "./todolists-reducer";
import {asyncActions as todolistsAsyncActions} from "./todolists-reducer";
import {TodolistList} from "./TodolistList";

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}


const taskActions = {
    ...tasksAsyncActions,
    ...slice.actions
}

export {
    todolistsActions,
    taskActions,
    TodolistList
}