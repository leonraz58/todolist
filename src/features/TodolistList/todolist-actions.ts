import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../state/app-reducer";
import {todolistsAPI} from "../../api/todolist-api";
import {fetchTasksTC} from "./tasks-actions";
import {handleServerNetworkError} from "../../utils/error-utils";
import {changeTodolistEntityStatusAC} from "./todolists-reducer";

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    try {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        const todos = res.data
        todos.forEach((tl) => {
            thunkAPI.dispatch(fetchTasksTC(tl.id))
        })
        return {todolists: res.data}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        thunkAPI.rejectWithValue(null)
    }
})
export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
    const res = await todolistsAPI.deleteTodolists(todolistId)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {id: todolistId}
})
export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async ( title: string , thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTodolists(title)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todolist: res.data.data.item}
})
export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: {
    id: string,
    title: string
}, thunkAPI) => {
    const res = await todolistsAPI.updateTodolists(param.id, param.title)
    return {id: param.id, title: param.title}
})