import { api } from "../../service/api";
import * as types from "../Constants";

export const addevent = (data) => {
  const options = { url: "events" };
  options.types = [types.CREATE_EVENT_SUCCESS, types.CREATE_EVENT_FAILURE];

  return api.post(options, data);
};

export const getDepartment = () => {
  const options = { url: "events/department" };
  options.types = [types.GET_DEPARTMENT_SUCCESS, types.GET_DEPARTMENT_FAILURE];

  return api.get(options);
};
export const getEvents = (url) => {
  const options = { url: url };
  options.types = [types.GET_EVENT_SUCCESS, types.GET_EVENT_FAILURE];

  return api.get(options);
};
export const getMyEvents = () => {
  const options = { url: "events/my-events" };
  options.types = [types.GET_EVENT_SUCCESS, types.GET_EVENT_FAILURE];

  return api.get(options);
};

export const editEvent = (data) => {
  const options = { url: "events" };
  options.types = [types.CREATE_EVENT_SUCCESS, types.CREATE_EVENT_FAILURE];

  return api.put(options, data);
};

export const getEventDetail = (url) => {
  const options = { url: url };
  options.types = [types.GETEVENTDETAIL_SUCCESS, types.GETEVENTDETAIL_FAILURE];

  return api.get(options);
};

export const interestedEvent = (data) => {
  const options = { url: `events/register` };
  options.types = [
    types.INTERESTED_EVENT_SUCCESS,
    types.INTERESTED_EVENT_FAILURE,
  ];

  return api.post(options, data);
};

export const notinterestedEvent = (url) => {
  const options = { url: url };
  options.types = [
    types.NOTINTERESTED_EVENT_SUCCESS,
    types.NOTINTERESTED_EVENT_FAILURE,
  ];

  return api.deleted(options);
};

export const deleteEvent = (id) => {
  const options = { url: `events/${id}` };
  options.types = [types.DELETE_EVENT_SUCCESS, types.DELETE_EVENT_FAILURE];

  return api.deleted(options);
};
