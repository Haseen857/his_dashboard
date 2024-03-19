import React from "react";
import CIcon from "@coreui/icons-react";
import jwt from "jwt-decode";
import config from "src/config";
import isLoggedIn from "./common/auth";
import {
  cilHome,
  cilHospital,
  cilUserFollow,
  cilMedicalCross,
  cibEventbrite,
  cilCheck,
  cilAccountLogout,
  cilSettings,
  cilStar,
  cilContact,
  cilPeople,
} from "@coreui/icons";
import { CNav, CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import classNames from "classnames";

let roles = [];
let type;
let doctorId;
let CanAddConsultationFee;
if (localStorage.getItem(config.AuthStorageKey) !== null) {
  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  type = tokenDetails.type;
  roles.push(tokenDetails.roles);
  doctorId = token.doctorId;
  CanAddConsultationFee = token.CanAddConsultationFee;
  // debugger;
}

let _nav = "";
if (type != "hr") {
  _nav =
    type == "hospital" &&
    (isLoggedIn.submited == false ||
      isLoggedIn.submited == undefined ||
      isLoggedIn.verified == false ||
      isLoggedIn.check == false)
      ? isLoggedIn.createdByAdmin
        ? [
            {
              component: CNavItem,
              name: "Document-Upload",
              to: "/hospitaldocument",
            },
            {
              component: CNavItem,
              name: "Sign out",
              to: "/signOut",
              icon: (
                <CIcon icon={cilAccountLogout} customClassName="nav-icon" />
              ),
            },
          ]
        : [
            {
              component: CNavItem,
              name: "Complete Profile",
              to: "/addhospital",
            },
            {
              component: CNavItem,
              name: "Document-Upload",
              to: "/hospitaldocument",
            },
            {
              component: CNavItem,
              name: "Sign out",
              to: "/signOut",
              icon: (
                <CIcon icon={cilAccountLogout} customClassName="nav-icon" />
              ),
            },
          ]
      : type == "doctor" &&
        (isLoggedIn.submited == false ||
          isLoggedIn.submited == undefined ||
          isLoggedIn.verified == false ||
          isLoggedIn.check == false)
      ? isLoggedIn.createdByAdmin
        ? [
            {
              component: CNavItem,
              name: "Document-Upload",
              to: "/doctordocument",
            },
          ]
        : [
            {
              component: CNavItem,
              name: "Complete Profile",
              to: "/adddoctor",
            },
            // {
            //   component: CNavItem,
            //   name: "Document-Upload",
            //   to: "/doctordocument",
            // },
          ]
      : [
          roles.includes("Super Admin") || type == null
            ? {
                component: CNavItem,

                name: `Dashboard - Admin`,
                to: "/dashboard",
                icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
                badge: {
                  color: "info",
                  text: "NEW",
                },
              }
            : {
                component: CNavItem,

                name: `Dashboard - ${
                  type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
                }`,
                to: "/dashboard",
                icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
                badge: {
                  color: "info",
                  text: "NEW",
                },
              },

          type === "doctor" || roles.includes("Doctor")
            ? {
                component: CNavItem,
                name: "Documents Verification",
                to: "/",
                icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
                items: [],
              }
            : {
                component: CNavGroup,
                name: "Documents Verification",
                to: "/",
                icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
                items:
                  roles.includes("Super Admin") || type == null
                    ? [
                        {
                          component: CNavItem,
                          name: "Verify Hospital",
                          to: "/hospitalverify",
                        },
                        {
                          component: CNavItem,
                          name: "Verify Doctor",
                          to: "/individualdoctor",
                        },
                        {
                          component: CNavItem,
                          name: "Verify HR",
                          to: "/hrverify",
                        },
                        {
                          component: CNavItem,
                          name: "Verify Product Ads",
                          to: "/ViewProductAdsVerifyList",
                        },
                        {
                          component: CNavItem,
                          name: "Verify Medical Ads",
                          to: "/ViewMedicalAdsVerifyList",
                        },
                      ]
                    : [
                        {
                          component: CNavItem,
                          name: "Verify Doctor",
                          to: "/doctorverify",
                        },
                      ],
              },

          type === "doctor" || type === "hospital" || roles.includes("Doctor")
            ? {
                component: CNavItem,
                name: "Hospital",
                to: "/",
                // icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
                items: [],
              }
            : {
                component: CNavGroup,
                name: "Hospital",
                to: "/",
                icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
                items:
                  roles.includes("Super Admin") || type == null
                    ? [
                        {
                          component: CNavItem,
                          name: "Add Hospital",
                          to: "/addhospitalAdmin",
                        },
                        {
                          component: CNavItem,
                          name: "View Hospital",
                          to: "/viewhospital",
                        },
                      ]
                    : [],
              },

          type !== "doctor"
            ? {
                component: CNavGroup,
                name: "Essential Information",
                to: "/speciality",
                icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
                items: [
                  {
                    component: CNavItem,
                    name: "Specialities",
                    to: "/speciality",
                  },

                  {
                    component: CNavItem,
                    name: "Documents",
                    to: "/viewlegaldocument",
                  },
                ],
              }
            : {
                component: CNavItem,
                name: "Setting",
                to: "/",
                icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
                items: [],
              },

          type === "hospital"
            ? {
                component: CNavGroup,
                name: "Doctor",
                to: "/",
                icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
                items: [
                  {
                    component: CNavItem,
                    name: "Add Doctor",
                    to: "/adddoctor",
                    // icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
                  },

                  {
                    component: CNavItem,
                    name: "View Doctor",
                    to: "/viewdoctor",
                  },
                ],
              }
            : {
                component: CNavItem,
                name: "Setting",
                to: "/",
                icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
                items: [],
              },

          roles.includes("Super Admin") || type == null
            ? {
                component: CNavGroup,
                name: "HR",
                to: "/",
                icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
                items: [
                  {
                    component: CNavItem,
                    name: "HR List",
                    to: "/hrlist",
                  },
                  {
                    component: CNavItem,
                    name: "All Jobs",
                    to: "/alljob",
                  },

                  // {
                  //   component: CNavGroup,
                  //   name: "Candidate",
                  //   to: "/",
                  //   icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
                  //   items: [
                  //     {
                  //       component: CNavItem,
                  //       name: "Applied Candidate ",
                  //       to: "/appliedjob",
                  //     },
                  //     {
                  //       component: CNavItem,
                  //       name: "Filtered Candidate",
                  //       to: "/filtercandidates",
                  //     },
                  //     {
                  //       component: CNavItem,
                  //       name: "Shortlist Candidates",
                  //       to: "/shortlistcandidate",
                  //     },
                  //     {
                  //       component: CNavItem,
                  //       name: "Schedule InterViews",
                  //       to: "/scheduleinterview",
                  //     },
                  //   ],
                  // },
                ],
              }
            : {
                component: CNavItem,
                name: "Setting",
                to: "/",
                icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
                items: [],
              },

          {
            component: CNavGroup,
            name: "Events",
            to: "/",
            icon: <CIcon icon={cibEventbrite} customClassName="nav-icon" />,
            items: [
              {
                component: CNavItem,
                name: "Add Event",
                to: "/addevent",
              },

              {
                component: CNavItem,
                name: "View Event",
                to: "/viewevent",
              },
              type === "doctor"
                ? {
                    component: CNavItem,
                    name: "My Registrations",
                    to: "/myevent/" + "reg",
                  }
                : {
                    component: CNavItem,
                    name: "My Event",
                    to: "/",
                    icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
                    items: [],
                  },
              roles.includes("Super Admin") || type == null
                ? {
                    component: CNavItem,
                    name: "My Events",
                    to: "/myevent/" + "creator",
                  }
                : {
                    component: CNavItem,
                    name: "My Event",
                    to: "/",
                    icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
                    items: [],
                  },
              // {
              //   component: CNavItem,
              //   name: "Edit Schedule Fees",
              //   to: "/editschedulefees",
              // },
            ],
          },

          type === "hospital" || roles.includes("Super Admin") || type == null
            ? {
                component: CNavGroup,
                name: "Advertisement",
                to: "/ViewProductAdsList",
                icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
                items:
                  type === "hospital" ||
                  roles.includes("Super Admin") ||
                  type == null
                    ? [
                        {
                          component: CNavItem,
                          name: "Product Ads",
                          to: "/ViewProductAdsList",
                        },
                        {
                          component: CNavItem,
                          name: "Medical Ads",
                          to: "/ViewMedicalAdsList",
                        },
                      ]
                    : [
                        {
                          component: CNavItem,
                          name: "Setting",
                          to: "/",
                          icon: (
                            <CIcon icon={cilCheck} customClassName="nav-icon" />
                          ),
                          items: [],
                        },
                      ],
              }
            : {
                component: CNavItem,
                name: "Setting",
                to: "/",
                icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
                items: [],
              },

          type === "hospital" || type === "doctor" || type === "hr"
            ? {
                component: CNavGroup,
                name: "Setting",
                to: "/profile",
                icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
                items:
                  type === "hospital"
                    ? [
                        {
                          component: CNavItem,
                          name: "Profile",
                          to: "/profile",
                        },
                        {
                          component: CNavItem,
                          name: "Change Password",
                          to: "/changepassword",
                        },
                        {
                          component: CNavItem,
                          name: "View Documents",
                          to: "/hospital/documents",
                        },
                      ]
                    : [
                        {
                          component: CNavItem,
                          name: "Profile",
                          to: "/profile",
                        },
                        {
                          component: CNavItem,
                          name: "Change Password",
                          to: "/changepassword",
                        },
                        {
                          component: CNavItem,
                          name: "View Calender",
                          to: "/schedule/" + doctorId,
                        },
                        CanAddConsultationFee === true
                          ? {
                              component: CNavItem,
                              name: "Edit Schedule and Fee",
                              to: "/slot/" + doctorId,
                            }
                          : {
                              component: CNavItem,
                              name: "Edit Schedule",
                              to: "/slot/" + doctorId,
                            },
                      ],
              }
            : {
                component: CNavItem,
                name: "Setting",
                to: "/",
                icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
                items: [],
              },

          {
            component: CNavItem,
            name: "Sign out",
            to: "/signOut",
            icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
          },
        ];
} else {
  _nav =
    type == "hr" &&
    (isLoggedIn.submited == false ||
      isLoggedIn.submited == undefined ||
      isLoggedIn.verified == false ||
      isLoggedIn.check == false)
      ? isLoggedIn.createdByAdmin
        ? [
            {
              component: CNavItem,
              name: "Document-Upload",
              to: "/hrdocument",
            },
            {
              component: CNavItem,
              name: "Sign out",
              to: "/signOut",
              icon: (
                <CIcon icon={cilAccountLogout} customClassName="nav-icon" />
              ),
            },
          ]
        : [
            {
              component: CNavItem,
              name: "Complete Profile",
              to: "/addhr",
            },

            {
              component: CNavItem,
              name: "Document-Upload",
              to: "/hrdocument",
            },
          ]
      : [
          {
            component: CNavItem,
            name: `Dashboard - ${
              type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
            }`,
            to: "/dashboard",
            icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
            badge: {
              color: "info",
              text: "NEW",
            },
          },

          {
            component: CNavGroup,
            name: "HR",
            to: "/",
            icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
            items: [
              // {
              //   component: CNavItem,
              //   name: "Add HR",
              //   to: "/addhr",
              // },
              {
                component: CNavItem,
                name: "HR List",
                to: "/hrlist",
              },
              {
                component: CNavItem,
                name: "All Jobs",
                to: "/alljob",
              },
              {
                component: CNavItem,
                name: "Candidate List",
                to: "/CandidateList",
              },
              // {
              //   component: CNavGroup,
              //   name: "Candidate",
              //   to: "/",
              //   icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
              //   items: [
              //     {
              //       component: CNavItem,
              //       name: "Applied Candidate ",
              //       to: "/appliedjob",
              //     },
              //     {
              //       component: CNavItem,
              //       name: "Filtered Candidate",
              //       to: "/filtercandidates",
              //     },
              //     {
              //       component: CNavItem,
              //       name: "Shortlist Candidates",
              //       to: "/shortlistcandidate",
              //     },
              //     {
              //       component: CNavItem,
              //       name: "Schedule InterViews",
              //       to: "/scheduleinterview",
              //     },
              //   ],
              // },
            ],
          },

          type === "hospital" || type === "doctor" || type === "hr"
            ? {
                component: CNavGroup,
                name: "Setting",
                to: "/profile",
                icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
                items:
                  type === "hospital"
                    ? [
                        {
                          component: CNavItem,
                          name: "Profile",
                          to: "/profile",
                        },
                        {
                          component: CNavItem,
                          name: "Change Password",
                          to: "/changepassword",
                        },
                        {
                          component: CNavItem,
                          name: "View Documents",
                          to: "/hospital/documents",
                        },
                      ]
                    : [
                        {
                          component: CNavItem,
                          name: "Profile",
                          to: "/profile",
                        },
                        {
                          component: CNavItem,
                          name: "Change Password",
                          to: "/changepassword",
                        },
                      ],
              }
            : {
                component: CNavItem,
                name: "Setting",
                to: "/",
                icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
                items: [],
              },

          {
            component: CNavItem,
            name: "Sign out",
            to: "/signOut",
            icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
          },
        ];
}

export default _nav;
