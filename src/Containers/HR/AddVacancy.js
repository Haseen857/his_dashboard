import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddVacancy from "src/views/HR/AddVacancy";
import {
  addedVacancy,
  getdropdownlist,
  editDoctor,
  getCountry,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    addedVacancyRes: state.userReducer.addedVacancyRes,
    getdropdownlistRes: state.userReducer.getdropdownlistRes,
    // editDoctorRes: state.userReducer.editDoctorRes,
    // getcountryRes: state.userReducer.getCountryRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddedVacancy: bindActionCreators(addedVacancy, dispatch),
    ongetdropdownlist: bindActionCreators(getdropdownlist, dispatch),
    // oneditDoctor: bindActionCreators(editDoctor, dispatch),
    // ongetCountry: bindActionCreators(getCountry, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVacancy);
