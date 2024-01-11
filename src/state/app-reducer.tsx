
export type InitialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: InitialStateType = {
    status: 'loading',
    error: null
}


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;
type ActionsType =
    | SetErrorActionType
    | SetStatusActionType