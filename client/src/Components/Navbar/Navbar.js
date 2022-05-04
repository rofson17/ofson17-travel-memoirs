import { AppBar, Typography } from '@material-ui/core';
import React from 'react';

import useStyles from './styles';


const Navbar = () => {
    const classes = useStyles();

    return (
        < AppBar className={classes.appBar} position='static' color='inherit' >
            <Typography className={classes.heading} variant='h4' align='center'>Travel Memoirs</Typography>
        </AppBar >
    )
}
export default Navbar;

