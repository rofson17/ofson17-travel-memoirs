import React, { useState, } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts';
import Form from '../Form'
import useStyles from './styles';
import { getPostsBySearch } from '../../action/posts';
import Pagination from '../Pagination';


const Home = () => {
    document.title = "Travel Memoirs -Home";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const styles = useStyles();
    const [currentPostID, setCurrentPostID] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [tags, setTags] = useState([]);

    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const searchQuery = searchParams.get('searchQuery');

    const searchPost = () => {
        if (searchInput.trim() || tags) {
            // dispatch = search post 
            dispatch(getPostsBySearch({ search: searchInput, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${searchInput || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }

    }

    // search posts on click enter key
    const hadleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete))


    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container className={styles.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7} md={9}>
                        <Posts setCurrentPostID={setCurrentPostID} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={styles.searchBar} position='static' color='inherit'>
                            <TextField name='search' label='Search Memories' fullWidth onKeyPress={hadleKeyPress} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                            <ChipInput style={{ margin: '10px 0' }} value={tags} onAdd={handleAdd} onDelete={handleDelete} label={'Search Tags'} />
                            <Button onClick={searchPost} color='primary' variant='contained'>Search</Button>
                        </AppBar>
                        <Form currentPostID={currentPostID} setCurrentPostID={setCurrentPostID} />

                        {(!searchQuery && !tags.length) && (

                            <Paper className={styles.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}

                    </Grid>
                </Grid>
            </Container>
        </Grow >
    )
}

export default Home;