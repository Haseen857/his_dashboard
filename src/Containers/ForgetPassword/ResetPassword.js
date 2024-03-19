import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ResetPassword from "src/views/pages/forgotPassword/ResetPassword";
import { Resetpassword } from "src/store/Actions";

const mapStateToProps = (state) => {
  return {
    ResetpasswordRes: state.userReducer.ResetpasswordRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResetpassword: bindActionCreators(Resetpassword, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
