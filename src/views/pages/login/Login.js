import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import loginschema from "src/schemas/loginschema";
import swal from "sweetalert";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { useEffect } from "react";
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
import { validate, validateProperty } from "src/common/utils";
import { Redirect } from "react-router-dom";

import dmws from "../../../assets/images/image-3.png";
import config from "src/config";
import { logOut, storeObjectData } from "src/service/storage";
import isLoggedIn from "src/common/auth";
import jwt from "jwt-decode";

const Login = (props) => {
  if (localStorage.getItem(config.AuthStorageKey) !== null) {
    var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
    var tokenDetails = jwt(token.accessToken);
    var typeed = tokenDetails.type;
  }

  const form = useRef();
  const checkBtn = useRef();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  let inputRef = useRef();
  const showIcon = () => <i class="fa fa-eye" aria-hidden="true"></i>;
  const hideIcon = () => <i class="fa fa-eye-slash" aria-hidden="true"></i>;

  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    const errorMessage = validateProperty(e.target, loginschema);
    if (errorMessage) {
      setError({ ...error, [e.target.name]: errorMessage });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!value.email || !value.password) {
      setError({
        ...error,
        email: !value.email ? "Email is not allowed to be empty" : error.email,
        password: !value.password
          ? "Password is not allowed to be empty"
          : error.password,
      });
      return;
    }

    const data = { email: value.email, password: value.password };
    const _error = validate(data, loginschema);
    if (_error) return;

    setLoading(true);

    // if (checkBtn.current.context._errors.length === 0) {
    const payloadmail = { email: value.email, password: value.password };
    props
      .onSignIn(payloadmail)
      .then((response) => {
        storeObjectData(config.AuthStorageKey, response.payload);
        const tokenDetails = jwt(response.payload.accessToken);
        const type = tokenDetails.type;

        if (type == "hospital" || type == "doctor" || type == "hr") {
          var payloaded = response.payload;
          payloaded["CanAddConsultationFee"] = true;
          props
            .onGetProfile("profile")
            .then((response) => {
              debugger;
              if (type == "hospital") {
                payloaded["hospitalId"] = response.payload.id;
              } else if (type == "doctor") {
                payloaded["doctorId"] = response.payload.id;
                payloaded["CanAddConsultationFee"] = response.payload.hospitalId
                  ? false
                  : true;
              } else if (type == "hr") {
                payloaded["hrId"] = response.payload.id;
              }
              // if (
              //   response.payload.isVerified == true &&
              //   response.payload.isSubmitted == true &&
              //   response.payload.checked == true
              // ) {
              // } else {
              payloaded["createdByAdmin"] = response.payload.createdByAdmin
                ? response.payload.createdByAdmin
                : false;
              payloaded["check"] = response.payload.checked;
              payloaded["submited"] = response.payload.isSubmitted;
              payloaded["verified"] = response.payload.isVerified;
              payloaded["reason"] = response.payload.reason;
              payloaded["updateddoc"] = response.payload.documentUpdated;
              payloaded["profileUrl"] = response.payload.profileUrl;
              payloaded["documentsAvailable"] =
                response.payload.documentsAvailable;
              // }

              storeObjectData(config.AuthStorageKey, payloaded);
              // debugger;

              window.location.reload();
            })
            .catch((error) => {
              debugger;
              if (type == "hospital") {
                props.history.push("../addhospital");

                // return <Redirect to="../addhospital" />;
              } else if (type == "doctor") {
                props.history.push("../adddoctor");

                // return <Redirect to="../addhospital" />;
              } else if (type == "hr") {
                props.history.push("../addhr");

                // return <Redirect to="../addhospital" />;
              } else props.history.push("../dashboard");

              window.location.reload();
            });
        } else {
          props.history.push("../dashboard");
          // debugger;
          window.location.reload();
        }
      })
      .catch((error) => {
        // debugger;
        if (error.payload.code == 2) {
          swal({
            icon: "warning",
            title: "Mail Sent",
            text: error.payload.error,
            confirmButtonText: "okay",
            button: true,
          }).then((result) => {
            if (result) {
              storeObjectData(config.UnVerifiedEmail, value.email);
              props.history.push("../Otp");
              window.location.reload();
            }
          });
        } else if (error.payload.code == 1) {
          swal({
            icon: "warning",
            title: "Invalid Credentials",
            text: error.payload.error,
            // confirmButtonText: "okay",
            // button: true,
            timer: 3000,
            buttons: false,
          });
        }
        setLoading(false);
        setError({
          ...error,
          ["loginError"]: error.payload.message,
        });
      });
    // } else {
    //   setLoading(false);
    // }
  };

  // console.log(isLoggedIn);
  if (isLoggedIn) {
    // debugger;
    if (typeed == "hospital") {
      if (isLoggedIn.createdByAdmin && !isLoggedIn.submited) {
        debugger;
        return <Redirect to="../hospitaldocument" />;
      } else if (!isLoggedIn.hospitalId && !isLoggedIn.createdByAdmin) {
        debugger;
        return <Redirect to="../addhospital" />;
      } else if (
        isLoggedIn.hospitalId &&
        !isLoggedIn.submited &&
        !isLoggedIn.createdByAdmin
      ) {
        debugger;
        return <Redirect to="../hospitaldocument" />;
      } else if (!isLoggedIn.verified && isLoggedIn.submited) {
        // debugger;
        return <Redirect to="../dashboardlock" />;
      } else if (isLoggedIn.verified && isLoggedIn.submited) {
        // debugger;
        return <Redirect to="../dashboard" />;
      }
    } else if (typeed == "doctor") {
      if (isLoggedIn.createdByAdmin && !isLoggedIn.submited) {
        debugger;
        return <Redirect to="../doctordocument" />;
      } else if (!isLoggedIn.doctorId && !isLoggedIn.createdByAdmin) {
        debugger;
        return <Redirect to="../adddoctor" />;
      } else if (!isLoggedIn.verified && isLoggedIn.doctorId) {
        // debugger;
        return <Redirect to="../dashboardlock" />;
      } else if (isLoggedIn.verified && isLoggedIn.submited) {
        // debugger;
        return <Redirect to="../dashboard" />;
      }
    } else if (typeed == "hr") {
      if (isLoggedIn.createdByAdmin && !isLoggedIn.submited) {
        debugger;
        return <Redirect to="../hrdocument" />;
      } else if (
        (!isLoggedIn.submited || isLoggedIn.submited == undefined) &&
        !isLoggedIn.createdByAdmin
      ) {
        debugger;
        return <Redirect to="../addhr" />;
      } else if (!isLoggedIn.verified && isLoggedIn.submited) {
        // debugger;
        return <Redirect to="../dashboardlock" />;
      } else if (isLoggedIn.verified && isLoggedIn.submited) {
        // debugger;
        return <Redirect to="../dashboard" />;
      }
    } else {
      // debugger;
      return <Redirect to="../dashboard" />;
    }
  }

  return (
    <div className="container-fluid">
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={4} className="loginform">
              <CCardGroup>
                <CCard className="p-4 ">
                  <CCardBody>
                    <div style={{ marginBottom: "50px" }}>
                      <img
                        src={dmws}
                        alt="dmw"
                        width="130"
                        height="70"
                        className="img"
                      />
                      <p className="text-center textoflogin">LOGIN</p>
                    </div>

                    <CForm onSubmit={handleLogin}>
                      <CInputGroup className="mb-3">
                        <input
                          className="form-register"
                          placeholder="Enter your email"
                          autoComplete="email"
                          name="email"
                          onChange={onChange}
                        />
                      </CInputGroup>
                      {error.email && (
                        <div class="text-danger">{error.email}</div>
                      )}
                      <CInputGroup className="mb-2">
                        <input
                          className="form-register"
                          type="password"
                          placeholder="Enter your Password"
                          autoComplete="current-password"
                          onChange={onChange}
                          name="password"
                          ref={inputRef}
                        />
                        <ReactPasswordToggleIcon
                          inputRef={inputRef}
                          showIcon={showIcon}
                          hideIcon={hideIcon}
                        />
                      </CInputGroup>
                      {error.password && (
                        <div class="text-danger">{error.password}</div>
                      )}

                      <CCol xs={12}>
                        <CButton
                          color="link"
                          className="px-0 forget"
                          onClick={() => props.history.push("/verifyemail")}
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                      {error.loginError && (
                        <div class="text-danger">{error.loginError}</div>
                      )}
                      <div className="d-grid gap-2 col-12 mx-auto ">
                        <button
                          className="cbutton"
                          disabled={loading}
                          type="submit"
                          name="submit"
                        >
                          Sign In
                        </button>
                      </div>
                    </CForm>
                    <div className="link">
                      <Link to="#" style={{ textDecoration: "none" }}>
                        Not yet member?
                        <span onClick={() => props.history.push("/register")}>
                          {" "}
                          Sign Up{" "}
                        </span>
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

export default Login;
