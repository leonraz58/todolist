import * as taskActions from './tasks-actions'
import * as todolistsAsyncActions from './todolist-actions'
import {slice} from "./todolists-reducer";

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}


export {
    taskActions,
    todolistsActions
}