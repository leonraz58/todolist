import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }

        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        default:
            throw new Error('I dont understand this type')
    }


}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
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