import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HospitalView from "src/views/Hospital/View";

import {
  submitHospital,
  getHospital,
  updateHospital,
  deleteHospital,
  findHospital,
  findHospitalbyid,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    submitHospitalRes: state.userReducer.submitHospitalRes,
    getHospitalRes: state.userReducer.getHospitalRes,
    updateHospitalRes: state.userReducer.updateHospitalRes,
    deleteHospitalRes: state.userReducer.deleteHospitalRes,
    findHospitalRes: state.userReducer.findHospitalRes,
    findHospitalbyidRes: state.userReducer.findHospitalRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onsubumited: bindActionCreators(submitHospital, dispatch),
    ongethospital: bindActionCreators(getHospital, dispatch),
    onfindhospital: bindActionCreators(findHospital, dispatch),
    onfindhospitalbyid: bindActionCreators(findHospitalbyid, dispatch),
    onupdatehospital: bindActionCreators(updateHospital, dispatch),
    ondeletehospital: bindActionCreators(deleteHospital, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HospitalView);
