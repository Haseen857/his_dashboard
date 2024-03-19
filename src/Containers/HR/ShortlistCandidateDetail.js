import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ShortlistedCandidateDetail from "src/views/HR/Candidate/ShortlistCandidateDetail";

import {
  AddHR,
  GetShortlistCandidateDetail,
  AddSelectCandidate,
  GetHRList,
  UploadHRDocument,
  GetCountry,
  EditHR,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getshortlistcandidateDetailRes:
      state.userReducer.getshortlistcandidateDetailRes,
    addselectcandidateRes: state.userReducer.addselectcandidateRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetShortlistCandidateDetail: bindActionCreators(
      GetShortlistCandidateDetail,
      dispatch
    ),
    onAddSelectCandidate: bindActionCreators(AddSelectCandidate, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortlistedCandidateDetail);
