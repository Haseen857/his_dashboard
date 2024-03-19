import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HospitalDetail from "src/views/Hospital/HospitalDetails";

import {
  submitHospital,
  getHospital,
  updateHospital,
  deleteHospital,
  findHospital,
  findHospitalbyid,
  getDoctorDetail,
  editDoctor,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    submitHospitalRes: state.userReducer.submitHospitalRes,
    getHospitalRes: state.userReducer.getHospitalRes,
    updateHospitalRes: state.userReducer.updateHospitalRes,
    deleteHospitalRes: state.userReducer.deleteHospitalRes,
    findHospitalRes: state.userReducer.findHospitalRes,
    findHospitalbyidRes: state.userReducer.findHospitalRes,
    getDoctorDetailRes: state.userReducer.getDoctorDetailRes,
    editDoctorRes: state.userReducer.editDoctorRes,
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
    ongetDoctorDetail: bindActionCreators(getDoctorDetail, dispatch),
    oneditDoctor: bindActionCreators(editDoctor, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HospitalDetail);
