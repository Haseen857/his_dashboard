import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Slot from "src/views/Medicalconsulation/Slot";

import {
  submitDoctorConsultationCharges,
  getDoctorforConsultation,
  GetConsulationCharges,
  submitSlotInformation,
  GetSlots,
} from "../../store/Actions";

const mapStateToProps = (state) => {
  return {
    submitScheduleRes: state.userReducer.submitScheduleRes,
    submitSlotInformationRes: state.userReducer.submitSlotInformationRes,
    findDoctorResforConsult: state.userReducer.findDoctorResforConsult,
    GetConsulationchargesRes: state.userReducer.GetConsulationchargesRes,
    GetSlotsRes: state.userReducer.GetSlotsRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onsubmitedconsultation: bindActionCreators(
      submitDoctorConsultationCharges,
      dispatch
    ),
    onsubmitedSlots: bindActionCreators(
      submitSlotInformation,
      dispatch
    ),
    onFindDoctor: bindActionCreators(getDoctorforConsultation, dispatch),
    onGetConsulationcharges: bindActionCreators(GetConsulationCharges, dispatch),
    onGetSlots: bindActionCreators(GetSlots, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slot);
