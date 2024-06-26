import express from 'express';
import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js" //nhớ phải thêm .js
import Image from "../models/image.js" //nhớ phải thêm .js
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();//để dùng được cái ckeditor, đoạn này cài tùm lum thứ hết =))
import multer from 'multer';

const router = express.Router(); //tại sao lại export thêm cái router ở đây nhỉ

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Thư mục lưu trữ file upload
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Đặt tên file cho file upload
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Khởi tạo middleware Multer với cấu hình đã định nghĩa
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // Giới hạn kích thước file upload (ở đây là 10MB)
    },
    fileFilter: (req, file, cb) => {
        // Kiểm tra loại file được phép upload
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file format. Please upload a PNG or JPG file.'));
        }
    }
}).single('upload'); // Chỉ cho phép upload một file với key là 'upload'

export const uploadImage = async (req, res) => {

    var TempFile = req.files.upload;
    var TempPathfile = TempFile.path;
    console.log("TempFile is: ");
    console.log(TempFile);
    console.log("TempPathfile is: "); //public\images\uVj_xCATOF_G_TxGOsnWjSXt.jpg
    console.log(TempPathfile);
    const targetPathUrl = path.join(__dirname, "./uploads/" + TempFile.name);
    console.log("targetPathUrl is: ");
    console.log(targetPathUrl);

    // Sử dụng middleware Multer để xử lý upload file
    console.log("Vào uploadImage");
    upload(req, res, (err) => {

        fs.rename(TempPathfile, targetPathUrl, err => { //di chuyển file từ đường dẫn tạm thời sang đường dẫn mục tiêu
            if (err) {
                console.log(err.message);
                res.status(500).json({
                    uploaded: false,
                    error: "Error uploading image"
                });
            } else {
                const imageUrl = `${TempFile.name}`;
                res.status(200).json({
                    uploaded: true,
                    url: imageUrl
                });
            };
        });
    });
};

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 6; //the number of posts per page
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({}); //now how many post do we have, cause we have to 
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Khác nhau khi truyền req.query và req.params:
//query thường dùng khi muốn query some data like search
//params dùng khi muốn get some specific resource, vd như posts/:id 
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        // const postMessages = await PostMessage.find()
        const title = new RegExp(searchQuery, 'i');

        const posts = await PostMessage.find(
            {
                $or: [
                    { title: title },
                    { tags: { $in: tags.split(',') } }
                ] //tìm 1 trong 2 hoặc cả 2. Tags là 1 cái mảng nên cần thêm $in
            })
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    // console.log(post);
    if (!post?.title || !post?.message) return res.status(404).json({ message: 'please fill this input' });

    const tags = post?.tags?.map((tag) => tag.trim());

    const newPostMessage = new PostMessage({ ...post, tags: tags, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    const tags = post.tags.map((tag) => tag.trim());

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, tags: tags, _id }, { new: true });

    res.json(updatedPost); //trả lại chuỗi json cho frontend sau khi đã update
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that id: ` + id)

    await PostMessage.findByIdAndDelete(id)
    res.json({ message: 'Post deleted successfully' })
}
export const likePost = async (req, res) => {
    const { id } = req.params; //id bài post
    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that id: ` + id);

    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) { //index bắt đầu từ 0, cho = -1 nghĩa là chưa tồn tại index => chưa like.
        //like the post
        post.likes.push(req.userId); //thêm likes vào post
    } else {
        //dislike the post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    // console.log(`like count:` + updatedPost.likeCount);
    // console.log(typeof updatedPost.likeCount);
    res.json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);
    post.comments.push(value);

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, { new: true });//tìm post phù hợp, push cmt vào property cmts, sau đó update trong db
    res.json(updatePost);
};


export default router;