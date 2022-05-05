import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlineIcon from '@material-ui/icons/LockOutlined';


import useStyles from './styles';
import Input from './Input';


const Auth = () => {
    const styles = useStyles();
    const [isSingUp, setIsSingUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(preValue => !preValue);
    const switchMode = () => setIsSingUp(preValue => !preValue);

    const handleChange = event => {
        ;
    }


    const handleSubmit = event => {
        event.preventDefault();
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
                                <Input name='firstName' label='First Name' handleChange={handleChange} half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )}
                        <Input type='email' name='email' label='Email Address' handleChange={handleChange} />
                        <Input type={showPassword ? 'text' : 'password'} name='password' label='Password' handleChange={handleChange} handleShowPassword={handleShowPassword} />

                        {isSingUp && <Input type='password' name='conformPassword' label='Comform Password' handleChange={handleChange} />}
                        <Button type='submit' fullWidth variant="contained" color='primary' className={styles.submit}>
                            {isSingUp ? 'Sing Up' : 'Sing In'}
                        </Button>
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