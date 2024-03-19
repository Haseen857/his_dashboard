import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AcceptMaxFiles from "../views/Doctor/DocumentUpload";
import { uploadDoctor} from "../store/Actions";

const mapStateToProps = (state) => {
  return {
    uploadDoctorRes: state.userReducer.uploadDoctorRes,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onuploaddoctor: bindActionCreators(uploadDoctor, dispatch),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptMaxFiles);
