import React, {useCallback, useEffect} from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {TaskType} from "../api/todolist-api";
import {TodolistList} from "../features/TodolistList";
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../state/store";
import {asyncActions, RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../features/Login";
import {logoutTC} from "../features/Login/auth-reducer";
import {selectIsInitialized, selectStatus} from "./selectors";
import {authSelectors} from "../features/Login/";



export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(selectStatus)
    const isInitialized = useSelector<AppRootStateType, boolean>(selectIsInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(authSelectors.selectIsLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if (!demo) {
            dispatch(asyncActions.initializeTC())
        }

    },[])

    const logoutHandler = useCallback(()=>{
        dispatch(logoutTC())
    },[])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}><CircularProgress/></div>
    }



    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static">
                    <ErrorSnackbar/>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>


                        <Route exact path='/' render = {() => <TodolistList demo={demo}/>}/>
                        <Route path='/login' render = {() => <Login/>}/>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;

