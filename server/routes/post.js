import express from 'express';

import { getPosts, getPost, getPostsBySearch, createPost, updatePost, deletePost, likePost, commentPost, uploadImage } from '../controllers/posts.js'; //nhớ thêm .js vào
import auth from '../middleware/auth.js';

import multipart from 'connect-multiparty';
const MultipartyMiddleware = multipart({ uploadDir: 'public/images' });
const router = express.Router();


router.post("/upload", MultipartyMiddleware, uploadImage);
router.get('/', getPosts);
router.get('/search', getPostsBySearch);//luôn đặt cái này lên trên thèn có route /:id, vì hình như là nếu đặt cái getPost lên, nó sẽ kiếm theo cái id trước, mình ko truyền cho nó => lỗi
router.get('/:id', getPost);
router.post('/', auth, createPost); //thêm auth vào để xác định nó có quyền ko
router.patch('/:id', auth, updatePost); //patch phương thức là dùng để update
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);
router.delete('/:id', auth, deletePost);


export default router;