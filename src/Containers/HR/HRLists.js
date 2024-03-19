import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HrVacancy from "src/views/HR/AllJob";

import {
  AddHR,
  GetHRDetail,
  Gethrvacancy,
  deletevacancy,
  StatusChangeDoctor,
  GetHRList,
  UploadHRDocument,
  GetCountry,
  EditHR,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    gethrvacancyRes: state.userReducer.gethrvacancyRes,
    deletevacancyRes: state.userReducer.deletevacancyRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGethrvacancy: bindActionCreators(Gethrvacancy, dispatch),
    ondeletevacancy: bindActionCreators(deletevacancy, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HrVacancy);
