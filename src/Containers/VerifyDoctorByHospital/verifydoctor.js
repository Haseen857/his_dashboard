import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetHospitalDoctorDocuments } from "src/store/Actions";
import DoctorVerify from "src/views/DocumentVerify/DocumentVerify";

const mapStateToProps = (state) => {
  return {
    getDocumentsDetailsRes: state.userReducer.getDocumentsDetailsRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDoctorsForVerification: bindActionCreators(
      GetHospitalDoctorDocuments,
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorVerify);
