import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlineIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";

import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { AUTH } from "../../constants/actionType";
import { singup, singin } from '../../action/auth';

const initialFormData = { firstName: '', lastName: '', email: '', password: '', conformPassword: '' };

const Auth = () => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData)
    const [isSingUp, setIsSingUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleShowPassword = () => setShowPassword(preValue => !preValue);
    const switchMode = () => setIsSingUp(preValue => !preValue);

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const googleSingInSuccess = async (response) => {
        const result = response?.profileObj;
        const token = response?.tokenId;
        try {
            dispatch({ type: AUTH, data: { result, token } });
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleSingInFailure = error => {
        console.log(error);
        swal({ title: "Google Sing In Failed! please try again", icon: 'warning' });
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (isSingUp)
            dispatch(singup(formData, navigate));
        else
            dispatch(singin(formData, navigate));
    }

    document.title = 'Travel Memoirs -Sing In'
    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={styles.paper} elevation={3}>
                <Avatar className={styles.avatar}> <LockOutlineIcon /> </Avatar>
                <Typography variant="h5">{isSingUp ? 'Sing Up' : 'Sing In'}</Typography>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSingUp && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} value={formData.firstName} half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} value={formData.lastName} half />
                            </>
                        )}
                        <Input type='email' name='email' label='Email Address' handleChange={handleChange} value={formData.email} />
                        <Input type={showPassword ? 'text' : 'password'} name='password' label='Password' handleChange={handleChange} handleShowPassword={handleShowPassword} value={formData.password} />

                        {isSingUp && <Input type='password' name='conformPassword' label='Comform Password' handleChange={handleChange} value={formData.conformPassword} />}

                        <Button type='submit' fullWidth variant="contained" color='primary' className={styles.submit}>
                            {isSingUp ? 'Sing Up' : 'Sing In'}
                        </Button>

                        <GoogleLogin
                            clientId="GOOGLE CLIENT ID"
                            render={props => (
                                <Button className={styles.googleButton} color='primary' variant='contained' fullWidth onClick={props.onClick} disabled={props.disabled} startIcon={<Icon />} >Google Sing In</Button>
                            )}
                            onSuccess={googleSingInSuccess}
                            onFailure={googleSingInFailure}
                            cookiePolicy='single_host_origin' />

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>{isSingUp ? "Already have an account? Sing In" : "Don't have an account? Sing Up"}</Button>

                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;