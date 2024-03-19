import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductAdslist from "src/views/Advertisement/ProductAdslist";

import { GetProductAds, getMyEvents, deleteEvent } from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    GetProductAdsRes: state.userReducer.GetProductAdsRes,
    // deleteEventRes: state.userReducer.deleteEventRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProductAds: bindActionCreators(GetProductAds, dispatch),
    // ongetMyEvent: bindActionCreators(getMyEvents, dispatch),
    // ondeleteEvent: bindActionCreators(deleteEvent, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdslist);
