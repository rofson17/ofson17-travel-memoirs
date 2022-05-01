import express from 'express';
import { getPosts, newPost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', newPost)

export default router;