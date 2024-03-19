import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FilteredCandidate from "src/views/HR/Candidate/FilteredCandidatelist";

import {
  AddHR,
  GetHRDetail,
  getfilteredcandidate,
  deletevacancy,
  StatusChangeDoctor,
  GetHRList,
  UploadHRDocument,
  GetCountry,
  EditHR,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getfilteredcandidateRes: state.userReducer.getfilteredcandidateRes,
    // deletevacancyRes: state.userReducer.deletevacancyRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetfilteredcandidate: bindActionCreators(getfilteredcandidate, dispatch),
    // ondeletevacancy: bindActionCreators(deletevacancy, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilteredCandidate);
