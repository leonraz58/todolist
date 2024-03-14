import {tasksReducer, todolistsReducer} from '../features/TodolistList/';
import {combineReducers} from 'redux';
import {appReducer} from "../features/Application/app-reducer";
import {authReducer} from "../features/Login";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
//export const store = createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
    reducer: rootReducer,
    //middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

