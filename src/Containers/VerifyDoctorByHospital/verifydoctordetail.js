import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  detailsForVerification,
  submitDoctorVerification,
} from "src/store/Actions";

import DocumentDetails from "src/views/DocumentVerify/DocumentDetails";

const mapStateToProps = (state) => {
  return {
    getDetailsRes: state.userReducer.getDetailsRes,
    submitDocumentsDetailsRes: state.userReducer.submitDocumentsDetailsRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDoctorDetails: bindActionCreators(detailsForVerification, dispatch),
    submitAcceptance: bindActionCreators(submitDoctorVerification, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetails);
