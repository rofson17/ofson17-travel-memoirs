import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core"
import { useDispatch } from 'react-redux';

import Posts from './Components/Posts/Posts';
import Form from './Components/Form/Form';
import useStyles from './sytles';
import { getPosts } from './action/posts';


const App = () => {
    document.title = "Travel Memoirs -Home";

    const styles = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);


    return (
        <Container maxWidth='lg'>
            <AppBar className={styles.appBar} position='static' color='inherit' >
                <Typography className={styles.heading} variant='h4' align='center'>Travel Memoirs</Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow >
        </Container >
    )
}

export default App;