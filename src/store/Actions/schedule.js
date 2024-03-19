import { api } from "../../service/api";
import * as types from "../Constants";

export const submitDoctorConsultationCharges = (
  data,
  consulationChargeId,
  url
) => {
  const options = { url: url };
  options.types = [
    types.CREATE_DOCTOR_CONSULTATION_SUCCESS,
    types.CREATE_DOCTOR_CONSULTATION_FAILURE,
  ];
  if (consulationChargeId) {
    data.id = consulationChargeId;
    return api.put(options, data);
  } else {
    return api.post(options, data);
  }
};

export const submitSlotInformation = (data) => {
  const options = { url: "doctors-slot" };
  options.types = [
    types.CREATE_DOCTOR_SLOT_SUCCESS,
    types.CREATE_DOCTOR_SLOT_FAILURE,
  ];
  // if (consulationChargeId) {
  //   data.id = consulationChargeId;
  //   options.url = `hospital-doctors/${data.doctorId}/doctor-charges`;
  //   return api.put(options, data);
  // } else {
  // const options_del = { url: `doctors-slot/doctors/${data.doctorId}` };
  // api.deleted(options_del)
  return api.put(options, data);
  // }
};

export const GetSlots = (id) => {
  const options = {
    url: `doctors-slot/doctors/${id}`,
  };
  options.types = [types.GET_SLOT_SUCCESS, types.GET_SLOT_FAILURE];

  return api.getId(options);
};
export const getDoctorforConsultation = (doctorName) => {
  const options = {
    url: `hospital-doctors/search?search=${doctorName}`,
  };
  options.types = [
    types.FIND_DOCTOR_FOR_CONSULTATION_SUCCESS,
    types.FIND_DOCTOR_FOR_CONSULTATION_FAILURE,
  ];

  return api.getId(options);
};

export const GetConsulationCharges = (id) => {
  const options = {
    url: `doctors-charges/doctor/${id}`,
  };
  options.types = [
    types.GETCONSULATIONSCHARGES_SUCCESS,
    types.GETCONSULATIONSCHARGES_FAILURE,
  ];

  return api.getId(options);
};

export const addSchedule = (data) => {
  const options = { url: "doctors-schedule" };
  options.types = [types.ADDSCHEDULE_SUCCESS, types.ADDSCHEDULE_FAILURE];
  return api.post(options, data);
};

export const GetAppointment = (id, startDate, endDate) => {
  const options = {
    url: `doctors-schedule?startDate=${startDate}&endDate=${endDate}&doctorId=${id}`,
  };
  options.types = [types.GETSCHEDULE_SUCCESS, types.GETSCHEDULE_FAILURE];

  return api.get(options);
};

export const EditAppointment = (data) => {
  const options = { url: "doctors-schedule" };
  options.types = [types.EDITSCHEDULE_SUCCESS, types.EDITSCHEDULE_FAILURE];
  return api.put(options, data);
};

export const DeleteAppointment = (ID) => {
  const options = { url: "doctors-schedule" };
  options.types = [types.DELETESCHEDULE_SUCCESS, types.DELETESCHEDULE_FAILURE];
  return api.deleted(options, ID);
};

export const ScheduleLeave = (data, url) => {
  const options = { url: url };
  options.types = [types.SCHEDULELEAVE_SUCCESS, types.SCHEDULELEAVE_FAILURE];
  return api.post(options, data);
};

export const GetOverview = (id, startDate, endDate) => {
  const options = {
    url: `doctors-schedule/overview?startDate=${startDate}&endDate=${endDate}&doctorId=${id}`,
  };
  options.types = [types.GETOVERVIEW_SUCCESS, types.GETOVERVIEW_FAILURE];

  return api.get(options);
};

export const submitDoctorVisitingHours = (data) => {
  const options = { url: "doctors-slot" };
  options.types = [
    types.CREATE_DOCTOR_VISITING_SUCCESS,
    types.CREATE_DOCTOR_VISITING_FAILURE,
  ];
  return api.post(options, data);
};
