import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddHospital from "src/views/Hospital/Add";

import {
  submitHospital,
  getHospital,
  updateHospital,
  deleteHospital,
  findHospital,
  findHospitalbyid,
  uploadProfileHospital,
  LegalDocumentFromDoctor,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    submitHospitalRes: state.userReducer.submitHospitalRes,
    getHospitalRes: state.userReducer.getHospitalRes,
    updateHospitalRes: state.userReducer.updateHospitalRes,
    deleteHospitalRes: state.userReducer.deleteHospitalRes,
    findHospitalRes: state.userReducer.findHospitalRes,
    findHospitalbyidRes: state.userReducer.findHospitalRes,
    uploadHospitalRes: state.userReducer.uploadHospitalRes,
    LegalDocumentFromDoctorRes: state.userReducer.LegalDocumentFromDoctorRes,
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
    onuploadhospital: bindActionCreators(uploadProfileHospital, dispatch),
    onLegalDocumentFromDoctor: bindActionCreators(
      LegalDocumentFromDoctor,
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHospital);
// export default connect(mapStateToProps, mapDispatchToProps)(HospitalView);
