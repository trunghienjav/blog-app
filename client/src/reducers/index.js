import { combineReducers } from "redux"; //khi phát sinh ra nhiều reducer quản lí state, thì cần 1 cái combineReducers để kết hợp lại thành 1 reducer duy nhất

import posts from "./posts";
import authReducer from "./auth";

export default combineReducers({ posts, authReducer });