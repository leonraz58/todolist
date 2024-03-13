import {ResponseType} from '../api/todolist-api';
import {setAppErrorAC, setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {AxiosError} from "axios";

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}
export const handleServerAppError = <D>(data: ResponseType, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>, showError = true) => {
    if (showError) {
        if (data.messages.length) {
            dispatch(setAppErrorAC({error: data.messages[0]}))
        } else {
            dispatch(setAppErrorAC({error: 'some error occurred'}))
        }
    }

    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleAsyncServerAppError = <D>(data: ResponseType, ThunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        if (data.messages.length) {
            ThunkAPI.dispatch(setAppErrorAC({error: data.messages[0]}))
        } else {
            ThunkAPI.dispatch(setAppErrorAC({error: 'some error occurred'}))
        }
    }
    ThunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
    return ThunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>, showError = true) => {
    if (showError) {
        dispatch(setAppErrorAC({error: error.message ? error.message : 'some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleAsyncServerNetworkError = (error: AxiosError, ThunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        ThunkAPI.dispatch(setAppErrorAC({error: error.message ? error.message : 'some error occurred'}))
    }
    ThunkAPI.dispatch(setAppStatusAC({status: 'failed'}))

    return ThunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}