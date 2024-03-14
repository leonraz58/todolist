import {tasksReducer, todolistsReducer} from '../features/TodolistList/';
import {combineReducers} from 'redux';
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login";
import {configureStore} from "@reduxjs/toolkit";
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


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

export type ThunkError = {rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }}