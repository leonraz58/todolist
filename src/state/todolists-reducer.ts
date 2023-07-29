import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";

export let todolistId1 = v1()
export let todolistId2 = v1()

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
type ActionType = RemoveTodolistActionType | AddTodolistActionType |  ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const removeTodolistAC = (todolistId:string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const addTodolistAC = (title:string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title, todolistId: v1()}
}

export const changeTodolistsAC = (id: string, title:string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}

export const changeTodolistsFilterAC = (id: string, filter:FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}

const initialState: Array<TodolistType> = [
    {id: todolistId1, title: "What to learn", filter: "active"},
    {id: todolistId2, title: "What to buy", filter: "completed"}
]

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state,{
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
                //setTodolists([...todolists])
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
                //setTodolists([...todolists])
            }
            return [...state]
        }

        default:
            //throw new Error('I don\'t understand this type')
            return state
    }
}
