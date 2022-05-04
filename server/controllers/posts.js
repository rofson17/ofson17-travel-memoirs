import mongoose from 'mongoose';
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

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: 'no post with the id' });
    const updatedPost = await PostsMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'no post with the id' });
    await PostsMessage.findByIdAndRemove(id);

    res.json({ message: 'post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'no post with the id' });

    const post = await PostsMessage.findById(id);
    const updatedPost = await PostsMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    res.json(updatedPost);
}