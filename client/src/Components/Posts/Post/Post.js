import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from "react-redux";

import useStyles from './styles'
import { deletePost, likePost } from "../../../action/posts";

const Post = ({ post, setCurrentPostID }) => {
    const styles = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={styles.card} >
            <CardMedia className={styles.media} image={post.selectedFile} title={post.title} />
            <div className={styles.overlay}>
                <Typography variant="h6" >{post.author}</Typography>
                <Typography variant="body2" >{moment(post.date).fromNow()}</Typography>
            </div>
            <div className={styles.overlay2}>
                <Tooltip title='Edit post' >
                    <Button style={{ color: '#fff' }} size='small' onClick={() => { setCurrentPostID(post._id) }} > <MoreHorizIcon /> </Button>
                </Tooltip>
            </div>
            <div className={styles.details}>
                <Typography variant="body2" color='textSecondary' component='h2'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={styles.title} variant='h5' component='h2' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color="textSecondary" component='p'>{post.message}</Typography>
            </CardContent>
            <CardActions className={styles.cardActions}>
                <Tooltip title='Like Post' >
                    <Button size="small" color='primary' onClick={() => { dispatch(likePost(post._id)) }}> <ThumbUpAltIcon fontSize='small' />&nbsp; Like &nbsp;{post.likeCount}</Button>
                </Tooltip>
                <Tooltip title='Delete post'>
                    <Button size="small" color='secondary' onClick={() => { dispatch(deletePost(post._id)) }}> <DeleteIcon fontSize='small' />Delete </Button>
                </Tooltip>
            </CardActions>
        </Card >
    )
}

export default Post;