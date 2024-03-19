import * as types from "../Constants/index";
// import { openNotificationWithIcon } from "../../Components/Common/reUseFunctions";

export const MedicalConsulationReducer = (state = {}, action) => {
  switch (action.type) {
    // eslint-disable-next-line no-fallthrough
    case types.CREATE_DOCTOR_CONSULTATION_SUCCESS:
      return { ...state, submitSchedulelRes: action.payload };
    case types.CREATE_DOCTOR_CONSULTATION_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }
    // switch (action.type) {
    // eslint-disable-next-line no-fallthrough
    case types.ADDSCHEDULE_SUCCESS:
      return { ...state, addScheduleRes: action.payload };
    case types.ADDSCHEDULE_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }
    case types.GETSCHEDULE_SUCCESS:
      if (action.payload.response === "GETSCHEDULE_SUCCESS") {
        window.location.assign("/schedule");
      }
      return { ...state, GetAppointmentRes: action.payload };
    case types.GETSCHEDULE_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/schedule");
      }
    case types.EDITSCHEDULE_SUCCESS:
      if (action.payload.response === "EDITSCHEDULE_SUCCESS") {
        window.location.assign("/schedule");
      }
      return { ...state, EditAppointmentRes: action.payload };
    case types.EDITSCHEDULE_FAILURE:
      if (action.payload.response === "undefined") {
        window.location.assign("/schedule");
      }

    case types.DELETESCHEDULE_SUCCESS:
      if (action.payload.response === "DELETESCHEDULE_SUCCESS") {
        window.location.assign("/schedule");
      }
      return { ...state, DeleteAppointmentRes: action.payload };
    case types.DELETESCHEDULE_FAILURE:
      if (action.payload.response === "undefined") {
        window.location.assign("/schedule");
      }

    case types.SCHEDULELEAVE_SUCCESS:
      if (action.payload.response === "SCHEDULELEAVE_SUCCESS") {
        window.location.assign("/schedule");
      }
      return { ...state, ScheduleLeaveRes: action.payload };
    case types.SCHEDULELEAVE_FAILURE:
      if (action.payload.response === "undefined") {
        window.location.assign("/schedule");
      }

    case types.GETOVERVIEW_SUCCESS:
      if (action.payload.response === "GETOVERVIEW_SUCCESS") {
        window.location.assign("/schedule");
      }
      return { ...state, ScheduleLeaveRes: action.payload };
    case types.GETOVERVIEW_FAILURE:
      if (action.payload.response === "undefined") {
        window.location.assign("/schedule");
      }

    case types.CREATE_DOCTOR_VISITING_SUCCESS:
      return { ...state, submitvisitingRes: action.payload };
    case types.CREATE_DOCTOR_VISITING_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }

    case types.GETCONSULATIONSCHARGES_SUCCESS:
      return { ...state, GetConsulationchargesRes: action.payload };
    case types.GETCONSULATIONSCHARGES_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }

    case types.FIND_DOCTOR_FOR_CONSULTATION_SUCCESS:
      return { ...state, findDoctorResforConsult: action.payload };

    case types.FIND_DOCTOR_FOR_CONSULTATION_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/dashboard");
      }
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
  // }
};
