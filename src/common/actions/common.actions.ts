import {createAction} from "@reduxjs/toolkit";
import {TasksStateType} from "../../App";
import {TodolistDomainType} from "../../state/todolists-reducer";

export type ClearTasksAndTodolistsType = {
    tasks: TasksStateType,
    todolists: TodolistDomainType[]
}

export const clearTasksAndTodolists = createAction<ClearTasksAndTodolistsType>('common/clear-tasks-and-todolists')