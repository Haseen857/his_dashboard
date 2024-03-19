import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  IndivDoctorsDetailsForVerification,
  submitIndivDoctorsVerification,
} from "src/store/Actions";

import DocumentDetails from "src/views/DocumentVerify/IndiDoctorDocumentDetails";

const mapStateToProps = (state) => {
  return {
    getIndiDocDetailsRes: state.userReducer.getIndiDocDetailsRes,
    submitIndiDocsDetailsRes: state.userReducer.submitIndiDocsDetailsRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDoctorDetails: bindActionCreators(
      IndivDoctorsDetailsForVerification,
      dispatch
    ),
    submitAcceptance: bindActionCreators(
      submitIndivDoctorsVerification,
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetails);
