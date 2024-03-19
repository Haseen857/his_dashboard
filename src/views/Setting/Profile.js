import React, { useState, useRef, useEffect } from "react";
import config from "src/config";
import jwt from "jwt-decode";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import otpschema from "src/schemas/otpschema";
import { validate, validateProperty } from "src/common/utils";

const Profile = (props) => {
  const [profileDetails, setprofileDetails] = useState({});
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [editProfileUrl, seteditProfileUrl] = useState("");
  const [sessionID, setSessionID] = useState("");

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    const errorMessage = validateProperty(e.target, otpschema);
    if (errorMessage) {
      setError({ ...error, [e.target.name]: errorMessage });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  if (localStorage.getItem(config.AuthStorageKey) !== null) {
    var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
    var tokenDetails = jwt(token.accessToken);
    var typeed = tokenDetails.type;
    var roles = tokenDetails.roles;
  }
  useEffect(() => {
    console.log(typeed);
    setLoading(true);

    profileData();
  }, []);

  function profileData() {
    props.ongetUserProfile().then((response) => {
      // storeObjectData(config.AuthStorageKey, response.payload);
      console.log(response.payload);
      setprofileDetails(response.payload);
      if (typeed == "hospital") {
        seteditProfileUrl("viewhospital/editHospital/" + response.payload.id);
      } else if (typeed == "doctor") {
        seteditProfileUrl("doctor/edit/" + response.payload.id);
      } else if (typeed == "hr") {
        seteditProfileUrl("hr/edit/" + response.payload.id);
      }
    });
  }

  const sendotp = (e) => {
    e.preventDefault();

    const payload = {
      phone: profileDetails.mobile,
      // === "Not accepted " ? "Accepted" : value.reason,
      // accept: true,
    };

    props
      .onsendotp(payload)
      .then((response) => {
        if (response.payload.Status == "Success") {
          setSessionID(response.payload.Details);
        } else {
          swal({
            icon: "error",
            title: "Error",
            text: response.payload.Details,
            confirmButtonText: "okay",
            button: true,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        const last3 = error.payload.message.slice(-3);
        const msg = error.payload.response.data.message;
        console.log(error);

        if (last3 === "422") {
          swal({
            icon: "info",
            title: "Already Registered",

            button: false,
            timer: 2000,
          });
        } else if (last3 === "401") {
          swal({
            icon: "error",
            title: "Time out",
            text: `${msg}`,
            button: false,
            timer: 2000,
          }).then(() => {
            props.history.push("/hrverify");
            window.location.reload();
          });
        } else if (last3 === "400") {
          swal({
            icon: "error",
            title: "bad request",
            text: `${msg}`,
            button: false,
            timer: 2000,
          });
        } else
          setError({
            ...error,
          });
      });
  };

  const saveotp = (e) => {
    e.preventDefault();

    const payload = {
      sessionID: sessionID,
      otp: value.otp,
      // === "Not accepted " ? "Accepted" : value.reason,
      // accept: true,
    };

    props
      .onsaveotp(payload)
      .then((response) => {
        if (response.payload.Status == "Success") {
          swal({
            icon: "success",
            title: "Success",
            text: "OTP Verified",
            confirmButtonText: "okay",
            button: true,
          });
          props.history.push("/profile");
          window.location.reload();
        } else {
          swal({
            icon: "error",
            title: "Error",
            text: response.payload.Details,
            confirmButtonText: "okay",
            button: true,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        const last3 = error.payload.message.slice(-3);
        const msg = error.payload.response.data.message;
        console.log(error);

        if (last3 === "422") {
          swal({
            icon: "info",
            title: "Already Registered",

            button: false,
            timer: 2000,
          });
        } else if (last3 === "401") {
          swal({
            icon: "error",
            title: "Time out",
            text: `${msg}`,
            button: false,
            timer: 2000,
          }).then(() => {
            props.history.push("/hrverify");
            window.location.reload();
          });
        } else if (last3 === "400") {
          swal({
            icon: "error",
            title: "bad request",
            text: `${msg}`,
            button: false,
            timer: 2000,
          });
        } else
          setError({
            ...error,
          });
      });
  };

  useEffect(() => {
    if (roles.includes("Super Admin")) {
      props.history.push("/dashboard");
    }
    if (profileDetails.hasOwnProperty("id")) {
      setLoading(false);
    }
    console.log(profileDetails);
  }, [profileDetails]);
  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">Profile</h5>
      </div>
      <div
        className="tablewidth"
        style={{ marginTop: "20px", marginBottom: "30px" }}
      >
        <div className="row">
          <div className="col-md-6"> </div>
        </div>

        <table id="customers">
          <tbody>
            {typeed == "hr" ? (
              <>
                <tr>
                  <td>Profile Photo</td>
                  <td
                    className="lightgray"
                    style={{
                      backgroundImage:
                        'url("https://resources.tallysolutions.com/us/wp-content/uploads/2021/12/what-are-back-office-services-2.jpg")',
                    }}
                    height="100"
                  >
                    <img
                      width="180"
                      style={{ borderRadius: "50%", marginLeft: "380px" }}
                      src={profileDetails.profileUrl}
                    ></img>
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td>Profile Photo</td>
                <td
                  className="lightgray"
                  style={{
                    backgroundImage:
                      'url("https://resources.tallysolutions.com/us/wp-content/uploads/2021/12/what-are-back-office-services-2.jpg")',
                  }}
                  height="100"
                >
                  <img
                    width="180"
                    style={{ borderRadius: "50%", marginLeft: "380px" }}
                    src={
                      profileDetails.profileUrl ??
                      "https://img.freepik.com/free-vector/people-walking-sitting-hospital-building-city-clinic-glass-exterior-flat-vector-illustration-medical-help-emergency-architecture-healthcare-concept_74855-10130.jpg?w=200"
                    }
                  ></img>
                </td>
              </tr>
            )}
            {typeed == "doctor" ? (
              <>
                <tr>
                  <td>Full Name</td>
                  <td className="lightgray">
                    {profileDetails.firstName + " " + profileDetails.lastName}
                  </td>
                </tr>
                <tr>
                  <td>Qualification</td>
                  <td className="lightgray">{profileDetails.degree}</td>
                </tr>
              </>
            ) : (
              <></>
            )}
            {typeed == "hr" ? (
              <>
                <tr>
                  <td>Email Address</td>
                  <td className="lightgray">
                    {profileDetails.users && profileDetails.users.email}
                  </td>
                </tr>
                <tr>
                  <td>Sector</td>
                  <td className="lightgray">{profileDetails.sector}</td>
                </tr>
                <tr>
                  <td>Services</td>
                  <td className="lightgray">{profileDetails.services}</td>
                </tr>
                <tr>
                  <td>CompanyName</td>
                  <td className="lightgray">{profileDetails.companyName}</td>
                </tr>
                <tr>
                  <td>Mobile Number</td>
                  <td className="lightgray">
                    {profileDetails.mobileNo ?? profileDetails.mobile}
                    {"   "}
                    {profileDetails.isMobileVerified == false && (
                      <button
                        className="btn9 rounded-0"
                        type="submit"
                        onClick={sendotp}
                      >
                        Verify
                      </button>
                    )}

                    {"  "}
                    {sessionID && (
                      <input
                        className="col-sm-2 col-form-label"
                        type="text"
                        value={value.otp}
                        placeholder="Enter OTP"
                        name="otp"
                        onChange={onChange}
                      />
                    )}
                    {sessionID && (
                      <button
                        type="submit"
                        onClick={saveotp}
                        className="btn9 rounded-0"
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>Email Address</td>
                  <td className="lightgray">{profileDetails.email}</td>
                </tr>
                <tr>
                  <td>Hospital</td>
                  <td className="lightgray">
                    {typeed == "doctor" && profileDetails.hospitalId == null ? (
                      <a
                        onClick={() => {
                          props.history.push("./viewhospital");
                        }}
                      >
                        Want to join with Hospital?
                      </a>
                    ) : (
                      profileDetails.hospitalName ??
                      profileDetails?.hospitalDetail?.hospitalName
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Mobile Number</td>
                  <td className="lightgray">
                    {profileDetails.mobileNo ?? profileDetails.mobile}
                  </td>
                </tr>
              </>
            )}

            <tr>
              <td>Country</td>
              <td className="lightgray">{profileDetails.country}</td>
            </tr>
            <tr>
              <td>City</td>
              <td className="lightgray">{profileDetails.city}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td className="lightgray">{profileDetails.address}</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        ></div>
      </div>

      <hr className="horizontal-line" />
      <div style={{ textAlign: "end", marginBottom: "50px" }}>
        <Link
          to={editProfileUrl}
          data-toggle="tooltip"
          title="Edit Profile"
          className="rounded-0 Submit-form-view-hospital"
          title-tip="Edit"
          // onClick={redirect}
        >
          Edit Profile
        </Link>
      </div>
    </>
  );
};

export default Profile;
