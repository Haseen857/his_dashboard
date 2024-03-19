import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import VerifyEmail from "src/views/pages/forgotPassword/VerifyEmail";
import { forgotPassword } from "src/store/Actions";

const mapStateToProps = (state) => {
  return {
    forgotpasswordRes: state.userReducer.forgotpasswordRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onForgotPassword: bindActionCreators(forgotPassword, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
