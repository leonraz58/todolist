import {
    addTodolistAC,
    AddTodolistActionType, ClearDataActionType, removeTodolistAC,
    RemoveTodolistActionType, setTodolistsAC,
    SetTodolistsActionType
} from './todolists-reducer';
import {TasksStateType} from '../App';
import {TaskType, todolistsAPI, UpdateTaskType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppErrorAC, SetErrorActionType, setAppStatusAC, SetStatusActionType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {action} from "@storybook/addon-actions";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers:{
        removeTaskAC:(state, action: PayloadAction<{taskId: string, todolistId: string}>)=>{
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC:(state, action: PayloadAction<{task: TaskType}>)=>{
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC:(state, action: PayloadAction<{taskId: string, model: UpdateDomainTaskModelType, todolistId: string}>)=>{
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC:(state, action: PayloadAction<{tasks: Array<TaskType>, todolistId: string}>)=>{
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
    }
})
export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions

// export const _tasksReducer = (state: TasksStateType = initialState, action: ActionsType | SetErrorActionType): TasksStateType => {
//     switch (action.type) {
//         case 'REMOVE-TASK': {
//             return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
//         }
//         case 'ADD-TASK': {
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         }
//         case 'UPDATE-TASK': {
//             return {...state, [action.todolistId]: state[action.todolistId]
//                     .map(t => t.id === action.taskId ? {...t, ...action.model}: t)}
//         }
//         case 'ADD-TODOLIST': {
//             return {
//                 ...state,
//                 [action.todolist.id]: []
//             }
//         }
//         case 'REMOVE-TODOLIST': {
//             const copyState = {...state};
//             delete copyState[action.id];
//             return copyState;
//         }
//         case "SET-TODOLISTS": {
//             const copyState = {...state}
//             action.todolists.forEach(tl => {
//                 copyState[tl.id] = []
//             })
//             return copyState
//         }
//         case "SET-TASKS": {
//             return {...state, [action.todolistId]: action.tasks}
//         }
//         case "CLEAR-DATA": {
//             return {}
//         }
//         default:
//             return state;
//     }
// }

//actions
// export const removeTaskAC = (taskId: string, todolistId: string) => {
//     return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
// }
// export const addTaskAC = (task: TaskType) => {
//     return {type: 'ADD-TASK', task} as const
// }
// export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
//     return {type: 'UPDATE-TASK', model, todolistId, taskId} as const
// }
// export const setTasksAC = (tasks: Array<TaskType>, todolistId: string)  => {
//     return {type: "SET-TASKS", tasks, todolistId} as const
// }

//thunks
export const fetchTasksTC = (todolistId: string) => {
    return(dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC({tasks: res.data.items, todolistId: todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return(dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTasks(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC({taskId, todolistId}))
            })
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | SetErrorActionType | SetStatusActionType>) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    const action = addTaskAC({task})
                    dispatch(action)
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC({status: 'failed'}))
            })
    }
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | SetErrorActionType | SetStatusActionType>, getState: () => AppRootStateType) => {
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
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC({taskId: taskId, model: domainModel, todolistId: todolistId})
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
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
    | SetStatusActionType
    | ClearDataActionType