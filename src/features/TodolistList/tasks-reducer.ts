import {TasksStateType} from '../../app/App';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists, ClearTasksAndTodolistsType} from "../../common/actions/common.actions";
import {addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} from "./tasks-actions";
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from "./todolist-actions";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // removeTaskAC: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         tasks.splice(index, 1)
        //     }
        // },
        // addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
        //     state[action.payload.task.todoListId].unshift(action.payload.task)
        //},
        // updateTaskAC: (state, action: PayloadAction<{
        //     taskId: string,
        //     model: UpdateDomainTaskModelType,
        //     todolistId: string
        // }>) => {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         tasks[index] = {...tasks[index], ...action.payload.model}
        //     }
        // },
        // setTasksAC:(state, action: PayloadAction<{tasks: Array<TaskType>, todolistId: string}>)=>{
        //     state[action.payload.todolistId] = action.payload.tasks
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            if (action.payload) {
                action.payload.todolists.forEach((tl: any) => {
                    state[tl.id] = []
                })
            }
        })
        builder.addCase(clearTasksAndTodolists.type, (state, action: PayloadAction<ClearTasksAndTodolistsType>) => {
            return {}
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        })
    }
})
export const tasksReducer = slice.reducer

//export const {
//removeTaskAC,
//addTaskAC,
//updateTaskAC
//} = slice.actions

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}