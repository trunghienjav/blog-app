import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => { //hàm reducer gồm 2 tham số state và action. State phải là 1 initial value
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_POST:
            return { ...state, post: action.payload.data };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] }; //return data cũ + data mới, nếu ko rãi nó ra thì khi create nó chỉ tạo 1 thèn, bỏ thèn cũ đi
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }; //bt mảng posts trả về các post ko có id kèm, nếu có id kèm theo thì nó là update, đúng thì lấy action.payload (gồm post và id) còn sai thì lấy mỗi post
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id == +action.payload._id) {
                        return action.payload;
                    }
                    return post;
                }),
            };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }; //chỉ lấy lại những thèn khác action payload
        default:
            return state;
    }
}