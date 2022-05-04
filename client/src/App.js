import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid } from "@material-ui/core"
import { useDispatch } from 'react-redux';

import Posts from './Components/Posts/Posts';
import Form from './Components/Form/Form';
import useStyles from './sytles';
import { getPosts } from './action/posts';
import Navbar from './Components/Navbar/Navbar';


const App = () => {
    document.title = "Travel Memoirs -Home";
    const styles = useStyles();
    const dispatch = useDispatch();
    const [currentPostID, setCurrentPostID] = useState(null);



    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentPostID]);


    return (
        <Container maxWidth='lg'>
            <Navbar />
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
        </Container >
    )
}

export default App;