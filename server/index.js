import express from 'express';
import bodyParser from 'body-parser'; //là một middleware giúp xử lý dữ liệu đến từ phần thân của các yêu cầu HTTP với định dạng JSON.
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes); //phải đặt cái use route này ở sau xác nhận cors
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log(error.message));