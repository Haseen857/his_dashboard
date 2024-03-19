import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AcceptMaxFilesupdate from "src/views/pages/DocumentUpdate/HospitalDocumentUpdate";

import { updateDocumentsHospital } from "../../store/Actions";

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
    onupdatehospitaldocuments: bindActionCreators(
      updateDocumentsHospital,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcceptMaxFilesupdate);
