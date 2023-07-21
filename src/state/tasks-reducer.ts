import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId: string
}
export type Action2Type = {
    type: '2'
    title: string
}

type ActionType = RemoveTaskActionType | Action2Type

export const tasksReducer = (state: TasksStateType, action: ActionType):TasksStateType => {
    switch (action.type){
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case '2': {
            return {...state}
        }
        default:
            throw new Error('I dont understand this type' )
    }


}
 export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
     return {type: 'REMOVE-TASK', taskId, todolistId}
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