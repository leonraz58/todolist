import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppRootStateType} from "../../state/store";
import {todolistsAPI, UpdateTaskType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../state/app-reducer";
import {UpdateDomainTaskModelType} from "./tasks-reducer";

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
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
    createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
        const res = await todolistsAPI.deleteTasks(param.todolistId, param.taskId)
        //thunkAPI.dispatch(removeTaskAC({taskId: param.taskId, todolistId: param.todolistId}))
        return {taskId: param.taskId, todolistId: param.todolistId}
    })
export const addTaskTC =
    createAsyncThunk('tasks/addTask', async (param: { title: string, todolistId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        try {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return task
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
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
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })