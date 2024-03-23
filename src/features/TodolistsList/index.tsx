import {asyncActions as todolistsAsyncActions, slice as todolistsSlice} from './todolists-reducer'
import {asyncActions as tasksAsyncActions, slice as tasksSlice} from './tasks-reducer'
import {TodolistsList} from './TodolistsList'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistsSlice.actions
}
const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}

const todolistsReducer  = todolistsSlice.reducer
const tasksReducer  = tasksSlice.reducer

export {
    tasksActions,
    todolistsActions,
    TodolistsList,
    todolistsReducer,
    tasksReducer
}
