import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EventDetails from "src/views/Events/EventDetails";

import {
  getEventDetail,
  interestedEvent,
  notinterestedEvent,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getEventDetailRes: state.userReducer.getEventDetailRes,
    interestedEventRes: state.userReducer.interestedEventRes,
    notinterestedEventRes: state.userReducer.notinterestedEventRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetEventDetail: bindActionCreators(getEventDetail, dispatch),
    oninterestedEvent: bindActionCreators(interestedEvent, dispatch),
    onnotinterestedEvent: bindActionCreators(notinterestedEvent, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
