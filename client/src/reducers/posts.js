import { ADD_NEW, UPDATE, DELETE, LIKE, FETCH_ALL } from '../constants/actionType';


export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case ADD_NEW:
            return [...posts, action.payload];
        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}