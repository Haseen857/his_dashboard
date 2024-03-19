import { api } from "../../service/api";
import * as types from "../Constants";

export const otp = (url, data) => {
  debugger;
  const options = { url: url };
  options.types = [types.OTP_SUCCESS, types.OTP_FAILURE];

  return api.authRegister(options, data);
};

export const getProfile = (url) => {
  const options = { url: url };
  options.types = [
    types.GETDOCTORDETAIL_SUCCESS,
    types.GETDOCTORDETAIL_FAILURE,
  ];

  return api.get(options);
};
