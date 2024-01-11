import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {TasksStateType} from '../App';
import {TaskType, todolistsAPI, UpdateTaskType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppErrorAC, SetErrorActionType, setAppStatusAC, SetStatusActionType} from "./app-reducer";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType | SetErrorActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model}: t)}
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state;
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId} as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string)  => {
    return {type: "SET-TASKS", tasks, todolistId} as const
}

//thunks
export const fetchTasksTC = (todolistId: string) => {
    return(dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return(dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTasks(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | SetErrorActionType | SetStatusActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    const action = addTaskAC(task)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    if (res.data.messages.length){
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('some error occurred'))
                    }
                    dispatch(setAppStatusAC('failed'))
                }

            })
    }
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const model: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, model )
            .then(res => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }
}

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
