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

app.use(express.static("uploads"));
app.use('/posts', postRoutes); //phải đặt cái use route này ở sau xác nhận cors
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING');
});


// app.post('/upload', MultipartyMiddleware, (req, res) => {
//     // console.log("up ảnh lên");
//     // console.log(req.files.upload);
//     var TempFile = req.files.upload;
//     var TempPathfile = TempFile.path;
//     console.log("TempPathfile is: "); //public\images\uVj_xCATOF_G_TxGOsnWjSXt.jpg
//     console.log(TempPathfile);
//     const targetPathUrl = path.join(__dirname, "./public/uploads" + TempFile.name);
//     console.log(targetPathUrl);//C:\laragon\www\CinemaProject\memories_project\server\public\uploads\du-lich-da-nang-thang-7-thumb-1.jpg

//     if (path.extname(TempFile.originalFilename).toLowerCase() === ".png" || ".jpg") {

//         fs.rename(TempPathfile, targetPathUrl, err => {//di chuyển file từ đường dẫn tạm thời sang đường dẫn mục tiêu

//             res.status(200).json({
//                 uploaded: true,
//                 url: `${TempFile.originalFilename}`
//             });

//             if (err) return console.log(err.message);
//         });
//     }


// })

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log(error.message));