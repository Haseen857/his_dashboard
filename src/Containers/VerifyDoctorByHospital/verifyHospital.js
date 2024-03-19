import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  GetHospitalsForVerification,
  HospitalSearchForVerification,
} from "src/store/Actions";
import HospitalVerify from "src/views/DocumentVerify/HospitalVeify";

const mapStateToProps = (state) => {
  return {
    getHospitalsDocDetailsRes: state.userReducer.getHospitalsDocDetailsRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHospitalForVerification: bindActionCreators(
      GetHospitalsForVerification,
      dispatch
    ),
    onSearchHospitalForVerification: bindActionCreators(
      HospitalSearchForVerification,
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HospitalVerify);
