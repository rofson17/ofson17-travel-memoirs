import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import FileBase64 from 'react-file-base64';
import swal from 'sweetalert';

import useStyles from "./styles";
import { newPost } from '../../action/posts'



const Form = () => {
    const [postData, setPostData] = useState({ username: '', title: '', message: '', tags: '', selectedFile: '' });
    const styles = useStyles();
    const dispatch = useDispatch();


    const handleInputEvent = e => {
        const { name, value } = e.target;
        setPostData(preValue => {
            return {
                ...preValue, [name]: value
            }
        });
    }

    const submitForm = e => {
        e.preventDefault();

        const { username, title, message, tags, selectedFile } = postData;

        if (!username || !title || !message || !tags || !selectedFile) {
            swal({
                title: "Warning",
                text: "Please enter a valid username",
                icon: "warning",
            })
            return;
        }

        dispatch(newPost({ title: title.trim(), message: message, author: username.trim(), selectedFile: selectedFile, tags: tags.split(' ') }));
        swal({
            title: 'Success',
            text: 'Memory has been added',
            icon: 'success'
        })
    }


    return (
        <Paper className={styles.paper}>
            <form autoComplete="off" noValidate method="post" className={`${styles.root} ${styles.form}`} onSubmit={submitForm}>
                <Typography variant="h6" >Make a Memnory</Typography>
                <TextField
                    name="username"
                    variant="standard"
                    label="username"
                    fullWidth
                    className={styles.inputField}
                    value={postData.username}
                    onChange={handleInputEvent}
                />
                <TextField
                    name="title"
                    variant="standard"
                    label="Title"
                    fullWidth
                    className={styles.inputField}
                    value={postData.title}
                    onChange={handleInputEvent}
                />
                <TextField
                    name="message"
                    variant="standard"
                    label="Message"
                    fullWidth
                    className={styles.inputField}
                    value={postData.message}
                    onChange={handleInputEvent}
                />
                <TextField
                    name="tags"
                    variant="standard"
                    label="Tag"
                    fullWidth
                    className={styles.inputField}
                    value={postData.tags}
                    onChange={handleInputEvent}
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