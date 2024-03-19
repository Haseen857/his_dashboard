import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import VisitingHours from "src/views/Medicalconsulation/VisitingHours";

import {
  submitDoctorVisitingHours,
  getDoctorforConsultation,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    submitvisitingRes: state.userReducer.submitvisitingRes,
    findDoctorResforConsult: state.userReducer.findDoctorResforConsult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onsubmitedVisitingHours: bindActionCreators(
      submitDoctorVisitingHours,
      dispatch
    ),
    onFindDoctor: bindActionCreators(getDoctorforConsultation, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitingHours);
