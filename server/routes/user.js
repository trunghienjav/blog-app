import express from 'express';

import { signin, signup } from '../controllers/users.js'; //nhớ thêm .js vào

const router = express.Router()

router.post('/signin', signin);
router.post('/signup', signup);

export default router;