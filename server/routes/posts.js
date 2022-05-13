import express from 'express';

import { getPosts, newPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, newPost)
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;