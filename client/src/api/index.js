import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})



// post memoirs
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const newPost = (postData) => API.post('/posts', postData);
export const updatePost = (id, updatePost) => API.patch(`posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`posts/${id}`);
export const likePost = (id) => API.patch(`posts/${id}/likePost`);

// authenticate user
export const singIn = (formData) => API.post('/user/singin', formData);
export const singUp = (formData) => API.post('/user/singup', formData);
