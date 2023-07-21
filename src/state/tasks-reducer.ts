import {FilterValuesType, TaskStateType, TodolistType} from "../App";
import {v1} from "uuid";

export type Action1Type = {
    type: '1',
    id: string
}
export type Action2Type = {
    type: '2'
    title: string
}

type ActionType = Action1Type | Action2Type

export const tasksReducer = (state: TaskStateType, action: ActionType):TaskStateType => {
    switch (action.type){
        case '1': {
            return {...state}
        }
        case '2': {
            return {...state}
        }
        default:
            throw new Error('I dont understand this type' )
    }


}

// export const removeTodolistsAC = (todolistId:string): RemoveTodolistActionType => {
//     return {type: "REMOVE-TODOLIST", id: todolistId}
// }
// export const addTodolistsAC = (title:string): AddTodolistActionType => {
//     return {type: "ADD-TODOLIST", title: title}
// }
//
// export const changeTodolistsAC = (id: string, title:string): ChangeTodolistTitleActionType => {
//     return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
// }
//
// export const changeTodolistsFilterAC = (id: string, filter:FilterValuesType): ChangeTodolistFilterActionType => {
//     return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
// }