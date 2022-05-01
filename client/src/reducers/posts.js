export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'ADD_NEW':
            return [...posts, action.payload];
        default:
            return posts;
    }
}