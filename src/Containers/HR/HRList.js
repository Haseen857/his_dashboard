import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HrList from "src/views/HR/HRList";
import {
  GethrList,
  getdropdownlist,
  editDoctor,
  getCountry,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    gethrlistRes: state.userReducer.gethrlistRes,
    // getdropdownlistRes: state.userReducer.getdropdownlistRes,
    // editDoctorRes: state.userReducer.editDoctorRes,
    // getcountryRes: state.userReducer.getCountryRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHRList: bindActionCreators(GethrList, dispatch),
    // ongetdropdownlist: bindActionCreators(getdropdownlist, dispatch),
    // oneditDoctor: bindActionCreators(editDoctor, dispatch),
    // ongetCountry: bindActionCreators(getCountry, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HrList);
