import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ViewDoctor from "src/views/Doctor/ViewDoctor";
import {
  getDoctor,
  deleteDoctor,
  findDoctor,
  StatusChangeDoctor,
} from "../store/Actions";

const mapStateToProps = (state) => {
  return {
    getDoctorRes: state.userReducer.getDoctorRes,
    // deleteDoctorRes: state.userReducer.deleteDoctorRes,
    findDoctorRes: state.userReducer.findDoctorRes,
    StatusChangeDoctorRes: state.userReducer.StatusChangeDoctorRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDoctor: bindActionCreators(getDoctor, dispatch),
    // onDeleteDoctor: bindActionCreators(deleteDoctor, dispatch),
    onfindDoctor: bindActionCreators(findDoctor, dispatch),
    onStatusChangeDoctor: bindActionCreators(StatusChangeDoctor, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDoctor);
