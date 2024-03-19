import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import VacancyDetail from "src/views/HR/HRVacancyDetail";
import { gethrvacancyDetail } from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    gethrvacancyDetailRes: state.userReducer.gethrvacancyDetailRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongethrvacancyDetail: bindActionCreators(gethrvacancyDetail, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VacancyDetail);
