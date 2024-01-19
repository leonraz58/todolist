import {ResponseType} from '../api/todolist-api';
import {setAppErrorAC, setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../state/app-reducer";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    if (data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'some error occurred'))
    dispatch(setAppStatusAC('failed'))
}