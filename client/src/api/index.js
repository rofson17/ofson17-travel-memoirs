import axios from 'axios'

const url = '/posts/';

export const fetchPosts = () => axios.get(url);

export const newPost = (postData) => axios.post(url, postData);