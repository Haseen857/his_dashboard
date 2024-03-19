import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Register from "../views/pages/register/Register";
import { signUp } from "src/store/Actions/User";

const mapStateToProps = (state) => {
  return {
    signUpRes: state.userReducer.signUpRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: bindActionCreators(signUp, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
