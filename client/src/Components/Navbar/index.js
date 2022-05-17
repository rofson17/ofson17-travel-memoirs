import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';


import useStyles from './styles';
import { LOGOUT } from '../../constants/actionType';

const Navbar = () => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loacation = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    let pathname = loacation.pathname;

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodeToken = decode(token);
            if (decodeToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [loacation]);

    const logout = () => {
        dispatch({ 'type': LOGOUT });
        setUser(null);
        navigate('/');
    }

    return (
        < AppBar className={styles.appBar} position='static' color='inherit' >
            <div className={styles.brandContainer}>
                <Typography className={styles.heading} component={Link} to='/' variant='h4' align='center'>Travel Memoirs</Typography>
            </div>
            <Toolbar>
                {user ? (
                    <div className={styles.profile}>
                        <Avatar className={styles.purple} src={user.result.image} alt={user.result.name} >{user.result.name.charAt(0)}</Avatar>
                        <Typography className={styles.userName} variant='h6'>{user.result.name}</Typography>
                        <Button className={styles.logout} color='secondary' variant='contained' onClick={logout} >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to={`${pathname === '/auth' ? '/' : '/auth'}`} variant='contained' color='primary'>{pathname === '/auth' ? 'Home' : 'Sing In'}</Button>

                )}
            </Toolbar>
        </AppBar >
    )
}
export default Navbar;

