import mongoose from 'mongoose';
import PostsMessage from '../models/postMessage.js';


export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        // every page show 8 posts
        const LIMIT = 8;
        // starting index of every page
        const startIndex = (Number(page) - 1) * LIMIT;

        const totalPosts = await PostsMessage.countDocuments({})
        const posts = await PostsMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(totalPosts / LIMIT) });

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostsMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const newPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostsMessage({ ...post, author: req.userId, date: Date.now() });
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
    if (!req.userId) return res.status(401).json({ message: 'unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'no post with the id' });

    const post = await PostsMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) post.likes.push(req.userId);
    else post.likes = post.likes.filter(id => id !== String(req.userId));


    const updatedPost = await PostsMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');

        const posts = await PostsMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        res.status(200).json({ data: posts });


    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}