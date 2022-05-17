import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Tooltip, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import useStyles from './styles'
import { deletePost, likePost } from "../../../action/posts";

const Post = ({ post, setCurrentPostID }) => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const naviage = useNavigate();

    const openPost = () => naviage(`/posts/${post._id}`);

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
                <>
                    <ThumbUpAltIcon fontSize='small' /> &nbsp; {post.likes.length > 2 ? `You and ${post.likes.length - 1} others likes` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`} &nbsp;
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize='small' /> &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'} &nbsp;
                </>
            )
        };
        return <><ThumbUpAltOutlined fontSize='small' />&nbsp; Like &nbsp;</>
    }


    return (
        <Card className={styles.card} raised elevation={6}>
            <ButtonBase className={styles.cardAction} onClick={openPost}>
                <CardMedia className={styles.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
                <div className={styles.overlay}>
                    <Typography variant="h6" >{post.name}</Typography>
                    <Typography variant="body2" >{moment(post.date).fromNow()}</Typography>
                </div>

                {(user?.result?.googleId === post?.author || user?.result?._id === post?.author) &&
                    <div className={styles.overlay2}>
                        <Tooltip title='Edit post' >
                            <Button style={{ color: '#fff' }} size='small' onClick={() => { setCurrentPostID(post._id) }} > <MoreHorizIcon /> </Button>
                        </Tooltip>
                    </div>
                }

                <div className={styles.details}>
                    <Typography variant="body2" color='textSecondary' component='h2'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={styles.title} variant='h5' component='h2' gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant='body2' color="textSecondary" component='p'>{post.message.split(' ').slice(0, 8).join(' ')}...</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={styles.cardActions}>
                <Button size="small" color='primary' disabled={!user?.result} onClick={() => { dispatch(likePost(post._id)) }}> <Likes /> </Button>

                {(user?.result?.googleId === post?.author || user?.result?._id === post?.author) &&
                    <Button size="small" color='secondary' onClick={() => { dispatch(deletePost(post._id)) }}> <DeleteIcon fontSize='small' />Delete </Button>
                }

            </CardActions>
        </Card >
    )
}

export default Post;