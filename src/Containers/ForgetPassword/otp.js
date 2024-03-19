import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Otp from "src/views/pages/forgotPassword/Otp";
import { otp, getProfile, forgotPassword } from "src/store/Actions";

const mapStateToProps = (state) => {
  return {
    otpRes: state.userReducer.otpRes,
    getProfileRes: state.userReducer.getProfileRes,
    forgotpasswordRes: state.userReducer.forgotpasswordRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOtp: bindActionCreators(otp, dispatch),
    onGetProfile: bindActionCreators(getProfile, dispatch),
    onForgotPassword: bindActionCreators(forgotPassword, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Otp);
