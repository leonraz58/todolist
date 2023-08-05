import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {CheckBox, Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TasksStateType} from "./AppWithRedux";

type PropsType = {
    id: string
    title: string;
//    tasks: Array<TaskType>
  //  removeTask: (idtodelete: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
  //  addTask: (title: string, todolistId: string) => void
    //changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    //changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo( (props: PropsType) => {
    console.log('todolist is rendering...')
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    let tasksForTodolist = tasks
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }


    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    const addTask = useCallback( (title: string) => {
        const action = addTaskAC(title, props.id)
        dispatch(action)
    },[] )

    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} onChangeTask={changeTodolistTitle}/>
                {/*<button onClick={removeTodolist}>x</button>*/}
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>


            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksForTodolist.map((el: TaskType) => {
                    const onRemoveHandler = () => {
//                        props.removeTask(el.id, props.id)
                        const action = removeTaskAC(el.id, props.id)
                        dispatch(action)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const action = changeTaskStatusAC(el.id, e.currentTarget.checked, props.id)
                        dispatch(action)
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        //props.changeTaskTitle(el.id, newValue, props.id)
                        const action = changeTaskTitleAC(el.id, newValue, props.id)
                        dispatch(action)
                    }

                    return (
                        <div key={el.id} className={el.isDone ? "is-done" : ""}>
                            <Checkbox
                                checked={el.isDone}
                                onChange={onChangeStatusHandler}
                            />
                            {/*<span>{el.title}</span>*/}
                            <EditableSpan title={el.title} onChangeTask={onChangeTitleHandler}/>
                            {/*<button onClick={onRemoveHandler}>x</button>*/}
                            <IconButton onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    )
                })}

            </ul>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : "text"}
                        onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.filter === 'active' ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})

