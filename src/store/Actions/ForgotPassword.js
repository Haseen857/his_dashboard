import { api } from "../../service/api";
import * as types from "../Constants";

export const forgotPassword = (data, url) => {
  const options = { url: url };
  options.types = [types.FORGOTPASSWORD_SUCCESS, types.FORGOTPASSWORD_FAILURE];

  return api.authRegister(options, data);
};
