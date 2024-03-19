import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppliedCandidate from "src/views/HR/Candidate/AppliedCandidatelist";

import {
  AddHR,
  GetHRDetail,
  getappliedcandidate,
  deletevacancy,
  StatusChangeDoctor,
  GetHRList,
  UploadHRDocument,
  GetCountry,
  EditHR,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getappliedcandidateRes: state.userReducer.getappliedcandidateRes,
    // deletevacancyRes: state.userReducer.deletevacancyRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetappliedcandidate: bindActionCreators(getappliedcandidate, dispatch),
    // ondeletevacancy: bindActionCreators(deletevacancy, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppliedCandidate);
