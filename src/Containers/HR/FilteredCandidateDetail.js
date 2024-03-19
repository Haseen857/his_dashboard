import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FilteredCandidateDetail from "src/views/HR/Candidate/FilteredCandidateDetail";

import {
  AddHR,
  GetFilteredCandidateDetail,
  AddSelectCandidate,
  GetHRList,
  UploadHRDocument,
  GetCountry,
  EditHR,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getfilteredcandidateDetailRes:
      state.userReducer.getfilteredcandidateDetailRes,
    addselectcandidateRes: state.userReducer.addselectcandidateRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFilteredCandidateDetail: bindActionCreators(
      GetFilteredCandidateDetail,
      dispatch
    ),
    onAddSelectCandidate: bindActionCreators(AddSelectCandidate, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilteredCandidateDetail);
