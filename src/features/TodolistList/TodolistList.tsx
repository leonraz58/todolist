import React, {useCallback, useEffect} from "react";
import {
    changeTodolistFilterAC,
    FilterValuesType,
    TodolistDomainType
} from "./todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import Grid from "@mui/material/Grid";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../components/AddItemForm";
import Paper from "@mui/material/Paper";
import {TasksStateType} from "../../app/App";
import {Redirect} from "react-router-dom";
import {Todolist} from "./Todolist";
import {tasksActions, todolistsActions} from "./index";
import {useActions} from "../../utils/redux-utils";
import {AppRootStateType} from "../../utils/types";
import {TaskStatuses} from "../../api/types";


type PropsType = {
    demo?: boolean
}
export const TodolistList: React.FC<PropsType> = ({demo = false}) => {
    useEffect(() => {
        if (!demo || !isLoggedIn) {
            fetchTodolistsTC()
        }
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const {updateTaskTC, removeTaskTC, addTaskTC} = useActions(tasksActions)
    const {addTodolistTC, removeTodolistTC, fetchTodolistsTC, changeTodolistTitleTC, changeTodolistFilterAC, changeTodolistEntityStatusAC} = useActions(todolistsActions)
    type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>
    const useAppDispatch = () => useDispatch<AppThunkDispatch>()
    const dispatch = useAppDispatch()

    const addTodolistCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        let thunk = todolistsActions.addTodolistTC(title)
        const resultAction = await dispatch(thunk)
        if (todolistsActions.addTodolistTC.rejected.match(resultAction)){
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError("some error occured")
            }
        } else {
            helper.setTitle('')
        }

        //addTodolistTC(title)
    },[] )

    // const removeTask = useCallback(function (taskId: string, todolistId: string) {
    //     // const thunk = removeTaskTC({taskId, todolistId});
    //     // dispatch(thunk);
    //
    //     //const callbacks = bindActionCreators({removeTaskTC}, dispatch)
    //     //callbacks.removeTaskTC({taskId, todolistId})
    //
    //     removeTaskTC({taskId, todolistId})
    // }, []);

    // const addTask = useCallback(function (title: string, todolistId: string) {
    //     addTaskTC({title, todolistId});
    // }, []);



    // const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
    //     changeTodolistFilterAC({id: todolistId, filter: value});
    // }, []);

    // const removeTodolist = useCallback(function (id: string) {
    //     removeTodolistTC({todolistId: id});
    // }, []);

    // const changeTodolistTitle = useCallback(function (id: string, title: string) {
    //     changeTodolistTitleTC({id, title});
    // }, []);

    // const addTodolist = useCallback((title: string) => {
    //     addTodolistTC({title});
    // }, [dispatch]);

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (<>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistCallback} disabled={todolists.length === 10}/>
        </Grid>
        <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];

                    return <Grid item key={tl.id}>
                        <div style={{width: "300px"}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                //removeTask={removeTaskTC}
                                //changeFilter={changeTodolistFilterAC}
                                //addTask={addTask}
                                //changeTaskStatus={changeStatus}
                                //removeTodolist={removeTodolist}
                                //changeTaskTitle={changeTaskTitle}
                                //changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </div>
                    </Grid>
                })
            }
        </Grid>
    </>)

}