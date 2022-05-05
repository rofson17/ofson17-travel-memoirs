import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grid, Grow } from '@material-ui/core';

import Posts from '../Posts';
import Form from '../Form'
import useStyles from './styles';
import { getPosts } from '../../action/posts';


const Home = () => {
    document.title = "Travel Memoirs -Home";
    const dispatch = useDispatch();
    const styles = useStyles();
    const [currentPostID, setCurrentPostID] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentPostID]);



    return (
        <Grow in>
            <Container>
                <Grid container className={styles.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentPostID={setCurrentPostID} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentPostID={currentPostID} setCurrentPostID={setCurrentPostID} />
                    </Grid>
                </Grid>
            </Container>
        </Grow >
    )
}

export default Home;