import axios from 'axios';

// const API = axios.create({ baseURL: 'https://blog-app-server-sandy.vercel.app/' });
// const API = axios.create({ baseURL: 'http://localhost:5000' });
export const baseURL = 'https://blog-app-server-sandy.vercel.app/';
const API = axios.create({ baseURL });

API.interceptors.request.use((req) => { //sử dụng hàm này để gửi jwt qua middleware auth server
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        //Bearer tokens thường được sử dụng trong các giao thức xác thực như OAuth 2.0 và JSON Web Tokens (JWTs).
    }
    return req;
});
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`); //gọi qua backend để lấy dữ liệu
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost); //hiểu đơn giản là mình phải truyền dữ liệu cho nó nên đặt là newPost thôi
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const deletePost = (id) => API.delete(`/posts/${id}`);

// export const uploadImage = () => API.post('/posts/uploads', formData, 'json', 'multipart/form-data')
//     .then(res => {
//         resolve({
//             default: `${API}/${res.data.url}`
//         })
//     });

export const uploadImage = (path, formData) => API.post(`/${path}`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
