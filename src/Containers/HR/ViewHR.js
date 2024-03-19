import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HRView from "src/views/HR/ViewHR";

import {
  AddHR,
  GetHRDetail,
  GetHRList,
  UploadHRDocument,
  GetCountry,
  EditHR,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getHRRes: state.userReducer.getHRRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHRList: bindActionCreators(GetHRList, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HRView);
