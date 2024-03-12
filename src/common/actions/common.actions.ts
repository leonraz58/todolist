import {createAction} from "@reduxjs/toolkit";
import {TasksStateType} from "../../app/App";
import {TodolistDomainType} from "../../features/TodolistList/todolists-reducer";

export type ClearTasksAndTodolistsType = {
    tasks: TasksStateType,
    todolists: TodolistDomainType[]
}

export const clearTasksAndTodolists = createAction<ClearTasksAndTodolistsType>('common/clear-tasks-and-todolists')