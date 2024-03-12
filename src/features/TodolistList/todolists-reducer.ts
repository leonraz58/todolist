import {TodolistType} from "../../api/todolist-api";
import {RequestStatusType} from "../../state/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../common/actions/common.actions";
import {addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, removeTodolistTC} from "./todolist-actions";

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        // removeTodolistAC: (state, action: PayloadAction<{ todolistId: string }>) => {
        //     const index = state.findIndex(tl => tl.id === action.payload.todolistId)
        //     if (index > -1) {
        //         state.splice(index, 1)
        //     }
        // },
        // addTodolistAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
        //     state.push({...action.payload.todolist, filter: "all", entityStatus: 'idle'})
        // },
        // changeTodolistTitleAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
        //     const index = state.findIndex(tl => tl.id === action.payload.id)
        //     state[index].title = action.payload.title
        // },
        changeTodolistFilterAC: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        // setTodolistsAC:(state, action: PayloadAction<{todolists: Array<TodolistType>}>)=>{
        //     return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        // },
        changeTodolistEntityStatusAC: (state, action: PayloadAction<{
            id: string,
            entityStatus: RequestStatusType
        }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
        // clearDataAC:(state)=>{
        //     return []
        // }
    },
    extraReducers: builder => {
        builder.addCase(clearTasksAndTodolists, () => {
            return []
        })
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            if (action.payload) return action.payload.todolists.map(tl => ({
                ...tl,
                filter: "all",
                entityStatus: 'idle'
            }))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.push({...action.payload.todolist, filter: "all", entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})

export const todolistsReducer = slice.reducer
export const {
    //removeTodolistAC,
    //addTodolistAC,
    //changeTodolistTitleAC,
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC
} = slice.actions

// export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST': {
//             return state.filter(tl => tl.id !== action.id)
//         }
//         case 'ADD-TODOLIST': {
//             return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]
//         }
//         case 'CHANGE-TODOLIST-TITLE': {
//             return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//         }
//         case 'CHANGE-TODOLIST-FILTER': {
//             return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//         }
//         case 'CHANGE-TODOLIST-ENTITY-STATUS': {
//             return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
//         }
//         case 'SET-TODOLISTS': {
//             return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
//         }
//         case 'CLEAR-DATA': {
//             return []
//         }
//         default:
//             return state;
//     }
// }

//actions
// export const removeTodolistAC = (todolistId: string) => {
//     return {type: 'REMOVE-TODOLIST', id: todolistId} as const
// }
// export const addTodolistAC = (todolist: TodolistType) => {
//     return {type: 'ADD-TODOLIST', todolist} as const
// }
// export const changeTodolistTitleAC = (id: string, title: string) => {
//     return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
// }
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
//     return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
// }
// export const setTodolistsAC = (todolists: Array<TodolistType>) => {
//     return {type: 'SET-TODOLISTS', todolists: todolists} as const
// }
// export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
//     return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const
// }
// export const clearDataAC = () => {
//     return {type: 'CLEAR-DATA'} as const
// }


//thunks

// export const fetchTodolistsTC_ = () => {
//     return (dispatch: any) => { //Dispatch<ActionsType | SetStatusActionType | SetErrorActionType> tofix
//         dispatch(setAppStatusAC({status: 'loading'}))
//         todolistsAPI.getTodolists()
//             .then((res)=>{
//                 dispatch(setTodolistsAC({todolists: res.data}))
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//                 return res.data
//             })
//             .then((todos) => {
//                 todos.forEach((tl)=>{
//                     dispatch(fetchTasksTC(tl.id))
//                 })
//             })
//             .catch(error => {
//                 handleServerAppError(error, dispatch)
//             })
//     }
// }
// export const removeTodolistsTC = (todolistId: string) => {
//     return (dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
//         todolistsAPI.deleteTodolists(todolistId)
//             .then((res) => {
//                 dispatch(removeTodolistAC({todolistId: todolistId}))
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//             })
//     }
// }

// export const addTodolistTC_ = (title: string) => {
//     return (dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         todolistsAPI.createTodolists(title)
//             .then((res) => {
//                 dispatch(addTodolistAC({todolist: res.data.data.item}))
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//             })
//     }
// }

// export const changeTodolistTitleTC_ = (id: string, title: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         todolistsAPI.updateTodolists(id, title)
//             .then(res => {
//                 dispatch(changeTodolistTitleAC({id: id, title: title}))
//             })
//     }
// }

//types

//export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
//export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
//export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
//| ReturnType<typeof removeTodolistAC>
//| ReturnType<typeof addTodolistAC>
    //| ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    //| ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
