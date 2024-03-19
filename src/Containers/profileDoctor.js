import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DoctorDetail from "../views/Doctor/DoctorDetail";
import { getDoctorDetail } from "../store/Actions";

const mapStateToProps = (state) => {
  return {
    getDoctorDetailRes: state.userReducer.getDoctorDetailRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetDoctorDetail: bindActionCreators(getDoctorDetail, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);