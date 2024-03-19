import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ADDHR from "src/views/HR/AddHR";
import {
  AddHR,
  getHRDetail,
  editHR,
  getdropdownlist,
  editDoctor,
  getCountry,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    addhrRes: state.userReducer.addhrRes,
    getHRDetailRes: state.userReducer.getHRDetailRes,
    edithrRes: state.userReducer.edithrRes,
    // getdropdownlistRes: state.userReducer.getdropdownlistRes,
    // editDoctorRes: state.userReducer.editDoctorRes,
    // getcountryRes: state.userReducer.getCountryRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onaddHR: bindActionCreators(AddHR, dispatch),
    ongetHRDetail: bindActionCreators(getHRDetail, dispatch),
    oneditHR: bindActionCreators(editHR, dispatch),
    // ongetdropdownlist: bindActionCreators(getdropdownlist, dispatch),
    // oneditDoctor: bindActionCreators(editDoctor, dispatch),
    // ongetCountry: bindActionCreators(getCountry, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ADDHR);
