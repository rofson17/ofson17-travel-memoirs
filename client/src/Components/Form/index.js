import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from 'react-file-base64';
import swal from 'sweetalert';

import useStyles from "./styles";
import { newPost, updatePost } from '../../action/posts'


const initialPostData = { title: '', message: '', tags: [], selectedFile: '' };

const Form = ({ currentPostID, setCurrentPostID }) => {
    const [postData, setPostData] = useState(initialPostData);
    const styles = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector((state) => currentPostID ? state.posts.find(p => p._id === currentPostID) : null);


    useEffect(() => {
        if (post)
            setPostData(post)
    }, [post]);

    const submitForm = event => {
        event.preventDefault();

        if (!postData.title || !postData.message || !postData.tags || !postData.selectedFile) {
            swal({
                title: "Warning",
                text: "Please fill all input field",
                icon: "warning",
            })
            return;
        }

        if (currentPostID === null)
            dispatch(newPost({ ...postData, name: user?.result.name }));
        else
            dispatch(updatePost(currentPostID, { ...postData, name: user?.result.name }));

        swal({
            title: 'Success',
            text: 'Memory has been added',
            icon: 'success'
        })

        setCurrentPostID(null);
        setPostData(initialPostData);
    }

    if (!user?.result.name) {
        return (
            <Paper className={styles.paper}>
                <Typography variant="h6" align="center">Please sing in to create your own memoirs</Typography>
            </Paper>
        )
    }

    return (
        <Paper className={styles.paper} elevation={6}>
            <form autoComplete="off" noValidate method="post" className={`${styles.root} ${styles.form}`} onSubmit={submitForm}>
                <Typography variant="h6" >{currentPostID ? 'Edit' : 'Make'} a Memnory</Typography>

                <TextField name="title" label="Title" fullWidth
                    className={styles.inputField} value={postData.title} onChange={event => setPostData({ ...postData, title: event.target.value })} />

                <TextField name="tags" label="Tag" fullWidth className={styles.inputField}
                    value={postData.tags} onChange={event => setPostData({ ...postData, tags: event.target.value.split(',') })} />

                <TextField name="message" label="Message" fullWidth multiline minRows={3} className={styles.inputField} value={postData.message} onChange={event => setPostData({ ...postData, message: event.target.value })} />

                <div className={styles.fileInput}>
                    <FileBase64 type='file' mutiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div >

                <Button type='submit' className={styles.buttonSubmit} variant='contained' color="primary" size='large' fullWidth>Submit</Button>
            </form >
        </Paper >
    )
}

export default Form;