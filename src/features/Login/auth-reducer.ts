import {setAppErrorAC, setAppStatusAC, SetErrorActionType} from "../../state/app-reducer";
import {Dispatch} from "redux";
import {authAPI, FieldErrorType, LoginParamsType, ResponseType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../common/actions/common.actions";
import {AxiosError} from "axios";

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoggedIn = action.payload.isLoggedIn
            }

        })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// export const authReducer = (state: InitialStateType = initialState, action: ActionsType | SetErrorActionType): InitialStateType => {
//     switch (action.type) {
//         case "LOGIN/SET-IS-LOGGED_IN": {
//             return {...state, isLoggedIn: action.value}
//         }
//         default:
//             return state;
//     }
// }

//actions

//export const setIsLoggedInAC = (value: boolean) => ({type: 'LOGIN/SET-IS-LOGGED_IN', value} as const)

export const loginTC = createAsyncThunk<{isLoggedIn: boolean}, LoginParamsType, {rejectValue: {errors: Array<string>, fieldsErrors?: Array<FieldErrorType>}}>
('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            //thunkAPI.dispatch(setIsLoggedInAC({value: true}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        //thunkAPI.dispatch(setAppErrorAC(error.message))
        //thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
    }
})
export const loginTC_ = (data: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value: true}))
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

export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value: false}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    //dispatch(clearDataAC())
                    dispatch(clearTasksAndTodolists({tasks: {}, todolists: []}))

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

//type ActionsType = ReturnType<typeof setIsLoggedInAC>

type InitialStateType = {
    isLoggedIn: boolean
}