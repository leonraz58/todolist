import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {AppDispatchType, AppRootStateType, useAppDispatch} from "../../state/store";
import {Redirect} from "react-router-dom";

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'password is required'
                }
            }
        },

        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(loginTC(values))
            if (loginTC.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length){
                    const error = action.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                } else {

                }

            }
            //alert(JSON.stringify(values));
        },
    })

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return <form onSubmit={formik.handleSubmit}>

        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label={'Remember me'} control={<Checkbox
                            {...formik.getFieldProps('rememberMe')}
                        />}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>
    </form>
}
