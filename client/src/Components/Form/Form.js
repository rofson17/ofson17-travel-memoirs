import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, TextareaAutosize } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from 'react-file-base64';
import swal from 'sweetalert';

import useStyles from "./styles";
import { newPost, updatePost } from '../../action/posts'



const Form = ({ currentPostID, setCurrentPostID }) => {
    const [postData, setPostData] = useState({ author: '', title: '', message: '', tags: [], selectedFile: '' });
    const styles = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentPostID ? state.posts.find(p => p._id === currentPostID) : null);

    useEffect(() => {
        if (post) {
            console.log(post);
            setPostData(post)
        }
    }, [post]);


    const submitForm = e => {
        e.preventDefault();

        if (!postData.author || !postData.title || !postData.message || !postData.tags || !postData.selectedFile) {
            swal({
                title: "Warning",
                text: "Please enter a valid username",
                icon: "warning",
            })
            return;
        }

        if (currentPostID)
            dispatch(updatePost(currentPostID, postData));
        else
            dispatch(newPost(postData));

        swal({
            title: 'Success',
            text: 'Memory has been added',
            icon: 'success'
        })

        setCurrentPostID(null);
        setPostData({ author: '', title: '', message: '', tags: '', selectedFile: '' });
    }


    return (
        <Paper className={styles.paper}>
            <form autoComplete="off" noValidate method="post" className={`${styles.root} ${styles.form}`} onSubmit={submitForm}>
                <Typography variant="h6" >{currentPostID ? 'Edit' : 'Make'} a Memnory</Typography>
                <TextField
                    name="author"
                    variant="standard"
                    label="username"
                    fullWidth
                    className={styles.inputField}
                    value={postData.author}
                    onChange={event => setPostData({ ...postData, author: event.target.value.trim() })}
                />
                <TextField
                    name="title"
                    variant="standard"
                    label="Title"
                    fullWidth
                    className={styles.inputField}
                    value={postData.title}
                    onChange={event => setPostData({ ...postData, title: event.target.value.trim() })}
                />
                <TextField
                    name="message"
                    variant="standard"
                    label="Message"
                    fullWidth
                    className={styles.inputField}
                    value={postData.message}
                    onChange={event => setPostData({ ...postData, message: event.target.value })}
                />
                <TextField
                    name="tags"
                    variant="standard"
                    label="Tag"
                    fullWidth
                    className={styles.inputField}
                    value={postData.tags}
                    onChange={event => setPostData({ ...postData, tags: event.target.value.split(',') })}
                />
                <div className={styles.fileInput}>
                    <FileBase64 type='file' mutiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div >
                <Button type='submit' className={styles.buttonSubmit} variant='contained' color="primary" size='large' fullWidth>Submit</Button>
            </form >
        </Paper >
    )
}

export default Form;