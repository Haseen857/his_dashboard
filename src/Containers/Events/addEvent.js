import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddEvent from "src/views/Events/AddEvent";

import { addevent, getDepartment } from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    submitEventRes: state.userReducer.submitEventRes,
    getDepartmentRes: state.userReducer.getDepartmentRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onsubmitedEvent: bindActionCreators(addevent, dispatch),
    ongetdepartment: bindActionCreators(getDepartment, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
