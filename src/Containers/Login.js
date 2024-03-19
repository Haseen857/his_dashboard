import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from "../views/pages/login/Login";
import { signIn, getProfile } from "../store/Actions";

const mapStateToProps = (state) => {
  return {
    signInRes: state.userReducer.signInRes,
    getProfileRes: state.userReducer.getProfileRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: bindActionCreators(signIn, dispatch),
    onGetProfile: bindActionCreators(getProfile, dispatch),    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
