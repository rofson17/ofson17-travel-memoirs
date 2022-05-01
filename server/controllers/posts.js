import PostsMessage from '../models/postMessage.js';


export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostsMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const newPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostsMessage(post);

    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }

}