import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddEditDoctor from "../views/Doctor/AddEditDoctor";
import {
  addDoctor,
  getDoctorDetail,
  editDoctor,
  getCountry,
} from "../store/Actions";

const mapStateToProps = (state) => {
  return {
    addDoctorRes: state.userReducer.addDoctorRes,
    getDoctorDetailRes: state.userReducer.getDoctorDetailRes,
    editDoctorRes: state.userReducer.editDoctorRes,
    getcountryRes: state.userReducer.getCountryRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddDoctor: bindActionCreators(addDoctor, dispatch),
    ongetDoctorDetail: bindActionCreators(getDoctorDetail, dispatch),
    oneditDoctor: bindActionCreators(editDoctor, dispatch),
    ongetCountry: bindActionCreators(getCountry, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditDoctor);
