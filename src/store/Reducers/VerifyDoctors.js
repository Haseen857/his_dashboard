import * as types from "../Constants/index";
// import { openNotificationWithIcon } from "../../Components/Common/reUseFunctions";

export const DoctorVerificationRes = (state = {}, action) => {
  switch (action.type) {
    // eslint-disable-next-line no-fallthrough
    case types.GET_DOCTOR_FOR_VERIFICATION_SUCCESS:
      return { ...state, getDocumentsDetailsRes: action.payload };
    case types.GET_DOCTOR_FOR_VERIFICATION_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }

    case types.GET_DOCTOR_FOR_VERIFICATION_DOCUMENTS_SUCCESS:
      return { ...state, getDetailsRes: action.payload };
    case types.GET_DOCTOR_FOR_VERIFICATION_DOCUMENTS_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }
    case types.CREATE_DOCTOR_VERIFICATION_SUCCESS:
      return { ...state, submitDocumentsDetailsRes: action.payload };
    case types.CREATE_DOCTOR_VERIFICATION_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }

    case types.GET_HOSPITAL_FOR_VERIFICATION_SUCCESS:
      return { ...state, getHospitalsDocDetailsRes: action.payload };
    case types.GET_HOSPITAL_FOR_VERIFICATION_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }

    case types.GET_HOSPITAL_FOR_VERIFICATION_DOCUMENTS_SUCCESS:
      return { ...state, getHospitalsDetailsRes: action.payload };
    case types.GET_HOSPITAL_FOR_VERIFICATION_DOCUMENTS_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }
    case types.CREATE_HOSPITAL_VERIFICATION_SUCCESS:
      return { ...state, submitHospitalsDetailsRes: action.payload };
    case types.CREATE_HOSPITAL_VERIFICATION_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }

    case types.GET_INDIVIDUAL_DOCTOR_FOR_VERIFICATION_SUCCESS:
      return { ...state, getIndiDocRes: action.payload };
    case types.GET_INDIVIDUAL_DOCTOR_FOR_VERIFICATION_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }

    case types.GET_INDIVIDUAL_DOCTOR_FOR_VERIFICATION_DOCUMENTS_SUCCESS:
      return { ...state, getIndiDocDetailsRes: action.payload };
    case types.GET_INDIVIDUAL_DOCTOR_FOR_VERIFICATION_DOCUMENTS_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }
    case types.CREATE_INDIVIDUAL_DOCTOR_VERIFICATION_SUCCESS:
      return { ...state, submitIndiDocsDetailsRes: action.payload };
    case types.CREATE_INDIVIDUAL_DOCTOR_VERIFICATION_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("../");
      }

    default:
      return state;
  }
};
