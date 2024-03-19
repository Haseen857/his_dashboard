import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const ViewUser = React.lazy(() => import("./views/User/ViewUser"));
const ViewEdit = React.lazy(() => import("./views/User/Edit"));
const EditProfile = React.lazy(() => import("./views/Setting/EditProfile"));
// const VerifyHr = React.lazy(() => import("./views/DocumentVerify/HrVerify"));
const HR = React.lazy(() => import("./views/HR/RecentJob"));
const ADDHR = React.lazy(() => import("./Containers/HR/AddHR"));
const HRList = React.lazy(() => import("./Containers/HR/HRList"));
const CandidateList = React.lazy(() => import("./Containers/HR/CandidateList"));
const HrVacancy = React.lazy(() => import("./Containers/HR/HRLists"));
const VacancyDetail = React.lazy(() =>
  import("./Containers/HR/HRVacancyDetail")
);
const AdddVacancy = React.lazy(() => import("./Containers/HR/AddVacancy"));
const AppliedCandidate = React.lazy(() =>
  import("./Containers/HR/AppliedCandidate")
);
const AppliedCandidateDetail = React.lazy(() =>
  import("./Containers/HR/AppliedCandidateDetail")
);
const FilteredCandidateDetail = React.lazy(() =>
  import("./Containers/HR/FilteredCandidateDetail")
);
const FilteredCandidate = React.lazy(() =>
  import("./Containers/HR/FilteredCandidate")
);
const ShortlistCandidate = React.lazy(() =>
  import("./Containers/HR/ShortlistedCandidate")
);
const ShortlistCandidateDetail = React.lazy(() =>
  import("./Containers/HR/ShortlistCandidateDetail")
);
const ScheduleInterviews = React.lazy(() =>
  import("./views/HR/Candidate/ScheduleInterviews")
);

const ViewSpeciality = React.lazy(() =>
  import("./views/EssentialInformation/ViewSpeciality")
);

const viewLegalDocument = React.lazy(() =>
  import("./views/EssentialInformation/ViewLeaglDocument")
);

// hospital view it's uploaded documents
const HospitalViewDocuments = React.lazy(() =>
  import("./views/Setting/HospitalViewDocuments")
);

const SettingChangePassword = React.lazy(() =>
  import("./Containers/Changepassword")
);

const EditSchedulefee = React.lazy(() =>
  import("./views/Setting/EditSchedulefee")
);
const DocumentVerify = React.lazy(() =>
  import("./Containers/VerifyDoctorByHospital/verifydoctor")
);
const HospitalVerify = React.lazy(() =>
  import("./Containers/VerifyDoctorByHospital/verifyHospital")
);
const DocumentStatus = React.lazy(() =>
  import("./views/Hospital/DocumentStatus")
);
const IndividualDoctor = React.lazy(() =>
  import("./Containers/VerifyDoctorByHospital/verifyIndiDoc")
);
const DeactivateDoctor = React.lazy(() =>
  import("./views/Doctor/DeactivateDoctor.js")
);
const DocumentDetails = React.lazy(() =>
  import("./Containers/VerifyDoctorByHospital/verifydoctordetail")
);
const HospitalDocumentDetails = React.lazy(() =>
  import("./Containers/VerifyDoctorByHospital/verifyHospitaldetail")
);
const IndiDocDocumentDetails = React.lazy(() =>
  import("./Containers/VerifyDoctorByHospital/verifyIndiDocdetail")
);
const ViewLog = React.lazy(() => import("./views/User/ViewLog"));
const AddHospital = React.lazy(() =>
  import("./Containers/Hospital/Hospital_add")
);
const AddHospitalAdmin = React.lazy(() =>
  import("./Containers/Hospital/Hospital_add_Admin")
);
const ViewHospital = React.lazy(() =>
  import("./Containers/Hospital/Hospitalview")
);

const EditHospital = React.lazy(() =>
  import("./Containers/Hospital/Hospitalupdate")
);
const DeleteHospital = React.lazy(() =>
  import("./Containers/Hospital/Hospitaldelete")
);
const HospitalDetail = React.lazy(() =>
  import("./Containers/Hospital/HospitalDetails")
);

const HospitalDocument = React.lazy(() =>
  import("./Containers/Hospital/Hospitalupload")
);

const HRDocument = React.lazy(() =>
  import("./Containers/Hospital/Hospitalupload")
);

const ViewHR = React.lazy(() => import("./Containers/HR/ViewHR"));
const Advertisement = React.lazy(() => import("./Containers/HR/Advertisement"));

const HRDetail = React.lazy(() => import("./Containers/HR/HRDetail"));
const AdvertisementDetail = React.lazy(() =>
  import("./Containers/HR/AdvertisementDetail")
);

const AddEditDoctor = React.lazy(() => import("./Containers/Doctor"));
const ViewDoctor = React.lazy(() => import("./Containers/getDoctor"));
const DoctorDetail = React.lazy(() => import("./Containers/profileDoctor"));

