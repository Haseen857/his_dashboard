import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DocumentDetails from "src/views/HR/HRDetail";

import {
  AddHR,
  GetHRDetail,
  submitAcceptance,
  GetHRList,
  UploadHRDocument,
  GetCountry,
  EditHR,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getHRDetailRes: state.userReducer.getHRDetailRes,
    submitAcceptanceRes: state.userReducer.submitAcceptanceRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHRDetail: bindActionCreators(GetHRDetail, dispatch),
    onsubmitAcceptance: bindActionCreators(submitAcceptance, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetails);
