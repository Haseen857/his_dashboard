import { api } from "../../service/api";
import * as types from "../Constants";

export const signIn = (data) => {
  const options = { url: "auth/login" };
  options.types = [types.LOGIN_SUCCESS, types.LOGIN_FAILURE];

  return api.authLogin(options, data);
};

export const getProfile = (url) => {
  const options = { url: url };
  options.types = [types.GETDOCTORDETAIL_SUCCESS, types.GETDOCTORDETAIL_FAILURE];

  return api.get(options);
};

export const signUp = (data) => {
  const options = { url: "auth/register" };
  options.types = [types.REGISTER_SUCCESS, types.REGISTER_FAILURE];

  return api.authRegister(options, data);
};

export const logOut = () => {
  localStorage.clear();
  window.location.assign("/login");
  // const options = { url: 'v1/cmv/user/identity/Logout' } 
  // options.types = [
  //   types.LOGOUT_SUCCESS,
  //   types.LOGOUT_FAILURE
  // ];

  // return api.get(options); 
};