const DocumentUpload = React.lazy(() => import("./Containers/Documentupload"));
const Setting = React.lazy(() => import("./Containers/userProfile"));

const AddMedicalConsulation = React.lazy(() =>
  import("./views/Medicalconsulation/AddMedicalConsulation")
);
const ViewMedicalConsulation = React.lazy(() =>
  import("./views/Medicalconsulation/ViewMedicalConsulation")
);

const Calendar = React.lazy(() =>
  import("./Containers/Schedular/Schedularadd")
);
const Slot = React.lazy(() =>
  import("./Containers/MedicalConsultation/ScheduleTime")
);

const VisitingHours = React.lazy(() =>
  import("./Containers/MedicalConsultation/visitingHours")
);
const AddProductAds = React.lazy(() =>
  import("./Containers/Advertisment/AddProductAds")
);
const ViewProductAdsList = React.lazy(() =>
  import("./Containers/Advertisment/ProductAds")
);
const productadsdetail = React.lazy(() =>
  import("./Containers/Advertisment/Productadsdetail")
);

const AddEvents = React.lazy(() => import("./Containers/Events/addEvent"));
const ViewEvents = React.lazy(() => import("./Containers/Events/viewEvent"));
const EventDetails = React.lazy(() =>
  import("./Containers/Events/detailEvent")
);
const EditEvent = React.lazy(() => import("./Containers/Events/editEvent"));

//add abc view abc
//const AddAbc = React.lazy(() => import("./Containers/ABC/addAbc"));
//const ViewAbc= React.lazy(() => import("./Containers/ABC/viewAbc"));

//const MyEvent = React.lazy(() => import("./views/Events/MyEvent"));

