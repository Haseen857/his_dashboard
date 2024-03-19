import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddProductAds from "src/views/Advertisement/productAds";

import { addproductads, GetProductAds } from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    submitedproductadsRes: state.userReducer.submitedproductadsRes,
    GetProductAdsRes: state.userReducer.GetProductAdsRes,
    // getDepartmentRes: state.userReducer.getDepartmentRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onsubmitedproductads: bindActionCreators(addproductads, dispatch),
    onGetProductAds: bindActionCreators(GetProductAds, dispatch),
    // ongetdepartment: bindActionCreators(getDepartment, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductAds);
