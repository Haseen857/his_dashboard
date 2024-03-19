import * as types from "../Constants";

export const hrReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADDHR_SUCCESS:
      if (action.payload.response === "ADDHR_SUCCESS") {
        window.location.assign("/viewHR");
      }
      return { ...state, addHRRes: action.payload };
    case types.ADDHR_FAILURE:
      if (action.payload.response === "undefined") {
        window.location.assign("/AddVacancy");
      }
    case types.GETDROPDOWNLIST_SUCCESS:
      if (action.payload.response === "GETDROPDOWNLIST_SUCCESS") {
        window.location.assign("/viewHR");
      }
      return { ...state, addHRRes: action.payload };
    case types.GETDROPDOWNLIST_FAILURE:
      if (action.payload.response === "undefined") {
        window.location.assign("/AddVacancy");
      }
    case types.GETHR_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETHR_SUCCESS") {
        window.location.assign("/HREdit");
      }

      return { ...state, getHRRes: action.payload };
    case types.GETHR_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETHR_FAILURE") {
        window.location.assign("/ViewHRsList");
      }
      return { ...state, getHRRes: action.payload };

    case types.EDITHR_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "EDITHR_SUCCESS") {
        window.location.assign("/AddHR");
      }

      return { ...state, getHRRes: action.payload };
    case types.EDITHR_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "EDITHR_FAILURE") {
        window.location.assign("/AddHR");
      }
      return { ...state, getHRRes: action.payload };

    case types.GETCANDIDATELIST_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETCANDIDATELIST_SUCCESS") {
        window.location.assign("/AddHR");
      }

      return { ...state, getcandidatelistRes: action.payload };
    case types.GETCANDIDATELIST_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETCANDIDATELIST_FAILURE") {
        window.location.assign("/AddHR");
      }
      return { ...state, getcandidatelistRes: action.payload };

    case types.SENDOTP_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "SENDOTP_SUCCESS") {
        window.location.assign("/AddHR");
      }

      return { ...state, sendotpRes: action.payload };
    case types.SENDOTP_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "SENDOTP_FAILURE") {
        window.location.assign("/AddHR");
      }
      return { ...state, sendotpRes: action.payload };

    case types.GETADVERTISEMENTDETAIL_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETADVERTISEMENTDETAIL_SUCCESS") {
        window.location.assign("/AddHR");
      }

      return { ...state, sendotpRes: action.payload };
    case types.GETADVERTISEMENTDETAIL_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "SENDOTP_FAILURE") {
        window.location.assign("/AddHR");
      }
      return { ...state, sendotpRes: action.payload };

    case types.GETADVERTISEMENT_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETADVERTISEMENT_SUCCESS") {
        window.location.assign("/Advertisement");
      }

      return { ...state, sendotpRes: action.payload };
    case types.GETADVERTISEMENT_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETADVERTISEMENT_FAILURE") {
        window.location.assign("/Advertisement");
      }
      return { ...state, sendotpRes: action.payload };
    case types.GETHRLIST_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETHRLIST_SUCCESS") {
        window.location.assign("/HRList");
      }

      return { ...state, getHRlistRes: action.payload };
    case types.GETHRLIST_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETHRLIST_FAILURE") {
        window.location.assign("/HRList");
      }
      return { ...state, getHRlistRes: action.payload };

    case types.GETAPPLIEDCANDIDATE_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETAPPLIEDCANDIDATE_SUCCESS") {
        window.location.assign("/HRList");
      }

      return { ...state, getHRlistRes: action.payload };
    case types.GETAPPLIEDCANDIDATE_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETAPPLIEDCANDIDATE_FAILURE") {
        window.location.assign("/HRList");
      }
      return { ...state, getHRlistRes: action.payload };

    case types.GETFILTEREDCANDIDATE_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETFILTEREDCANDIDATE_SUCCESS") {
        window.location.assign("/HRList");
      }

      return { ...state, getHRlistRes: action.payload };
    case types.GETFILTEREDCANDIDATE_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETFILTEREDCANDIDATE_FAILURE") {
        window.location.assign("/HRList");
      }
      return { ...state, getHRlistRes: action.payload };

    case types.GETAPPLIEDCANDIDATEDETAIL_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETAPPLIEDCANDIDATEDETAIL_SUCCESS") {
        window.location.assign("/HRList");
      }

      return { ...state, getappliedcandidateDetailRes: action.payload };
    case types.GETAPPLIEDCANDIDATEDETAIL_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETAPPLIEDCANDIDATEDETAIL_FAILURE") {
        window.location.assign("/HRList");
      }
      return { ...state, getappliedcandidateDetailRes: action.payload };

    case types.ADDFILTERCANDIDATE_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "ADDFILTERCANDIDATE_SUCCESS") {
        window.location.assign("/HRList");
      }

      return { ...state, addfiltercandidateRes: action.payload };
    case types.ADDFILTERCANDIDATE_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "ADDFILTERCANDIDATE_FAILURE") {
        window.location.assign("/HRList");
      }
      return { ...state, addfiltercandidateRes: action.payload };

    case types.ADDSHORTLISTCANDIDATE_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "ADDSHORTLISTCANDIDATE_SUCCESS") {
        window.location.assign("/HRList");
      }

      return { ...state, addshortlistcandidateRes: action.payload };
    case types.ADDSHORTLISTCANDIDATE_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "ADDSHORTLISTCANDIDATE_FAILURE") {
        window.location.assign("/HRList");
      }
      return { ...state, addshortlistcandidateRes: action.payload };

    case types.GETFILTEREDCANDIDATEDETAIL_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETFILTEREDCANDIDATEDETAIL_SUCCESS") {
        window.location.assign("/HRList");
      }

      return { ...state, getfilteredcandidateDetailRes: action.payload };
    case types.GETFILTEREDCANDIDATEDETAIL_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETFILTEREDCANDIDATEDETAIL_FAILURE") {
        window.location.assign("/HRList");
      }
      return { ...state, getfilteredcandidateDetailRes: action.payload };

    case types.GETSHORTLISTEDCANDIDATEDETAIL_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETSHORTLISTEDCANDIDATEDETAIL_SUCCESS") {
        window.location.assign("/HRList");
      }

      return { ...state, getshortlistcandidateDetailRes: action.payload };
    case types.GETSHORTLISTEDCANDIDATEDETAIL_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETSHORTLISTEDCANDIDATEDETAIL_FAILURE") {
        window.location.assign("/HRList");
      }
      return { ...state, getshortlistcandidateDetailRes: action.payload };

    case types.ADDSELECTCANDIDATE_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "ADDSELECTCANDIDATE_SUCCESS") {
        window.location.assign("/HRList");
      }

      return { ...state, addselectcandidateRes: action.payload };
    case types.ADDSELECTCANDIDATE_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "ADDSELECTCANDIDATE_FAILURE") {
        window.location.assign("/HRList");
      }
      return { ...state, addselectcandidateRes: action.payload };
    case types.DELETEVACANCY_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "DELETEVACANCY_SUCCESS") {
        window.location.assign("/alljob");
      }

      return { ...state, getHRRes: action.payload };
    case types.DELETEVACANCY_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETHR_FAILURE") {
        window.location.assign("/alljob");
      }
      return { ...state, getHRRes: action.payload };
    case types.GETHRVACANCY_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETHRVACANCY_SUCCESS") {
        window.location.assign("/ViewHRsList");
      }

      return { ...state, getHRRes: action.payload };
    case types.GETHRVACANCY_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "GETHRVACANCY_FAILURE") {
        window.location.assign("/ViewHRsList");
      }
      return { ...state, getHRRes: action.payload };

    case types.SUBMITACCEPTANCE_HR_SUCCESS:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "SUBMITACCEPTANCE_HR_SUCCESS") {
        window.location.assign("/ViewHRsList");
      }

      return { ...state, getHRRes: action.payload };
    case types.SUBMITACCEPTANCE_HR_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.id === "SUBMITACCEPTANCE_HR_FAILURE") {
        window.location.assign("/ViewHRsList");
      }
      return { ...state, getHRRes: action.payload };

    case types.FINDHR_SUCCESS:
      return { ...state, findHRRes: action.payload };

    case types.FINDHR_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/ViewHR");
      }

    case types.GETCOUNTRY_SUCCESS:
      return { ...state, getCountryRes: action.payload };

    case types.GETCOUNTRY_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/addeditHR");
      }
    case types.UPLOAD_HR_SUCCESS:
      // if (action.payload.response === "EDITHR_SUCCESS") {
      return { ...state, uploadHRRes: action.payload };
    case types.UPLOAD_HR_FAILURE:
      //openNotificationWithIcon("error", "Error", action.payload.message);
      if (action.payload.response === "undefined") {
        window.location.assign("/ViewHR");
      }
    default:
      return state;
  }
};
