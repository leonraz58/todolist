import {TasksStateType} from '../../app/App';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists, ClearTasksAndTodolistsType} from "../../common/actions/common.actions";
import {todolistsAPI} from "../../api/todolist-api";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from "../../utils/error-utils";
import {asyncActions as todolistsAsyncActions} from "./todolists-reducer";
import {AxiosError} from "axios";
import {AppRootStateType, ThunkError} from "../../utils/types";
import {TaskType, UpdateTaskType} from "../../api/types";
import {appActions} from "../Application";


const initialState: TasksStateType = {}


export const fetchTasksTC = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkError>('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
    return {tasks, todolistId}
})
//thunks
//заменили на новую версию TC
// export const fetchTasksTC_ = (todolistId: string) => {
//     return(dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         todolistsAPI.getTasks(todolistId)
//             .then((res) => {
//                 dispatch(setTasksAC({tasks: res.data.items, todolistId: todolistId}))
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//             })
//     }
// }
// export const removeTaskTC_ = (taskId: string, todolistId: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         todolistsAPI.deleteTasks(todolistId, taskId)
//             .then((res) => {
//                 dispatch(removeTaskAC({taskId, todolistId}))
//             })
//     }
// }
export const removeTaskTC =
    createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }, ThunkError>('tasks/removeTask', async (param, thunkAPI) => {
        const res = await todolistsAPI.deleteTasks(param.todolistId, param.taskId)
        //thunkAPI.dispatch(removeTaskAC({taskId: param.taskId, todolistId: param.todolistId}))
        return {taskId: param.taskId, todolistId: param.todolistId}
    })
export const addTaskTC =
    createAsyncThunk<
        TaskType,
        { title: string, todolistId: string },
        ThunkError
    >('tasks/addTask', async (param, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        try {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
                return task
            } else {

                return handleAsyncServerAppError(res.data, thunkAPI, false)
            }
        } catch (err) {
            const error: AxiosError = err
            return handleAsyncServerNetworkError(error, thunkAPI, false)
            //return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })
export const updateTaskTC =
    createAsyncThunk('tasks/updateTask', async (param: {
        taskId: string,
        domainModel: UpdateDomainTaskModelType,
        todolistId: string
    }, thunkAPI) => {
        const state = thunkAPI.getState() as AppRootStateType
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
        if (!task) {
            return thunkAPI.rejectWithValue('task not found in the state')
        }

        const model: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...param.domainModel
        }

        const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, model)
        try {
            if (res.data.resultCode === 0) {
                return param
            } else {

                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (error) {

            return handleAsyncServerNetworkError(error, thunkAPI, false)
        }
    })

export const asyncActions = {
    fetchTasksTC, removeTaskTC, addTaskTC, updateTaskTC
}

export const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // removeTaskAC: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         tasks.splice(index, 1)
        //     }
        // },
        // addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
        //     state[action.payload.task.todoListId].unshift(action.payload.task)
        //},
        // updateTaskAC: (state, action: PayloadAction<{
        //     taskId: string,
        //     model: UpdateDomainTaskModelType,
        //     todolistId: string
        // }>) => {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         tasks[index] = {...tasks[index], ...action.payload.model}
        //     }
        // },
        // setTasksAC:(state, action: PayloadAction<{tasks: Array<TaskType>, todolistId: string}>)=>{
        //     state[action.payload.todolistId] = action.payload.tasks
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(todolistsAsyncActions.addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(todolistsAsyncActions.removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(todolistsAsyncActions.fetchTodolistsTC.fulfilled, (state, action) => {
            if (action.payload) {
                action.payload.todolists.forEach((tl: any) => {
                    state[tl.id] = []
                })
            }
        })
        builder.addCase(clearTasksAndTodolists.type, (state, action: PayloadAction<ClearTasksAndTodolistsType>) => {
            return {}
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        })
    }
})
//export const tasksReducer = slice.reducer

//export const {
//removeTaskAC,
//addTaskAC,
//updateTaskAC
//} = slice.actions

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}