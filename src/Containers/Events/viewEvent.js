import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ViewEvent from "src/views/Events/ViewEvent";

import {
  getEvents,
  getMyEvents,
  deleteEvent,
  
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    getEventRes: state.userReducer.getDepartmentRes,
    deleteEventRes: state.userReducer.deleteEventRes,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetEvent: bindActionCreators(getEvents, dispatch),
    ongetMyEvent: bindActionCreators(getMyEvents, dispatch),
    ondeleteEvent: bindActionCreators(deleteEvent, dispatch),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);
