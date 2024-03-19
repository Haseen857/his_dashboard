import * as types from "../Constants/index";

export const hospitalReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        submitEventRes: action.payload,
      };
    case types.CREATE_EVENT_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/dashboard");
      }
    case types.GET_DEPARTMENT_SUCCESS:
      return {
        ...state,
        getDepartmentRes: action.payload,
      };
    case types.GET_DEPARTMENT_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/dashboard");
      }
    case types.GET_EVENT_SUCCESS:
      return {
        ...state,
        getEventRes: action.payload,
      };
    case types.GET_EVENT_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/dashboard");
      }
    case types.GETEVENTDETAIL_SUCCESS:
      return {
        ...state,
        getEventDetail: action.payload,
      };
    case types.GETEVENTDETAIL_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/dashboard");
      }
    case types.INTERESTED_EVENT_SUCCESS:
      return {
        ...state,
        interestedEventRes: action.payload,
      };
    case types.INTERESTED_EVENT_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/dashboard");
      }
    case types.NOTINTERESTED_EVENT_SUCCESS:
      return {
        ...state,
        notinterestedEventRes: action.payload,
      };
    case types.NOTINTERESTED_EVENT_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/dashboard");
      }
    case types.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        deleteEventRes: action.payload,
      };
    case types.DELETE_EVENT_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/dashboard");
      }

    // case types.GET_EVENT_SUCCESS:
    //   return {
    //     ...state,
    //     getDepartmentRes: action.payload,
    //   };
    // case types.GET_EVENT_FAILURE:
    //   //openNotificationWithIcon("error", "Error", action.payload.message);
    //   if (action.payload.response === "undefined") {
    //     window.location.assign("/dashboard");
    //   }
    default:
      return state;
  }
};
