import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductAdsDetail from "src/views/Advertisement/ProductAdsDetail";

import { VerifyAdvertisement } from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    verifyadvertisementRes: state.userReducer.verifyadvertisementRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onVerifyAdvertisement: bindActionCreators(VerifyAdvertisement, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdsDetail);
