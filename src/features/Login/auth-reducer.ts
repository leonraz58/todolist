import {setAppErrorAC, setAppStatusAC, SetErrorActionType} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {authAPI, FieldErrorType, LoginParamsType, ResponseType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../common/actions/common.actions";
import {AxiosError} from "axios";

export const slice = createSlice({
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
            //if (action.payload) {
                state.isLoggedIn = true
            //}
        })
        builder.addCase(logoutTC.fulfilled, (state, action) => {
                state.isLoggedIn = false

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

export const loginTC = createAsyncThunk<undefined, LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
}>
('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            //thunkAPI.dispatch(setIsLoggedInAC({value: true}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error: AxiosError = err
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        //thunkAPI.dispatch(setAppErrorAC(error.message))
        //thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
    }
})
export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await authAPI.logout()
    try {
        if (res.data.resultCode === 0) {
            //thunkAPI.dispatch(setIsLoggedInAC({value: false}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            //dispatch(clearDataAC())
            thunkAPI.dispatch(clearTasksAndTodolists({tasks: {}, todolists: []}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

export const asyncActions = {
    loginTC,
    logoutTC
}

type InitialStateType = {
    isLoggedIn: boolean
}