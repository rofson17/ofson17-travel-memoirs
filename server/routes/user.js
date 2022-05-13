import Router from 'express';

import { singup, singin } from '../controllers/user.js';

const router = Router();

router.post('/singin', singin);
router.post('/singup', singup);

export default router;