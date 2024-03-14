import {SetErrorActionType, SetStatusActionType} from "../features/Application/app-reducer";
import {appActions} from "../features/Application";
import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {ResponseType} from "../api/types";

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}
// export const handleServerAppError = <D>(data: ResponseType, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>, showError = true) => {
//     if (showError) {
//         if (data.messages.length) {
//             dispatch(appActions.setAppErrorAC({error: data.messages[0]}))
//         } else {
//             dispatch(appActions.setAppErrorAC({error: 'some error occurred'}))
//         }
//     }
//     dispatch(appActions.setAppStatusAC({status: 'failed'}))
// }

export const handleAsyncServerAppError = <D>(data: ResponseType, ThunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        if (data.messages.length) {
            ThunkAPI.dispatch(appActions.setAppErrorAC({error: data.messages[0]}))
        } else {
            ThunkAPI.dispatch(appActions.setAppErrorAC({error: 'some error occurred'}))
        }
    }
    ThunkAPI.dispatch(appActions.setAppStatusAC({status: 'failed'}))
    return ThunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

// export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>, showError = true) => {
//     if (showError) {
//         dispatch(appActions.setAppErrorAC({error: error.message ? error.message : 'some error occurred'}))
//     }
//     dispatch(appActions.setAppStatusAC({status: 'failed'}))
// }

export const handleAsyncServerNetworkError = (error: AxiosError, ThunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        ThunkAPI.dispatch(appActions.setAppErrorAC({error: error.message ? error.message : 'some error occurred'}))
    }
    ThunkAPI.dispatch(appActions.setAppStatusAC({status: 'failed'}))

    return ThunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}