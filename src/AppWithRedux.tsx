import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import {
    addTodolistAC,
    changeTodolistsAC,
    changeTodolistsFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    function removeTask(idtodelete: string, todolistId: string) {
        const action = removeTaskAC(idtodelete, todolistId)
        dispatch(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId)
        dispatch(action)
    }

    function changeTaskTitle(taskId: string, newTaskTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newTaskTitle, todolistId)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistsFilterAC(todolistId, value)
        dispatch(action)
    }

    let removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const action = changeTodolistsAC(id, newTitle)
        dispatch(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Photos
                    </Typography>
                </Toolbar>
            </AppBar>


            <Container fixed>
                <Grid container><AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={10} style={{padding: "20px"}}>
                    {todolists.map((tl) => {

                        let tasksForTodolist = tasks[tl.id]
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                        }

                        return (<Grid item>
                                <Paper style = {{padding: "10px"}}>
                            <Todolist
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>

            </Container>

        </div>

    )
}

export default AppWithRedux;
