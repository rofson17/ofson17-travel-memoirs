import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from './styles'
import Post from './Post';
import { useSelector } from "react-redux";



const Posts = ({ setCurrentPostID }) => {
    const sytles = useStyles();
    const { posts, isLoading } = useSelector(state => state.posts);

    if (!posts.length && !isLoading) return 'No Posts exist';

    return isLoading ? (
        <div style={{ height: '70vh', display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
        </div>
    ) : (
        <Grid className={sytles.mainContainer} container alignItems='stretch' spacing={3}>
            {posts.map((post) => {
                return <Grid item xs={12} sm={12} md={6} lg={3} key={post._id} >
                    <Post post={post} setCurrentPostID={setCurrentPostID} />
                </Grid>
            })}
        </Grid>
    )
}

export default Posts;