import { api } from "../../service/api";
import * as types from "../Constants";

export const getUserProfile = () => {
  const options = { url: `profile` };
  options.types = [
    types.RETRIEVE_PROFILE_SUCCESS,
    types.RETRIEVE_PROFILE_FAILURE,
  ];

  return api.get(options);
};

export const sendotp = (data) => {
  const options = { url: `auth/smsotp` };
  options.types = [types.SENDOTP_SUCCESS, types.SENDOTP_FAILURE];

  return api.post(options, data);
};

export const saveotp = (data) => {
  const options = { url: `hr-company/verify/smsotp` };
  options.types = [types.SAVEOTP_SUCCESS, types.SAVEOTP_FAILURE];

  return api.post(options, data);
};

export const changeUserPassword = (data) => {
  const options = { url: "auth/token/changepassword" };
  options.types = [
    types.CHANGE_PASSWORD_SUCCESS,
    types.CHANGE_PASSWORD_FAILURE,
  ];

  return api.put(options, data);
};
