import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  HospitalDetailsForVerification,
  submitHospitalVerification,
} from "src/store/Actions";

import DocumentDetails from "src/views/DocumentVerify/HospitalDocumentDetails";

const mapStateToProps = (state) => {
  return {
    getHospitalsDetailsRes: state.userReducer.getHospitalsDetailsRes,
    submitHospitalsDetailsRes: state.userReducer.submitHospitalsDetailsRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHospitalDetails: bindActionCreators(
      HospitalDetailsForVerification,
      dispatch
    ),
    submitAcceptance: bindActionCreators(submitHospitalVerification, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetails);
