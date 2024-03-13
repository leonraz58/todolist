import { tasksReducer } from '../features/TodolistList/tasks-reducer';
import { todolistsReducer } from '../features/TodolistList/todolists-reducer';
import {
    ActionCreatorsMapObject,
    AnyAction,
    applyMiddleware,
    bindActionCreators,
    combineReducers,
    createStore
} from 'redux';
import {thunk, ThunkDispatch} from "redux-thunk";
import {appReducer} from "../app/app-reducer";
import {useDispatch} from "react-redux";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useMemo} from "react";
import {FieldErrorType} from "../api/todolist-api";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
//export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootReducerType = typeof rootReducer
export const store = configureStore({
    reducer: rootReducer,
    //middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch2 = () => useDispatch<AppDispatchType>()

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T){
    const dispatch = useAppDispatch()
    const boundActions = useMemo(()=>{
        return bindActionCreators(actions, dispatch)
    },[])
    return boundActions
}

export type ThunkError = {rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }}