// import jwt_Decode from "jwt-decode";
import * as types from "../Constants";
// import { openNotificationWithIcon } from "../../Components/Common/reUseFunctions";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      if (action.payload.response === "REGISTER_SUCCESS") {
        window.location.assign("/login");
      }
      return { ...state, signUpRes: action.payload };
    case types.REGISTER_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/Register");
      }

    case types.LOGIN_SUCCESS:
      // if (action.payload.accessToken) {
      //
      //   localStorage.setItem(
      //     "AccessToken",
      //     JSON.stringify(action.payload.accessToken)
      //   );
      //   addSpecificUserEmail(action.payload.email);
      //   window.location.assign("/email");
      // }
      return { ...state, signInRes: action.payload };
    case types.LOGIN_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/login");
      }

    // // case types.GET_SESSION_SUCCESS:
    //   return { ...state, sessionRes: action.payload };
    // case types.GET_SESSION_FAILURE:
    //   openNotificationWithIcon(
    //     'error',
    //     'Error',
    //     action.payload.response.data.msg
    //   );
    //   if (action.payload.response.statusText === "Unauthorized") {
    //     window.location.assign('/login');
    //   }

    case types.ADDDOCTOR_SUCCESS:
      if (action.payload.response === "ADDDOCTOR_SUCCESS") {
        window.location.assign("/viewdoctor");
      }
      return { ...state, addDoctorRes: action.payload };
    case types.ADDDOCTOR_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/AddEditDoctor");
      }
    case types.GETDOCTOR_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETDOCTOR_SUCCESS") {
        window.location.assign("/DoctorEdit");
      }

      return { ...state, getDoctorRes: action.payload };
    case types.GETDOCTOR_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETDOCTOR_FAILURE") {
        window.location.assign("/ViewDoctorsList");
      }
      return { ...state, getDoctorRes: action.payload };

    case types.FINDDOCTOR_SUCCESS:
      return { ...state, findDoctorRes: action.payload };

    case types.FINDDOCTOR_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/ViewDoctor");
      }

    case types.GETCOUNTRY_SUCCESS:
      return { ...state, getCountryRes: action.payload };

    case types.GETCOUNTRY_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/addeditdoctor");
      }
    case types.UPLOAD_DOCTOR_SUCCESS:
      // if (action.payload.response === "EDITDOCTOR_SUCCESS") {
      return { ...state, uploadDoctorRes: action.payload };
    case types.UPLOAD_DOCTOR_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/ViewDoctor");
      }
    case types.FORGOTPASSWORD_SUCCESS:
      // if (action.payload.response === "EDITDOCTOR_SUCCESS") {
      return { ...state, forgotpasswordRes: action.payload };
    case types.FORGOTPASSWORD_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/login");
      }
    case types.RESETPASSWORD_SUCCESS:
      // if (action.payload.response === "EDITDOCTOR_SUCCESS") {
      return { ...state, ResetpasswordRes: action.payload };
    case types.RESETPASSWORD_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/Resetpassword");
      }
      return { ...state, ResetpasswordRes: action.payload };
    //   case types.EDITDOCTOR_SUCCESS:
    //   //openNotificationWithIcon("error", "Error", action.payload.message);
    //   if (action.payload.id === "EDITDOCTOR_SUCCESS") {
    //     window.location.assign("/DoctorEdit");
    //   }

    //   return { ...state, editDoctorRes: action.payload };
    // case types.EDITDOCTOR_FAILURE:
    //   //openNotificationWithIcon("error", "Error", action.payload.message);
    //   if (action.payload.id === "EDITDOCTOR_FAILURE") {
    //     window.location.assign("/ViewDoctorsList");
    //   }
    //   return { ...state, editDoctorRes: action.payload };
    case types.LOGOUT_SUCCESS:
      // localStorage.removeItem("AccessToken");

      localStorage.clear();
      if (action.type === "LOGOUT_SUCCESS") {
        window.location.assign("/login");
      }
      return { ...state, logoutRes: action.payload };
    case types.LOGOUT_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/login");
      }
    case types.OTP_SUCCESS:
      return { ...state, otpRes: action.payload };

    case types.OTP_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/otp");
      }
    // switch (action.type) {
    //   // eslint-disable-next-line no-fallthrough
    //   case types.OTP_SUCCESS:
    //     return { ...state, otpRes: action.payload };
    //   case types.OTP_FAILURE:
    //     //openNotificationWithIcon("error", "Error", action.payload.message);
    //     if (action.payload.response === "undefined") {
    //       window.location.assign("../otp");
    //     }
    // }

    default:
      return state;
  }
};
