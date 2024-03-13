import {asyncActions as tasksAsyncActions} from './tasks-reducer'
import {slice as todolistsSlice} from "./todolists-reducer";
import {asyncActions as todolistsAsyncActions} from "./todolists-reducer";
import {TodolistList} from "./TodolistList";
import {slice as tasksSlice} from './tasks-reducer'
const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistsSlice.actions
}

const todolistsReducer = todolistsSlice.reducer
const tasksReducer = tasksSlice.reducer

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}

export {
    todolistsActions,
    tasksActions,
    TodolistList,
    todolistsReducer,
    tasksReducer
}