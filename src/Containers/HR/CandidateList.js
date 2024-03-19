import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CandidateList from "src/views/HR/CandidateList";
import {
  GetCandidateList,
  getdropdownlist,
  editDoctor,
  getCountry,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getcandidatelistRes: state.userReducer.getcandidatelistRes,
    // getdropdownlistRes: state.userReducer.getdropdownlistRes,
    // editDoctorRes: state.userReducer.editDoctorRes,
    // getcountryRes: state.userReducer.getCountryRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCandidateList: bindActionCreators(GetCandidateList, dispatch),
    // ongetdropdownlist: bindActionCreators(getdropdownlist, dispatch),
    // oneditDoctor: bindActionCreators(editDoctor, dispatch),
    // ongetCountry: bindActionCreators(getCountry, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateList);
