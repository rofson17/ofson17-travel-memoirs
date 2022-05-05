import React from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';


const Navbar = () => {
    const styles = useStyles();
    const user = null;

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
                        <Button className={styles.logout} color='secondary' variant='contained' onClick={() => { }} >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sing In</Button>

                )}
            </Toolbar>
        </AppBar >
    )
}
export default Navbar;

