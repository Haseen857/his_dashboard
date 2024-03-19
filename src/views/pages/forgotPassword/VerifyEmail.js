import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import config from "src/config";
import { validate, validateProperty } from "src/common/utils";
import { storeObjectData } from "src/service/storage";

import swal from "sweetalert";
import Forgotschema from "src/schemas/Forgotschema";

import dmws from "../../../assets/images/dmws.png";

const VerifyEmail = (props) => {
  const [value, setValue] = useState({});
  const [error, setError] = useState({});

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    const errorMessage = validateProperty(e.target, Forgotschema);
    if (errorMessage) {
      setError({ ...error, [e.target.name]: errorMessage });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  const genrateotp = (e) => {
    e.preventDefault();
    if (!value.email) {
      setError({
        ...error,
        email: !value.email ? "Email is not allowed to be empty" : error.email,
      });
      return;
    }
    // const email = JSON.parse(localStorage.getItem(config.UnVerifiedEmail));
    const payload = { email: value.email };
    storeObjectData(config.otpEmail, payload.email);
    debugger;
    var url = "auth/forgotpassword/token";
    props
      .onForgotPassword(payload, url)
      .then((response) => {
        swal({
          icon: "success",
          title: "OTP Sent",
          text: "OTP sent on registered Email",
          confirmButtonText: "okay",
          button: true,
        }).then((result) => {
          if (result) {
            // window.location.reload();
            props.history.push("../Otp");
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        swal({
          icon: "warning",
          title: error.payload.error,
          text: error.payload.message,
          confirmButtonText: "okay",
          button: true,
        }).then((result) => {
          if (error.payload.statusCode == 422) {
            props.history.push("../login");
            window.location.reload();
          } else {
            window.location.reload();
          }
        });
        debugger;
      });
  };
  return (
    <div className="container-fluid">
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={4} className="loginform">
              <CCardGroup>
                <CCard className="p-4 login">
                  <CCardBody>
                    <div style={{ marginBottom: "50px" }}>
                      <img
                        src={dmws}
                        alt="dmw"
                        width="130"
                        height="70"
                        className="img"
                      />
                      {/* <p className="text-center textoflogin">
                        Reset Password
                      </p> */}
                      <p className="text-center textoflogin">
                        Please Enter your registered email
                      </p>
                    </div>

                    <CForm>
                      <CInputGroup className="mb-3">
                        <input
                          className="form-register"
                          placeholder="Email Address"
                          autoComplete="username"
                          type="text"
                          onChange={onChange}
                          name="email"
                        />
                      </CInputGroup>
                      {error.email && (
                        <div class="text-danger">{error.email}</div>
                      )}

                      <div className="d-grid gap-2 col-12 mx-auto ">
                        <button className="cbutton" onClick={genrateotp}>
                          Reset
                        </button>
                      </div>
                    </CForm>
                    <div className="link">
                      <Link to="#" style={{ textDecoration: "none" }}>
                        Already Registered?
                        <span onClick={() => props.history.push("/login")}>
                          Login
                        </span>
                        {/* <span>Login</span> */}
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default VerifyEmail;
