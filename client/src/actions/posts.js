import * as api from '../api'
import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT, UPLOAD_IMAGE } from '../constants/actionTypes';

//Action Creators, file action sẽ fetch dữ liệu ở api ra, gửi cho App.js
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page); //call api để lấy dữ liệu từ backend
        // console.log("Dữ liệu trả về fe khi getPosts");
        // console.log(data);
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } }); //sau đó gửi đến xử lí ở reducers, lưu vào store
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err.message);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id); //call api để lấy dữ liệu từ backend
        // console.log("Trả dữ liệu getPost ở action");
        // console.log(data);
        dispatch({ type: FETCH_POST, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);//have to detructure the data 2 times, firts time cause we making an axios request, second time cause we put it in a new object
        //lần 2, tức là bên be mình trả về dạng object, nên bên này phải viết lại như vậy, thế thôi
        // console.log("Trả dữ liệu getPostsBySearch ở action");
        // console.log(data);
        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: START_LOADING });// để ở dưới dispatch để khi mình createpost mà ko điền thì nó sẽ ko chạy cái loading trước

        // console.log("Khởi chạy dispatch createPost");
        // console.log(post);
        history.push(`/posts/${data._id}`);
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const updatePost = (id, post, history) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: START_LOADING });

        dispatch({ type: UPDATE, payload: data });
        history.push(`/posts/${data._id}`);//sv trả về dạng _id
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const likePost = (id, history) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id); //call api, tăng likeCount lên 1 đơn vị, trả lại data là đối tượng đã tăng like
        // console.log("Khởi chạy dispatch likePost");
        // console.log(data);
        dispatch({ type: LIKE, payload: data }); //bắn qua reducers, lưu vào store, render lại màn hình
    } catch (err) {
        console.log(err);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    console.log("Khởi chạy dispatch commentPost");
    try {
        const { data } = await api.comment(value, id);

        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (err) {
        console.log(err);
    }
}

// export const uploadImage = () => async (dispatch) => {
//     try {
//         const { data } = await api.uploadImage();
//         dispatch({ type: UPLOAD_IMAGE, payload: data });

//     } catch (err) {
//         console.log(err);
//     }
// }