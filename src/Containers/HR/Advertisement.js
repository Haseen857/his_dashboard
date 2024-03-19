import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Advertisement from "src/views/HR/Advertisement";

import {
  AddHR,
  GetAdvertisement,
  GetHRDetail,
  GetHRList,
  UploadHRDocument,
  GetCountry,
  EditHR,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getAdvertisementRes: state.userReducer.getAdvertisementRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAdvertisement: bindActionCreators(GetAdvertisement, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Advertisement);
