import { api } from "../../service/api";
import * as types from "../Constants";

export const addedVacancy = (data, url) => {
  const options = { url: url };
  options.types = [types.ADDHR_SUCCESS, types.ADDHR_FAILURE];

  return api.post(options, data);
};

export const AddHR = (data, url) => {
  const options = { url: url };
  options.types = [types.ADDHR_SUCCESS, types.ADDHR_FAILURE];

  return api.post(options, data);
};

export const GetHRDetail = (url) => {
  const options = { url: url };
  options.types = [types.GETHRDETAIL_SUCCESS, types.GETHRDETAIL_FAILURE];

  return api.get(options);
};

export const getdropdownlist = (url) => {
  const options = { url: url };
  options.types = [
    types.GETDROPDOWNLIST_SUCCESS,
    types.GETDROPDOWNLIST_FAILURE,
  ];

  return api.get(options);
};

export const GethrList = (url) => {
  const options = { url: url };
  options.types = [types.GETHRLIST_SUCCESS, types.GETHRLIST_FAILURE];

  return api.get(options);
};

export const GetCandidateList = (url) => {
  const options = { url: url };
  options.types = [
    types.GETCANDIDATELIST_SUCCESS,
    types.GETCANDIDATELIST_FAILURE,
  ];

  return api.get(options);
};

export const GetAdvertisement = (url) => {
  const options = { url: url };
  options.types = [
    types.GETADVERTISEMENT_SUCCESS,
    types.GETADVERTISEMENT_FAILURE,
  ];

  return api.get(options);
};

export const GetAdvertisementDetail = (url) => {
  const options = { url: url };
  options.types = [
    types.GETADVERTISEMENTDETAIL_SUCCESS,
    types.GETADVERTISEMENTDETAIL_FAILURE,
  ];

  return api.get(options);
};

export const GetHRList = (url) => {
  const options = { url: url };
  options.types = [types.GETHR_SUCCESS, types.GETHR_FAILURE];

  return api.get(options);
};

export const Gethrvacancy = (id) => {
  const options = { url: `vacancy/user/${id}` };
  options.types = [types.GETHRVACANCY_SUCCESS, types.GETHRVACANCY_FAILURE];

  return api.get(options);
};

export const getappliedcandidate = (url) => {
  const options = { url: url };
  options.types = [
    types.GETAPPLIEDCANDIDATE_SUCCESS,
    types.GETAPPLIEDCANDIDATE_FAILURE,
  ];

  return api.get(options);
};

export const GetAppliedCandidateDetail = (url) => {
  const options = { url: url };
  options.types = [
    types.GETAPPLIEDCANDIDATEDETAIL_SUCCESS,
    types.GETAPPLIEDCANDIDATEDETAIL_FAILURE,
  ];

  return api.get(options);
};

export const AddFilterCandidate = (data, url) => {
  const options = { url: url };
  options.types = [
    types.ADDFILTERCANDIDATE_SUCCESS,
    types.ADDFILTERCANDIDATE_FAILURE,
  ];

  return api.post(options, data);
};

export const getfilteredcandidate = (url) => {
  const options = { url: url };
  options.types = [
    types.GETFILTEREDCANDIDATE_SUCCESS,
    types.GETFILTEREDCANDIDATE_FAILURE,
  ];

  return api.get(options);
};

export const GetFilteredCandidateDetail = (url) => {
  const options = { url: url };
  options.types = [
    types.GETFILTEREDCANDIDATEDETAIL_SUCCESS,
    types.GETFILTEREDCANDIDATEDETAIL_FAILURE,
  ];

  return api.get(options);
};

export const AddSelectCandidate = (data, url) => {
  const options = { url: url };
  options.types = [
    types.ADDSELECTCANDIDATE_SUCCESS,
    types.ADDSELECTCANDIDATE_FAILURE,
  ];

  return api.post(options, data);
};

export const getshortlistcandidate = (url) => {
  const options = { url: url };
  options.types = [
    types.GETSHORTLISTCANDIDATE_SUCCESS,
    types.GETSHORTLISTCANDIDATE_FAILURE,
  ];

  return api.get(options);
};

export const GetShortlistCandidateDetail = (url) => {
  const options = { url: url };
  options.types = [
    types.GETSHORTLISTEDCANDIDATEDETAIL_SUCCESS,
    types.GETSHORTLISTEDCANDIDATEDETAIL_FAILURE,
  ];

  return api.get(options);
};

export const gethrvacancyDetail = (url) => {
  const options = { url: url };
  options.types = [
    types.GETHRVACANCYDETAIL_SUCCESS,
    types.GETHRVACANCYDETAIL_FAILURE,
  ];

  return api.get(options);
};

export const submitAcceptance = (data, id, url) => {
  const options = { url: url };
  options.types = [
    types.SUBMITACCEPTANCE_HR_SUCCESS,
    types.SUBMITACCEPTANCE_HR_FAILURE,
  ];

  return api.patch(options, data);
};

export const GetCountry = (data) => {
  const options = { url: "https://countriesnow.space/api/v0.1/countries" };
  options.types = [types.GETCOUNTRY_SUCCESS, types.GETCOUNTRY_FAILURE];

  return api.getcountry(options, data);
};

export const editHR = (data, url) => {
  const options = { url: url };
  options.types = [types.EDITHR_SUCCESS, types.EDITHR_FAILURE];

  return api.put(options, data);
};

export const getHRDetail = (url) => {
  const options = { url: url };
  options.types = [types.GETHRDETAIL_SUCCESS, types.GETHRDETAIL_FAILURE];

  return api.get(options);
};

export const deletevacancy = (id) => {
  const options = { url: `vacancy/${id}` };
  options.types = [types.DELETEVACANCY_SUCCESS, types.DELETEVACANCY_FAILURE];

  return api.deleted(options);
};
