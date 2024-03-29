import { signIn, getProfile, logOut, signUp } from "./User";
import {
  getUserProfile,
  changeUserPassword,
  sendotp,
  saveotp,
} from "./profile";
import {
  addDoctor,
  getDoctor,
  findDoctor,
  getDoctorDetail,
  editDoctor,
  StatusChangeDoctor,
  uploadDoctor,
  getCountry,
} from "./Doctor";
import {
  submitHospital,
  getHospital,
  deleteHospital,
  updateHospital,
  findHospital,
  findHospitalbyid,
  uploadDocumentsHospital,
  uploadProfileHospital,
  LegalDocumentFromDoctor,
  updateDocumentsHospital,
  submitHospitalAdmin,
} from "./hospital";

import {
  GetProductAds,
  addproductads,
  VerifyAdvertisement,
} from "./Advertisement";

import {
  submitDoctorConsultationCharges,
  submitSlotInformation,
  GetConsulationCharges,
  addSchedule,
  GetAppointment,
  EditAppointment,
  DeleteAppointment,
  ScheduleLeave,
  GetOverview,
  submitDoctorVisitingHours,
  getDoctorforConsultation,
  GetSlots,
} from "./schedule";

import { otp } from "./otp";

import { forgotPassword } from "./ForgotPassword";

import { Resetpassword } from "./ResetPassword";

import {
  GetHospitalDoctorDocuments,
  detailsForVerification,
  submitDoctorVerification,
  GetHospitalsForVerification,
  HospitalDetailsForVerification,
  submitHospitalVerification,
  IndivDoctorsDetailsForVerification,
  GetIndivDoctorsForVerification,
  submitIndivDoctorsVerification,
  HospitalSearchForVerification,
  IndivDoctorsSearchForVerification,
} from "./Verify";

import {
  addevent,
  getDepartment,
  getMyEvents,
  getEvents,
  editEvent,
  getEventDetail,
  deleteEvent,
  interestedEvent,
  notinterestedEvent,
} from "./Events";

import {
  addedVacancy,
  GetHRDetail,
  AddHR,
  GetCountry,
  GetHRList,
  GethrList,
  editHR,
  Gethrvacancy,
  gethrvacancyDetail,
  GetAppliedCandidateDetail,
  AddFilterCandidate,
  getfilteredcandidate,
  GetFilteredCandidateDetail,
  AddSelectCandidate,
  getshortlistcandidate,
  GetShortlistCandidateDetail,
  GetCandidateList,
  submitAcceptance,
  getdropdownlist,
  deletevacancy,
  getHRDetail,
  GetAdvertisement,
  GetAdvertisementDetail,
  getappliedcandidate,
} from "./HR";

export {
  signIn,
  getProfile,
  logOut,
  signUp,
  addDoctor,
  getDoctor,
  getCountry,
  findDoctor,
  otp,
  forgotPassword,
  Resetpassword,
  uploadDoctor,
  getDoctorDetail,
  editDoctor,
  StatusChangeDoctor,
  ScheduleLeave,
  GetOverview,
  deleteHospital,
  submitHospital,
  getHospital,
  updateHospital,
  findHospital,
  findHospitalbyid,
  uploadDocumentsHospital,
  uploadProfileHospital,
  submitDoctorConsultationCharges,
  submitSlotInformation,
  addSchedule,
  GetAppointment,
  EditAppointment,
  DeleteAppointment,
  GetConsulationCharges,
  submitDoctorVisitingHours,
  GetHospitalDoctorDocuments,
  detailsForVerification,
  submitDoctorVerification,
  getDoctorforConsultation,
  GetHospitalsForVerification,
  HospitalDetailsForVerification,
  submitHospitalVerification,
  IndivDoctorsDetailsForVerification,
  GetIndivDoctorsForVerification,
  submitIndivDoctorsVerification,
  LegalDocumentFromDoctor,
  addevent,
  getDepartment,
  GetProductAds,
  addproductads,
  VerifyAdvertisement,
  getMyEvents,
  getEvents,
  getEventDetail,
  interestedEvent,
  notinterestedEvent,
  updateDocumentsHospital,
  editEvent,
  deleteEvent,
  submitHospitalAdmin,
  HospitalSearchForVerification,
  IndivDoctorsSearchForVerification,
  getUserProfile,
  changeUserPassword,
  GetSlots,
  addedVacancy,
  GetHRDetail,
  Gethrvacancy,
  getappliedcandidate,
  GetCountry,
  GetHRList,
  GethrList,
  GetCandidateList,
  GetAdvertisement,
  GetAdvertisementDetail,
  sendotp,
  saveotp,
  gethrvacancyDetail,
  editHR,
  getHRDetail,
  GetAppliedCandidateDetail,
  AddFilterCandidate,
  getfilteredcandidate,
  GetFilteredCandidateDetail,
  AddSelectCandidate,
  getshortlistcandidate,
  GetShortlistCandidateDetail,
  AddHR,
  deletevacancy,
  submitAcceptance,
  getdropdownlist,
};
