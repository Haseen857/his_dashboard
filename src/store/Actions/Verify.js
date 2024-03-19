import { api } from "../../service/api";
import * as types from "../Constants";

export const GetHospitalDoctorDocuments = (page, limit) => {
  const options = {
    url: `hospital-doctors/documents`,
  };
  options.types = [
    types.GET_DOCTOR_FOR_VERIFICATION_SUCCESS,
    types.GET_DOCTOR_FOR_VERIFICATION_FAILURE,
  ];

  return api.get(options);
};

export const detailsForVerification = (id) => {
  const options = { url: `doctors/${id}/documents` };
  options.types = [
    types.GET_DOCTOR_FOR_VERIFICATION_DOCUMENTS_SUCCESS,
    types.GET_DOCTOR_FOR_VERIFICATION_DOCUMENTS_FAILURE,
  ];

  return api.get(options);
};

export const submitDoctorVerification = (data, docId) => {
  const options = { url: `/hospital-doctors/${docId}/verify` };
  options.types = [
    types.CREATE_DOCTOR_VERIFICATION_SUCCESS,
    types.CREATE_DOCTOR_VERIFICATION_FAILURE,
  ];

  return api.patch(options, data);
};

export const GetHospitalsForVerification = (page, limit) => {
  const options = {
    url: `hospital/uploaded-documents?page=${page}&limit=${limit}`,
  };
  options.types = [
    types.GET_HOSPITAL_FOR_VERIFICATION_SUCCESS,
    types.GET_HOSPITAL_FOR_VERIFICATION_FAILURE,
  ];

  return api.get(options);
};

export const HospitalDetailsForVerification = (id) => {
  const options = { url: `hospital/${id}/documents` };
  options.types = [
    types.GET_HOSPITAL_FOR_VERIFICATION_DOCUMENTS_SUCCESS,
    types.GET_HOSPITAL_FOR_VERIFICATION_DOCUMENTS_FAILURE,
  ];

  return api.get(options);
};
export const HospitalSearchForVerification = (search) => {
  const options = {
    url: `hospital/search-uploaded-documents?search=${search}`,
  };
  options.types = [
    types.GET_HOSPITAL_FOR_VERIFICATION_DOCUMENTS_SUCCESS,
    types.GET_HOSPITAL_FOR_VERIFICATION_DOCUMENTS_FAILURE,
  ];

  return api.get(options);
};

export const submitHospitalVerification = (data, id) => {
  const options = { url: `admin/hospital/${id}/verify` };
  options.types = [
    types.CREATE_HOSPITAL_VERIFICATION_SUCCESS,
    types.CREATE_HOSPITAL_VERIFICATION_FAILURE,
  ];

  return api.patch(options, data);
};

export const GetIndivDoctorsForVerification = (page, limit) => {
  const options = {
    url: `doctors/uploaded/documents?page=${page}&limit=${limit}`,
  };
  options.types = [
    types.GET_INDIVIDUAL_DOCTOR_FOR_VERIFICATION_SUCCESS,
    types.GET_INDIVIDUAL_DOCTOR_FOR_VERIFICATION_FAILURE,
  ];

  return api.get(options);
};

export const IndivDoctorsDetailsForVerification = (id) => {
  const options = { url: `doctors/${id}/documents` };
  options.types = [
    types.GET_INDIVIDUAL_DOCTOR_FOR_VERIFICATION_DOCUMENTS_SUCCESS,
    types.GET_INDIVIDUAL_DOCTOR_FOR_VERIFICATION_DOCUMENTS_FAILURE,
  ];

  return api.get(options);
};
export const IndivDoctorsSearchForVerification = (search, type) => {
  const options = {
    url: `doctors/admin/verify/search?search=${search}&type=${type}`,
  };
  options.types = [
    types.GET_INDIVIDUAL_DOCTOR_FOR_VERIFICATION_DOCUMENTS_SUCCESS,
    types.GET_INDIVIDUAL_DOCTOR_FOR_VERIFICATION_DOCUMENTS_FAILURE,
  ];

  return api.get(options);
};

export const submitIndivDoctorsVerification = (data, id) => {
  const options = { url: `admin/doctor/${id}/verify` };
  options.types = [
    types.CREATE_INDIVIDUAL_DOCTOR_VERIFICATION_SUCCESS,
    types.CREATE_INDIVIDUAL_DOCTOR_VERIFICATION_FAILURE,
  ];

  return api.patch(options, data);
};
