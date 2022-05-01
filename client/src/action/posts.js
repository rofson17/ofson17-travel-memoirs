import * as api from '../api/index';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}


export const newPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.newPost(post);
        dispatch({ type: 'ADD_NEW', payload: data });
    } catch (error) {
        console.log(error.message)
    }
}