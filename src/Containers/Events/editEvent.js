import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EditEvent from "src/views/Events/EditEvent";

import { editEvent, getDepartment } from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    submitEventRes: state.userReducer.submitEventRes,
    getDepartmentRes: state.userReducer.getDepartmentRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    oneditEvent: bindActionCreators(editEvent, dispatch),
    ongetdepartment: bindActionCreators(getDepartment, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
