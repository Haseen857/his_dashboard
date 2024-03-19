import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  GetIndivDoctorsForVerification,
  IndivDoctorsSearchForVerification,
} from "src/store/Actions";
import IndividualDoctor from "src/views/DocumentVerify/IndividualDoctor";

const mapStateToProps = (state) => {
  return {
    getIndiDocRes: state.userReducer.getIndiDocRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDoctorForVerification: bindActionCreators(
      GetIndivDoctorsForVerification,
      dispatch
    ),
    onGetDoctorForSearch: bindActionCreators(
      IndivDoctorsSearchForVerification,
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDoctor);
