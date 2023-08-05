import {FilterValuesType, TasksStateType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";

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

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {
    [todolistId1]:
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Python", isDone: false}
        ],
    [todolistId2]:
        [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},

        ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
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
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            return stateCopy
        }

        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            stateCopy[action.todolistId] = [...tasks]
            return stateCopy
        }

        case "ADD-TODOLIST" : {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
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

