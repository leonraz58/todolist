import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

const truck1name = 'What to learn1';

export type filterValuesType = "all" | "completed" | "active"

type TodolistType = {
    id: string,
    title: string,
    filter: filterValuesType
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let [tasksObj, setTasksObj] = useState({
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

    let removeTodolist = (todolistId:string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    function removeTask(idtodelete: string, todolistId:string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== idtodelete)
        tasksObj[todolistId] = filteredTasks

        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todolistId:string) {
        let tasks = tasksObj[todolistId]
        let newTask = {id: v1(), title: title, isDone: false}
        let newtasks = [newTask, ...tasks]
        tasksObj[todolistId]=newtasks
        setTasksObj({...tasksObj})
    }

    function changeFilter(value: filterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId:string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj})
        }
        //let copy = [...tasks]

    }

    function addTodolist (title:string){
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

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>

            {todolists.map((tl) => {

                let tasksForTodolist = tasksObj[tl.id]
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                }
                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>

    )
}

export default App;
