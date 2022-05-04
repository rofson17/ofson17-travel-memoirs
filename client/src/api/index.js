import axios from 'axios'

const url = '/posts';

export const fetchPosts = () => axios.get(url);
export const newPost = (postData) => axios.post(url, postData);
export const updatePost = (id, updatePost) => axios.patch(`${url}/${id}`, updatePost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);