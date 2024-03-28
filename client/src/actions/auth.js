import * as api from '../api'
import { AUTH } from '../constants/actionTypes';

export const signin = (formatData, history) => async (dispatch) => { //có thể hiểu là: function signin(formatData, history)
    try {
        const { data } = await api.signIn(formatData); //call api, đẩy dử liệu qua be, be check ok, trả lại cho fe, lưu vào store
        dispatch({ type: AUTH, payload: data});
        history.push('/');
    } catch (err) {
        console.log("in ra lỗi");
        console.log(err);
        throw err;
    }
};

export const signup = (formatData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formatData);
        dispatch({ type: AUTH, payload: data});
        history.push('/');
    } catch (err) {
        console.log(err);
        throw err;
    }
};