import { api } from "../../service/api";
import * as types from "../Constants";

export const addproductads = (data, url) => {
  const options = { url: url };
  options.types = [types.ADDPRODUCTADS_SUCCESS, types.ADDPRODUCTADS_FAILURE];

  return api.post(options, data);
};

export const VerifyAdvertisement = (data, url) => {
  const options = { url: url };
  options.types = [
    types.VERIFYADVERTISEMENT_SUCCESS,
    types.VERIFYADVERTISEMENT_FAILURE,
  ];

  return api.patch(options, data);
};
// export const getDoctorDetail = (url) => {
//   const options = { url: url };
//   options.types = [
//     types.GETDOCTORDETAIL_SUCCESS,
//     types.GETDOCTORDETAIL_FAILURE,
//   ];

//   return api.get(options);
// };

export const GetProductAds = (url) => {
  const options = { url: url };
  options.types = [types.GETPRODUCTADS_SUCCESS, types.GETPRODUCTADS_FAILURE];

  return api.get(options);
};

// export const findDoctor = (url) => {
//   const options = {
//     url: url,
//   };
//   options.types = [types.FINDDOCTOR_SUCCESS, types.FINDDOCTOR_FAILURE];

//   return api.getId(options);
// };

// export const uploadDoctor = (data) => {
//   const options = { url: "doctors/upload/documents" };
//   options.types = [types.UPLOAD_DOCTOR_SUCCESS, types.UPLOAD_DOCTOR_FAILURE];

//   return api.uploadMultipleFiles(options, data);
// };

// export const getCountry = (data) => {
//   const options = { url: "https://countriesnow.space/api/v0.1/countries" };
//   options.types = [types.GETCOUNTRY_SUCCESS, types.GETCOUNTRY_FAILURE];

//   return api.getcountry(options, data);
// };

// export const editDoctor = (data, url) => {
//   const options = { url: url };
//   options.types = [types.EDITDOCTOR_SUCCESS, types.EDITDOCTOR_FAILURE];

//   return api.putWithFormData(options, data);
// };

// export const StatusChangeDoctor = (url) => {
//   const options = { url: url };
//   options.types = [
//     types.STATUSCHANGEDOCTOR_SUCCESS,
//     types.STATUSCHANGEDOCTOR_FAILURE,
//   ];

//   return api.patchWithoutParm(options);
// };
