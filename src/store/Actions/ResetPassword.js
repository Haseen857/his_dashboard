import { api } from "../../service/api";
import * as types from "../Constants";

export const Resetpassword = (data, url) => {
  const options = { url: url };
  options.types = [types.RESETPASSWORD_SUCCESS, types.RESETPASSWORD_FAILURE];

  return api.post(options, data);
};
