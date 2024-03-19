import { combineReducers } from "redux";
import { userReducer } from "./User";
import { sideBarReducer } from './sideBar'


const reducersObj = {
  userReducer,
  sideBarReducer
};

export default combineReducers(reducersObj);
