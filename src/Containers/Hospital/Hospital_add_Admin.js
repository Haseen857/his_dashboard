import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddHospitalAdmin from "src/views/Hospital/AdminAdd";

import { submitHospitalAdmin } from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    submitHospitalRes: state.userReducer.submitHospitalRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onsubumited: bindActionCreators(submitHospitalAdmin, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHospitalAdmin);
