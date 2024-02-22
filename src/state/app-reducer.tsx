import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type InitialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
    isInitialized: boolean
}

const slice = createSlice({
    name: 'auth',
    initialState: {
        status: 'loading',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        // setIsInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
        //     state.isInitialized = action.payload.isInitialized
        // }
    },
    extraReducers: builder => {
        builder.addCase(initializeTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }

})

export const appReducer = slice.reducer
// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case "APP/SET-IS-INITIALIZED": {
//             return {...state, isInitialized: action.value}
//         }
//         default:
//             return state
//     }
// }

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
//export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
//export const setIsInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)
export const {setAppErrorAC, setAppStatusAC,
//    setIsInitializedAC
} = slice.actions

export const initializeTC = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
    const res = await authAPI.me()
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setIsLoggedInAC({value: true}))
            } else {
            }
})
// export const initializeTC_ = () => (dispatch: Dispatch) => {
//     authAPI.me()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC({value: true}))
//
//             } else {
//
//             }
//             dispatch(setIsInitializedAC({isInitialized: true}))
//         })
// }

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;
// type ActionsType =
//     | SetErrorActionType
//     | SetStatusActionType
//     | ReturnType<typeof setIsInitializedAC>