import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

const truck1name = 'What to learn1';

export type filterValuesType = "all" | "completed" | "active"

type TodolistType = {
    id: string,
    title: string,
    filter: filterValuesType
}

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Python", isDone: false}
    ]);
    let [filter, setFilter] = useState<filterValuesType>("all")

    /*let tasks = arr[0];
    let setTasks = arr[1];*/

    function removeTask(idtodelete: string) {
        let filteredTasks = tasks.filter(t => t.id !== idtodelete)
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newtasks = [newTask, ...tasks]
        setTasks(newtasks)
    }

    function changeFilter(value: filterValuesType) {
        setFilter(value)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
        }
        //let copy = [...tasks]
        setTasks([...tasks])
    }

    let tasksForTodolist = tasks
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }


    let todolists: TodolistType[] = [
        {id: v1(), title: "What to learn", filter: "active"},
        {id: v1(), title: "What to buy", filter: "completed"}
    ]

    return (
        <div className="App">

            {todolists.map((tl)=>{
                return(
                    <Todolist title={tl.title}
                                   truck2={12345}
                                   tasks={tasksForTodolist}
                                   removeTask={removeTask}
                                   changeFilter={changeFilter}
                                   addTask={addTask}
                                   changeTaskStatus={changeStatus}
                                   filter={tl.filter}
                    />
                )
            })}
        </div>

    )
}

export default App;
