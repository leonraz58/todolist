import React, {useCallback, useEffect} from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {TodolistList} from "../features/TodolistList";
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {useSelector} from "react-redux";
import {asyncActions, RequestStatusType} from "../features/Application/app-reducer";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../features/Login";
import {authActions} from "../features/Login/";
import {selectIsInitialized, selectStatus} from "../features/Application/selectors";
import {authSelectors} from "../features/Login/";
import {useActions, useAppDispatch} from "../utils/redux-utils";
import {AppRootStateType} from "../utils/types";
import {TaskType} from "../api/types";
import {appActions} from "../features/Application";

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
    const {logoutTC} = useActions(authActions)
    const {initializeTC} = useActions(appActions)

    useEffect(()=>{
        if (!demo) {
            initializeTC()
        }

    },[])

    const logoutHandler = useCallback(()=>{
        logoutTC()
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

