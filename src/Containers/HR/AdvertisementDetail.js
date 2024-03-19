import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DocumentDetails from "src/views/HR/AdvertisementDetail";

import {
  AddHR,
  GetAdvertisementDetail,
  submitAcceptance,
  GetHRList,
  UploadHRDocument,
  GetCountry,
  EditHR,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getAdvertisementDetailRes: state.userReducer.getAdvertisementDetailRes,
    submitAcceptanceRes: state.userReducer.submitAcceptanceRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAdvertisementDetail: bindActionCreators(
      GetAdvertisementDetail,
      dispatch
    ),
    onsubmitAcceptance: bindActionCreators(submitAcceptance, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetails);
