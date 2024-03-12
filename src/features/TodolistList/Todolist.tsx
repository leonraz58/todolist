import React, {useCallback, useEffect} from 'react'
import { AddItemForm } from '../../components/AddItemForm'
import { EditableSpan } from '../../components/EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Delete } from '@mui/icons-material';
import { Task } from './Task'
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "./todolists-reducer";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, useActions} from "../../state/store";
import {AnyAction} from "redux";
import {taskActions, todolistsActions} from "./index";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    //changeFilter: (value: FilterValuesType, todolistId: string) => void
    //addTask: (title: string, todolistId: string) => void
    //changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    //changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    //removeTask: (params: {taskId: string, todolistId: string}) => void
    //removeTodolist: (id: string) => void
    //changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {
    console.log('Todolist called')

    const {addTodolistTC, removeTodolistTC, fetchTodolistsTC, changeTodolistTitleTC, changeTodolistFilterAC, changeTodolistEntityStatusAC} = useActions(todolistsActions)
    const {addTaskTC, updateTaskTC, removeTaskTC} = useActions(taskActions)

    type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
    const useAppDispatch = () => useDispatch<AppThunkDispatch>()
    const dispatch = useAppDispatch()

    // useEffect(()=>{
    //     if (!demo) {
    //         dispatch(fetchTasksTC(props.todolist.id))
    //     }
    // },[])
    //бага с неподгружением тасок

    const changeTaskStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        updateTaskTC({todolistId: todolistId, taskId: id, domainModel: {status}})

    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        updateTaskTC({taskId: id, todolistId: todolistId, domainModel: {title: newTitle}});

    }, []);

    const addTask = useCallback((title: string) => {
        addTaskTC({title: title, todolistId: props.todolist.id})
    }, [props.todolist.id])

    const removeTodolist = () => {
        removeTodolistTC(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitleTC({id: props.todolist.id, title: title})
    }, [props.todolist.id])

    const onAllClickHandler = useCallback(() => changeTodolistFilterAC({filter: 'all', id: props.todolist.id}), [props.todolist.id])
    const onActiveClickHandler = useCallback(() => changeTodolistFilterAC({filter: 'active', id: props.todolist.id}), [props.todolist.id])
    const onCompletedClickHandler = useCallback(() => changeTodolistFilterAC({filter: 'completed', id: props.todolist.id}), [props.todolist.id])


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status !== TaskStatuses.Completed)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}
                                                removeTask={removeTaskTC}
                                                changeTaskTitle={changeTaskTitle}
                                                changeTaskStatus={changeTaskStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


