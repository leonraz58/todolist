import React, {useCallback, useEffect} from 'react'
import {AddItemForm, AddItemFormSubmitHelperType} from '../../components/AddItemForm'
import {EditableSpan} from '../../components/EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material';
import {Task} from './Task'
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "./todolists-reducer";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, useActions} from "../../state/store";
import {AnyAction} from "redux";
import {taskActions, todolistsActions} from "./index";
import { Paper } from '@mui/material';

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

    const {
        addTodolistTC,
        removeTodolistTC,
        fetchTodolistsTC,
        changeTodolistTitleTC,
        changeTodolistFilterAC,
        changeTodolistEntityStatusAC
    } = useActions(todolistsActions)
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



    const addTask = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        let thunk = taskActions.addTaskTC({title: title, todolistId: props.todolist.id})
        const resultAction = await dispatch(thunk)
        if (taskActions.addTaskTC.rejected.match(resultAction)){
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError("some error occured")
            }
        } else {
            helper.setTitle('')
        }


    }, [props.todolist.id])

    const removeTodolist = () => {
        removeTodolistTC(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitleTC({id: props.todolist.id, title: title})
    }, [props.todolist.id])

    const onFilterChangeClickHandler = useCallback((filter: FilterValuesType) => changeTodolistFilterAC({
        filter: filter,
        id: props.todolist.id
    }), [props.todolist.id])



    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status !== TaskStatuses.Completed)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }



    const renderFilterButton = (buttonFilter: FilterValuesType,
                                color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
                                text: string) => {
        return <Button variant={props.todolist.filter === buttonFilter ? 'outlined' : 'text'}
                       onClick={()=>{onFilterChangeClickHandler(buttonFilter)}}
                       color={color}>{text}
        </Button>
    }


    return <Paper style={{padding: '10px', position: "relative"}}>
        <IconButton size={'small'} onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}
                    style={{position: 'absolute', right: '5px', top: '5px'}}
        >
            <Delete fontSize={'small'}/>
        </IconButton>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>

        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}
                                                // removeTask={removeTaskTC}
                                                // changeTaskTitle={changeTaskTitle}
                                                // changeTaskStatus={changeTaskStatus}
                />)
            }
            {!tasksForTodolist.length && <div style={{padding: '10px', color: 'grey'}}>No tasks</div>}
        </div>
        <div style={{paddingTop: '10px'}}>
            {/*<Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}*/}
            {/*        onClick={onAllClickHandler}*/}
            {/*        color={'inherit'}*/}
            {/*>All*/}
            {/*</Button>*/}
            {renderFilterButton('all', 'inherit', 'all')}
            {/*<Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}*/}
            {/*        onClick={onActiveClickHandler}*/}
            {/*        color={'primary'}>Active*/}
            {/*</Button>*/}
            {renderFilterButton( 'active', 'primary', 'Active')}
            {/*<Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}*/}
            {/*        onClick={onCompletedClickHandler}*/}
            {/*        color={'secondary'}>Completed*/}
            {/*</Button>*/}
            {renderFilterButton( 'completed', 'secondary', 'Completed')}
        </div>
    </Paper>
})


