import * as types from "../Constants/index";
// import { openNotificationWithIcon } from "../../Components/Common/reUseFunctions";

export const hospitalReducer = (state = {}, action) => {
  switch (action.type) {
    // eslint-disable-next-line no-fallthrough
    case types.CREATE_HOSPITAL_SUCCESS:
      // if (action.payload.response === "CREATE_HOSPITAL_SUCCESS") {
      return {
        ...state,
        submitHospitalRes: action.payload,
        LegalDocumentFromDoctorRes: action.payload,
      };
    case types.CREATE_HOSPITAL_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/viewhospital");
      }
    case types.UPLOAD_HOSPITAL_SUCCESS:
      // if (action.payload.response === "CREATE_HOSPITAL_SUCCESS") {
      return { ...state, uploadHospitalRes: action.payload };
    case types.UPLOAD_HOSPITAL_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/viewhospital");
      }
    // eslint-disable-next-line no-duplicate-case
    // eslint-disable-next-line no-fallthrough
    // eslint-disable-next-line no-duplicate-case
    case types.RETRIEVE_HOSPITALS_SUCCESS:
      // if (action.payload.response === "CREATE_HOSPITAL_SUCCESS") {
      return { ...state, getHospitalRes: action.payload };

    // eslint-disable-next-line no-duplicate-case
    case types.RETRIEVE_HOSPITALS_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/viewhospital");
      }

    case types.FIND_HOSPITALS_SUCCESS:
      return { ...state, findHospitalRes: action.payload };

    case types.FIND_HOSPITALS_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/viewhospital");
      }

    case types.UPDATE_HOSPITAL_SUCCESS:
      return { ...state, updateHospitalRes: action.payload };

    case types.UPDATE_HOSPITAL_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/viewhospital");
      }

    case types.DELETE_HOSPITAL_SUCCESS:
      return { ...state, deleteHospitalRes: action.payload };

    case types.DELETE_HOSPITAL_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/viewhospital");
      }

    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};
