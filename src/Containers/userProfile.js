import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Profile from "src/views/Setting/Profile";
import { getUserProfile, sendotp, saveotp } from "../store/Actions";

const mapStateToProps = (state) => {
  return {
    getUserProfileRes: state.userReducer.getUserProfileRes,
    sendotpRes: state.userReducer.sendotpRes,
    saveotpRes: state.userReducer.saveotpRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetUserProfile: bindActionCreators(getUserProfile, dispatch),
    onsendotp: bindActionCreators(sendotp, dispatch),
    onsaveotp: bindActionCreators(saveotp, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
