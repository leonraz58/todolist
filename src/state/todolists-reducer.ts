import {todolistsAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, SetStatusActionType} from "./app-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        }
        default:
            return state;
    }
}

//actions
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists: todolists} as const
}
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const
}


//thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then((res)=>{
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.deleteTodolists(todolistId)
            .then((res)=>{
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolists (title)
            .then((res)=>{
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.updateTodolists(id, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}

//types

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>