const routes = [
  { path: "/dashboard", name: "Pages / Welcome Page", component: Dashboard },
  {
    path: "/viewuser",
    name: "Pages / View All Users",
    component: ViewUser,
    exact: true,
  },
  { path: "/viewuser/edit", name: "Edit", component: ViewEdit, exact: true },
  { path: "/viewlog", name: " Pages /  View All Users", component: ViewLog },

  {
    path: "/doctorverify",
    name: "doctors for verification",
    component: DocumentVerify,
    exact: true,
  },
  {
    path: "/hrverify",
    name: "HR for verification",
    component: ViewHR,
    exact: true,
  },
  {
    path: "/advertisementverify",
    name: "Advertisement",
    component: Advertisement,
    exact: true,
  },
  {
    path: "/HR/Detail/:id",
    name: "HR Detail",
    component: HRDetail,
    exact: true,
  },
  {
    path: "/Advertisement/Detail/:id",
    name: "Advertisement Detail",
    component: AdvertisementDetail,
    exact: true,
  },

  {
    path: "/documentstatus",
    name: "doctors for verification",
    component: DocumentStatus,
    exact: true,
  },
  {
    path: "/hospitalverify",
    name: "Hospital for verification",
    component: HospitalVerify,
    exact: true,
  },
  {
    path: "/profile",
    name: "profile",
    component: Setting,
    exact: true,
  },

  {
    path: "/editprofile",
    name: "EditProfile",
    component: EditProfile,
    exact: true,
  },
  {
    path: "/changepassword",
    name: "Change password",
    component: SettingChangePassword,
    exact: true,
  },

  {
    path: "/speciality",
    name: "View Speciality",
    component: ViewSpeciality,
    exact: true,
  },

  {
    path: "/viewlegaldocument",
    name: "View Legal Document",
    component: viewLegalDocument,
    exact: true,
  },

  {
    path: "/editschedulefee",
    name: "EditSchedulefee",
    component: EditSchedulefee,
    exact: true,
  },
  {
    path: "/individualdoctor",
    name: "doctors for verification",
    component: IndividualDoctor,
    exact: true,
  },

  {
    path: "/deactivatedoctor",
    name: "DeactivateDoctor",
    component: DeactivateDoctor,
    exact: true,
  },
  {
    path: "/doctorverify/documentdetail",
    name: "doctor details",
    component: DocumentDetails,
  },
  {
    path: "/individualdoctor/IndiDocDocumentDetails",
    name: "Doctor-details",
    component: IndiDocDocumentDetails,
  },
  {
    path: "/hospitalverify/HospitalDocumentDetails",
    name: "Hospital details",
    component: HospitalDocumentDetails,
  },
  {
    path: "/addhospital",
    name: "Add Hospital",
    component: AddHospital,
    exact: true,
  },
  {
    path: "/addhospitalAdmin",
    name: "Add Hospital",
    component: AddHospitalAdmin,
    exact: true,
  },
  {
    path: "/viewhospital",
    name: "View Hospital",
    component: ViewHospital,
    exact: true,
  },

  {
    path: "/viewhospital/HospitalDetail",
    name: "Hospital Details",
    component: HospitalDetail,
  },
  {
    path: "/viewhospital/editHospital",
    name: "Edit Details",
    component: EditHospital,
  },
  {
    path: "/hospitaldocument",
    name: "Upload Documents",
    component: HospitalDocument,
    exact: true,
  },
  {
    path: "/hrdocument",
    name: "Upload Documents",
    component: HRDocument,
    exact: true,
  },

  {
    path: "/viewhospital/deleteHospital",
    name: "Delete Hospital",
    component: DeleteHospital,
  },

  { path: "/adddoctor", name: "Add Doctor", component: AddEditDoctor },

  { path: "/recentjob", name: "Reacent job", component: HR },
  { path: "/addvacancy", name: "Add job", component: AdddVacancy },
  { path: "/hrlist", name: "HR List", component: HRList },
  { path: "/Candidatelist", name: "Candidate List", component: CandidateList },

  { path: "/alljob", name: "Hr vacancy", component: HrVacancy },
  { path: "/addhr", name: "Add HR", component: ADDHR },
  {
    path: "/hr/edit/:id",
    name: "Edit HR",
    component: ADDHR,
  },
  {
    path: "/vacancydetail/:id",
    name: "Hr Vacancy Detail",
    component: VacancyDetail,
  },
  { path: "/appliedjob/:id", name: "All job", component: AppliedCandidate },
  {
    path: "/appliedcandidatedetail/:id",
    name: "AppliedCandidateDetail",
    component: AppliedCandidateDetail,
  },
  {
    path: "/filtercandidates/:id",
    name: "All job",
    component: FilteredCandidate,
  },
  {
    path: "/Filteredcandidatedetail/:id",
    name: "FilteredCandidateDetail",
    component: FilteredCandidateDetail,
  },
  {
    path: "/shortlistcandidate/:id",
    name: "All job",
    component: ShortlistCandidate,
  },
  {
    path: "/shortlistcandidatedetail/:id",
    name: "All job",
    component: ShortlistCandidateDetail,
  },
  {
    path: "/scheduleinterview",
    name: "All job",
    component: ScheduleInterviews,
  },
  {
    path: "/documentupload",
    name: "Upload Documents",
    component: DocumentUpload,
  },
  {
    path: "/doctor/edit/:id",
    name: "Edit Doctor",
    component: AddEditDoctor,
  },
  {
    path: "/doctor/detail/:id",
    name: "Doctor Detail",
    component: DoctorDetail,
  },

  { path: "/viewdoctor", name: "View Doctor", component: ViewDoctor },
  {
    path: "/addmedical",
    name: "Add MedicalConsulation",
    component: AddMedicalConsulation,
  },

  // {path: "//:id",
  // name: "slot",
  // component: Slot,
  // exact: "true",}
  {
    path: "/slot/:id",
    name: "slot",
    component: Slot,
    exact: "true",
  },

  {
    path: "/slot/visitinghours",
    name: "Visiting",
    component: VisitingHours,
  },
  {
    path: "/viewmedical",
    name: "View MedicalConsulation",
    component: ViewMedicalConsulation,
  },
  {
    path: "/schedule/:id",
    name: "View MedicalConsulation",
    component: Calendar,
  },
  {
    path: "/AddProductAds",
    name: "Add Product Ads ",
    component: AddProductAds,
  },
  {
    path: "/ViewProductAdsList",
    name: "View Product Ads List",
    component: ViewProductAdsList,
  },
  {
    path: "/productadsdetail/:id",
    name: "Product Ads Detail",
    component: productadsdetail,
  },
  {
    path: "/AddMedicalAds",
    name: "Add Medical Ads ",
    component: AddProductAds,
  },
  {
    path: "/ViewMedicalAdsList",
    name: "View Medical Ads List",
    component: ViewProductAdsList,
  },
  {
    path: "/medicaladsdetail/:id",
    name: "Medical Ads Detail",
    component: productadsdetail,
  },
  {
    path: "/ViewProductAdsVerifyList",
    name: "View Product Ads List",
    component: ViewProductAdsList,
  },
  {
    path: "/ViewMedicalAdsVerifyList",
    name: "View Medical Ads List",
    component: ViewProductAdsList,
  },
  {
    path: "/productadsVerifydetail/:id",
    name: "Product Ads Detail",
    component: productadsdetail,
  },
  {
    path: "/medicaladsVerifydetail/:id",
    name: "Product Ads Detail",
    component: productadsdetail,
  },
  { path: "/addevent", name: "Add Event", component: AddEvents },
  { path: "/viewevent", name: "View Event", component: ViewEvents },

  {
    path: "/myevent/:id",
    name: "My Events",
    component: ViewEvents,
  },

  {
    path: "/event/detail/:id",
    name: "Event Detail",
    component: EventDetails,
  },
  // { path: "/vieweventDetails", name: "View Event", component: EventDetails },
  { path: "/editevent", name: "Edit Event", component: EditEvent },
  //{ path: "/MyEvent/:id", name: "My Event", component: MyEvent },
  {
    path: "/hospital/documents",
    name: "Hospital Documents",
    component: HospitalViewDocuments,
  },
];

export default routes;
