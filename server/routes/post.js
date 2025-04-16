import express from 'express';
import { getPosts, getPost, getPostsBySearch, createPost, updatePost, deletePost, likePost, commentPost, uploadImage } from '../controllers/posts.js';
import auth from '../middleware/auth.js';
import multipart from 'connect-multiparty';

// Configure multipart middleware with the correct upload directory
const MultipartyMiddleware = multipart({ 
    uploadDir: 'public/uploads',
    maxFilesSize: 10 * 1024 * 1024 // 10MB
});

const router = express.Router();

// Image upload route - no auth required for CKEditor
router.post("/upload", MultipartyMiddleware, uploadImage);

// Other routes
router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);
router.delete('/:id', auth, deletePost);

export default router;