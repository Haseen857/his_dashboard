import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ShortlistedCandidate from "src/views/HR/Candidate/ShortlistCandidatelist";

import {
  AddHR,
  GetHRDetail,
  getshortlistcandidate,
  deletevacancy,
  StatusChangeDoctor,
  GetHRList,
  UploadHRDocument,
  GetCountry,
  EditHR,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getshortlistcandidateRes: state.userReducer.getshortlistcandidateRes,
    // deletevacancyRes: state.userReducer.deletevacancyRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetshortlistcandidate: bindActionCreators(
      getshortlistcandidate,
      dispatch
    ),
    // ondeletevacancy: bindActionCreators(deletevacancy, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortlistedCandidate);
