import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppliedCandidateDetail from "src/views/HR/Candidate/AppliedCandidateDetail";

import {
  AddHR,
  GetAppliedCandidateDetail,
  AddFilterCandidate,
  GetHRList,
  UploadHRDocument,
  GetCountry,
  EditHR,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getappliedcandidateDetailRes:
      state.userReducer.getappliedcandidateDetailRes,
    addfiltercandidateRes: state.userReducer.addfiltercandidateRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAppliedCandidateDetail: bindActionCreators(
      GetAppliedCandidateDetail,
      dispatch
    ),
    onAddFilterCandidate: bindActionCreators(AddFilterCandidate, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppliedCandidateDetail);
