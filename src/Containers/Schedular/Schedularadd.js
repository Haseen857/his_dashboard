import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Calendar from "src/views/Medicalconsulation/Schedule";
import {
  addSchedule,
  GetAppointment,
  EditAppointment,
  DeleteAppointment,
  ScheduleLeave,
  GetOverview,
} from "src/store/Actions";

const mapStateToProps = (state) => {
  return {
    addScheduleRes: state.userReducer.addScheduleRes,
    GetAppointmentRes: state.userReducer.GetAppointmentRes,
    EditAppointmentRes: state.userReducer.EditAppointmentRes,
    DeleteAppointmentRes: state.userReducer.DeleteAppointmentRes,
    ScheduleLeaveRes: state.userReducer.ScheduleLeaveRes,
    GetOverviewRes: state.userReducer.GetOverviewRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddSchedule: bindActionCreators(addSchedule, dispatch),
    onGetAppointment: bindActionCreators(GetAppointment, dispatch),
    onEditAppointment: bindActionCreators(EditAppointment, dispatch),
    onDeleteAppointment: bindActionCreators(DeleteAppointment, dispatch),
    onScheduleLeave: bindActionCreators(ScheduleLeave, dispatch),
    onGetOverview: bindActionCreators(GetOverview, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
