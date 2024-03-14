import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import {useDispatch, useSelector} from "react-redux";
import {appActions} from "../features/Application";
import {AppRootStateType} from "../utils/types";
import {useActions} from "../utils/redux-utils";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)

    const {setAppErrorAC} = useActions(appActions)

    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        setAppErrorAC({error: null})
    }


    const isOpen = error !== null

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error} 😠
            </Alert>
        </Snackbar>
    )
}