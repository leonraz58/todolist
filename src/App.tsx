import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import Menu from "@mui/icons-material/Menu";

const truck1name = 'What to learn1';

export type filterValuesType = "all" | "completed" | "active"

type TodolistType = {
    id: string,
    title: string,
    filter: filterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let [tasksObj, setTasksObj] = useState<TaskStateType>({
            [todolistId1]:
                [
                    {id: v1(), title: "HTML&CSS", isDone: true},
                    {id: v1(), title: "JS", isDone: true},
                    {id: v1(), title: "ReactJS", isDone: false},
                    {id: v1(), title: "Python", isDone: false}
                ],
            [todolistId2]:
                [
                    {id: v1(), title: "Book", isDone: false},
                    {id: v1(), title: "Milk", isDone: true},

                ]
        }
    )

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    function removeTask(idtodelete: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== idtodelete)
        tasksObj[todolistId] = filteredTasks

        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let newTask = {id: v1(), title: title, isDone: false}
        let newtasks = [newTask, ...tasks]
        tasksObj[todolistId] = newtasks
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: filterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj})
        }
        //let copy = [...tasks]
    }

    function changeTaskTitle(taskId: string, newTaskTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTaskTitle;
            setTasksObj({...tasksObj})
        }
        //let copy = [...tasks]
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
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

                        let tasksForTodolist = tasksObj[tl.id]
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

export default App;
