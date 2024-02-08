import {setAppErrorAC, setAppStatusAC, SetErrorActionType} from "../../state/app-reducer";
import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError} from "../../utils/error-utils";
import {addTaskAC} from "../../state/tasks-reducer";
import {clearDataAC} from "../../state/todolists-reducer";

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType | SetErrorActionType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SET-IS-LOGGED_IN": {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state;
    }
}

//actions

export const setIsLoggedInAC = (value: boolean) => ({type: 'LOGIN/SET-IS-LOGGED_IN', value} as const)
export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    alert('YO')
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                    //dispatch(action)

                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC('failed'))
            })
    }
}

export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(clearDataAC())

                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC('failed'))
            })
    }
}

type ActionsType = ReturnType<typeof setIsLoggedInAC>

type InitialStateType = {
    isLoggedIn: boolean
}