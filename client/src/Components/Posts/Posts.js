import React from "react";

import useStyles from './styles'
import Post from './Post/Post';
import { useSelector } from "react-redux";



const Posts = () => {
    const sytles = useStyles();
    const posts = useSelector(state => state.posts);

    console.log(posts);


    return (
        <>
            <h1>HI</h1>
        </>
    )
}

export default Posts;