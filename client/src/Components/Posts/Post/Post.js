import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import useStyles from './styles'


const Post = ({ post }) => {
    const styles = useStyles();



    return (
        <Card className={styles.card} >
            <CardMedia className={styles.media} image={post.selectedFile} title={post.title} />
            <div className={styles.overlay}>
                <Typography variant="h6" >{post.author}</Typography>
                <Typography variant="body2" >{moment(post.date).fromNow()}</Typography>
            </div>
            <div className={styles.overlay2}>
                <Button style={{ color: '#fff' }} size='small' onClick={() => { }} > <MoreHorizIcon /> </Button>
            </div>
            <div className={styles.details}>
                <Typography variant="body2" color='textSecondary' component='h2'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={styles.title} variant='h5' component='h2' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color="textSecondary" component='p'>{post.message}</Typography>
            </CardContent>
            <CardActions className={styles.cardActions}>
                <Button size="small" color='primary' onClick={() => { }}> <ThumbUpAltIcon fontSize='small' /> Like {post.likeCount}</Button>
                <Button size="small" color='secondary' onClick={() => { }}> <DeleteIcon fontSize='small' />Delete </Button>
            </CardActions>
        </Card>
    )
}

export default Post;