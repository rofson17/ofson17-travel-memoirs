import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from './styles'
import Post from './Post/Post';
import { useSelector } from "react-redux";



const Posts = ({ setCurrentPostID }) => {
    const sytles = useStyles();
    const posts = useSelector(state => state.posts);

    return !posts.length ? <CircularProgress /> : (
        <Grid className={sytles.mainContainer} container alignItems='stretch' spacing={3}>
            {posts.map((post) => {
                return <Grid item xs={12} sm={6} md={6} key={post._id} >
                    <Post post={post} setCurrentPostID={setCurrentPostID} />
                </Grid>
            })}
        </Grid>
    )
}

export default Posts;