import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider, } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

import { getPost } from "../../action/posts";
import useStyles from './styles';


const PostDetails = () => {
    const { post, posts, isLoading } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const styles = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    if (!post) return null;

    if (isLoading) {
        console.log(isLoading)
        return (
            <Paper elevation={6} className={styles.loadingPaper}>
                <CircularProgress size='7em' />
            </Paper>
        )
    }

    return (
        <>
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <div className={styles.card}>
                    <div className={styles.section}>
                        <Typography variant="h3" component='h2'>{post.title}</Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component='h2'>{post.tags}</Typography>
                        <Typography gutterBottom variant="body1" component='p'>{post.message}</Typography>
                        <Typography variant='h6'>Created By: {post.name}</Typography>
                        <Typography gutterBottom variant="body1">{moment(post.date).fromNow()}</Typography>
                        <Divider style={{ maring: '20px 0' }} />
                        <Typography variant="body1"><strong>Comment's for this post</strong></Typography>
                        <Divider style={{ maring: '20px 0' }} />

                    </div>
                    <div className={styles.imageSection}>
                        <img className={styles.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                    </div>

                </div>

            </Paper>
        </>
    )
}

export default PostDetails;