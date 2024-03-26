import { AUTH, LOGOUT } from '../constants/actionTypes'

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            // login thành công, lưu thông tin vào storage
            return { ...state, authData: action?.payload };
        case LOGOUT:
            localStorage.clear();
            // login thành công, lưu thông tin vào storage
            return { ...state, authData: null };
        default:
            return state;
    }
}
export default authReducer; //hình như phải ghi vầy để tránh với thèn posts reducer