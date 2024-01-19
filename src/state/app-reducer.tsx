import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export type InitialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'loading',
    error: null,
    isInitialized: false
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED": {
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setIsInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export const initializeTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))

            } else {

            }
            dispatch(setIsInitializedAC(true))
        })
}

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;
type ActionsType =
    | SetErrorActionType
    | SetStatusActionType
    | ReturnType<typeof setIsInitializedAC>