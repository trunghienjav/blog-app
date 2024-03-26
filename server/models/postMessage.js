import mongoose from "mongoose";

const  postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String, //lấy theo userId
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
        //likes là 1 cái mảng chứa các id của user, tổng số lượng like sẽ bằng số lượng phần tử trong mảng
    },
    comments: {
        type: [String],
        default: [],
    },
    createAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema)
export default PostMessage