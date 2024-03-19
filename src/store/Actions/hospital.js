import { api } from "../../service/api";
import * as types from "../Constants";

export const submitHospital = (data) => {
  const options = { url: "hospital" };
  options.types = [
    types.CREATE_HOSPITAL_SUCCESS,
    types.CREATE_HOSPITAL_FAILURE,
  ];

  return api.post(options, data);
};

export const submitHospitalAdmin = (data) => {
  const options = { url: "hospital/admin" };
  options.types = [
    types.CREATE_HOSPITAL_SUCCESS,
    types.CREATE_HOSPITAL_FAILURE,
  ];

  return api.post(options, data);
};

export const uploadDocumentsHospital = (data, url) => {
  const options = { url: url };
  options.types = [
    types.CREATE_HOSPITAL_SUCCESS,
    types.CREATE_HOSPITAL_FAILURE,
  ];

  return api.uploadMultipleFiles(options, data);
};

export const updateDocumentsHospital = (data, url) => {
  const options = { url: url };
  options.types = [
    types.CREATE_HOSPITAL_SUCCESS,
    types.CREATE_HOSPITAL_FAILURE,
  ];

  return api.uploadMultipleFilesPut(options, data);
};

export const LegalDocumentFromDoctor = (data) => {
  const options = { url: "hospital-doctors/documents" };
  options.types = [
    types.CREATE_HOSPITAL_SUCCESS,
    types.CREATE_HOSPITAL_FAILURE,
  ];

  return api.post(options, data);
};

export const uploadProfileHospital = (data) => {
  const options = { url: "hospital/upload" };
  options.types = [
    types.CREATE_HOSPITAL_SUCCESS,
    types.CREATE_HOSPITAL_FAILURE,
  ];

  return api.uploadMultipleFiles(options, data);
};

export const getHospital = (pg, limit) => {
  const options = { url: `hospital?page=${pg}&limit=${limit}` };
  options.types = [
    types.RETRIEVE_HOSPITALS_SUCCESS,
    types.RETRIEVE_HOSPITALS_FAILURE,
  ];

  return api.get(options);
};

// export const findHospital = (hospitalName) => {
//   const options = { url: `hospital/${hospitalName}` };
//   options.types = [types.FIND_HOSPITALS_SUCCESS, types.FIND_HOSPITALS_FAILURE];

//   return api.getId(options);
// };

export const findHospital = (hospitalName) => {
  const options = {
    url: `hospital/searchHospital/search?search=${hospitalName}`,
  };
  options.types = [types.FIND_HOSPITALS_SUCCESS, types.FIND_HOSPITALS_FAILURE];

  return api.getId(options);
};

export const findHospitalbyid = (id) => {
  const options = { url: `hospital/${id}` };
  options.types = [types.FIND_HOSPITALS_SUCCESS, types.FIND_HOSPITALS_FAILURE];

  return api.getId(options);
};

export const deleteHospital = (id) => {
  const options = { url: `hospital/${id}` };
  options.types = [
    types.DELETE_HOSPITAL_SUCCESS,
    types.DELETE_HOSPITAL_FAILURE,
  ];

  return api.deleted(options);
};

export const updateHospital = (id, data) => {
  const options = { url: `hospital/${id}` };
  options.types = [
    types.UPDATE_HOSPITAL_SUCCESS,
    types.UPDATE_HOSPITAL_FAILURE,
  ];

  return api.put(options, data);
};
