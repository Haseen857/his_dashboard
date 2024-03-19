import React, { useState, useRef, UseHistory } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Registerschema from "src/schemas/Registerschema";
import swal from "sweetalert";

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
import dmws from "../../../assets/images/image-3.png";
import { Redirect } from "react-router-dom";
import config from "src/config";
import { storeObjectData } from "src/service/storage";
import isLoggedIn from "src/common/auth";
import { errors } from "joi-browser";
import ReactPasswordToggleIcon from "react-password-toggle-icon";

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  let inputRef = useRef();
  let confirmPasswordRef = useRef();
  const showIcon = () => <i class="fa fa-eye" aria-hidden="true"></i>;
  const hideIcon = () => <i class="fa fa-eye-slash" aria-hidden="true"></i>;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    const errorMessage = validateProperty(e.target, Registerschema);
    if (errorMessage) {
      setError({ ...error, [e.target.name]: errorMessage });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();

    if (value.password != value.confirmPassword) {
      swal({
        icon: "warning",
        title: "Warning",
        text: "Password and Confirm Password not match",
        confirmButtonText: "okay",
        button: true,
      }).then((result) => {
        if (result) {
          // window.location.reload();
        }
      });
      return;
    }

    if (
      !value.firstName ||
      !value.email ||
      !value.password ||
      !value.confirmPassword ||
      !value.type
    ) {
      setError({
        ...error,
        firstName: !value.firstName
          ? "First Name is not allowed to be empty"
          : error.firstName,
        email: !value.email ? "Email is not allowed to be empty" : error.email,
        password: !value.password
          ? "Password should be Min. 8 charcter long and includes 1 uppercase letter, 1 special character, 1 digit"
          : error.password,
        confirmPassword: !value.confirmPassword
          ? "Password should be Min. 8 charcter long and includes 1 uppercase letter, 1 special character, 1 digit"
          : error.confirmPassword,
        type: !value.type ? "Type is not allowed to be empty" : error.type,
      });
      return;
    }

    const data = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: value.password,
      type: value.type,
    };
    const _error = validate(data, Registerschema);
    if (_error) return;

    setLoading(true);

    // if (checkBtn.current.context._errors.length === 0) {
    const payload = {
      firstName: value.firstName,
      lastName: value.lastName ? value.lastName : "",
      email: value.email,
      password: value.password,
      type: value.type,
    };
    props
      .onSignUp(payload)
      .then((response) => {
        debugger;
        var payloaded = {
          status: response.type,
        };
        window.localStorage.setItem("Status", JSON.stringify(payloaded));
        // setSuccessful(true);
        //   storeObjectData(config.AuthStorageKey, response.payload);
        // console.log(response);
        swal({
          icon: "success",
          title: "Mail Sent",
          text: "verification mail sent on registered Email",
          confirmButtonText: "okay",
          button: true,
        }).then((result) => {
          if (result) {
            // window.location.reload();
            storeObjectData(config.UnVerifiedEmail, value.email);
            props.history.push("../Otp");
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        const messageerror = error.payload.error;

        if (messageerror === "Email already taken") {
          setError({
            ...error,
            // email: "Email already taken",
            email: messageerror ? "Email is already taken" : error.email,
          });
        } else if (messageerror !== "Email already taken") {
          swal({
            icon: "error",
            title: `${messageerror}`,
            // text: "verification mail sent on registered Email",
            confirmButtonText: "okay",
            button: true,
          });
        } else {
          setError({
            ...error,
            ["registerError"]: error.payload.error,
          });
        }
      });
    // }
  };
  // const history = UseHistory();

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content:'center'">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="cardgroupss">
              <div className="p-4 logins">
                <CCardBody>
                  <div className="image-div">
                    <img
                      src={dmws}
                      alt="dmw"
                      width="130"
                      height="70"
                      className="img"
                    />
                    <p className="text-center  textoflogin">SIGN UP</p>
                  </div>
                  <CForm onSubmit={handleRegister}>
                    {/* {!successful && (
                        <div> */}
                    <div className="d-flex rows">
                      <label className="col-sm-4 col-form-label">
                        Registration Type<span className="Mandatory">*</span>
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-multi-select form-register"
                          data-coreui-multiple="false"
                          name="type"
                          onChange={onChange}
                        >
                          {/* <option>Choose one</option> */}
                          <option value="">Choose one</option>
                          <option value="hospital">Hospital</option>
                          {/* <option value="Technician">Technician</option> */}
                          {/* <option value="patient">Patient</option> */}
                          <option value="doctor">Doctor</option>
                          <option value="hr">HR</option>
                          {/* <option value="Hospital Admin">
                                Hospital Admin
                              </option>
                              <option value="Conference Organizer">
                                Conference Organizer
                              </option>
                              <option value="HR Consultation">
                                HR Consultation
                              </option>
                              <option value="Medical Company">
                                Medical Company
                              </option>
                              <option value="Medical Representative">
                                Medical Representative
                              </option>
                              <option value="Medical Innovators">
                                Medical Innovators
                              </option> */}
                          {/* <option value="manufacturer">Manufacturer</option> */}
                        </select>
                      </div>
                    </div>
                    {error.type && (
                      <div className="mx-3 text-danger textalignment">
                        {error.type}
                      </div>
                    )}

                    {/* <div className="d-flex rows">
                      <label className="col-sm-4 col-form-label">
                        Full Name<span className="star">*</span>
                      </label>
                      <div className="col-sm-8">
                        <input
                          className="form-register"
                          placeholder="Enter Full Name"
                        />
                      </div>
                    </div> */}

                    <div className="d-flex rows">
                      <label className="col-sm-4 col-form-label">
                        First Name<span className="Mandatory">*</span>
                      </label>
                      <div className="col-sm-8">
                        <input
                          className="form-register"
                          placeholder="Enter First Name"
                          name="firstName"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    {error.firstName && (
                      <div class=" mx-3 text-danger textalignment">
                        {error.firstName}
                      </div>
                    )}

                    <div className="d-flex rows">
                      <label className="col-sm-4 col-form-label">
                        Last Name
                      </label>
                      <div className="col-sm-8">
                        <input
                          className="form-register"
                          placeholder="Enter Last Name"
                          name="lastName"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    {error.lastName && (
                      <div class="mx-3 text-danger textalignment">
                        {error.lastName}
                      </div>
                    )}

                    <div className="d-flex rows">
                      <label className="col-sm-4 col-form-label">
                        Email<span className="Mandatory">*</span>
                      </label>
                      <div className="col-sm-8">
                        <input
                          className="form-register"
                          placeholder="Enter email address"
                          name="email"
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    {error.email && (
                      <div class="mx-3 text-danger textalignment">
                        {error.email}
                      </div>
                    )}

                    <div className="d-flex rows">
                      <label className="col-sm-4 col-form-label">
                        Password<span className="Mandatory">*</span>
                      </label>

                      <div className="col-sm-8">
                        {/* <input
                          className="form-register"
                          placeholder="Enter password"
                          type="password"
                          name="password"
                          onChange={onChange}

                        /> */}

                        <CInputGroup>
                          <input
                            className="form-register"
                            type="password"
                            placeholder="Enter your Password"
                            autoComplete="new-password"
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
                      </div>
                    </div>
                    {error.password && (
                      <div class="mx-3 text-danger textalignment">
                        {error.password}
                      </div>
                    )}

                    <div className="d-flex rows">
                      <label className="col-sm-4 col-form-label">
                        Confirm Password<span className="Mandatory">*</span>
                      </label>

                      <div className="col-sm-8">
                        {/* <input
                          className="form-register"
                          placeholder="Enter password"
                          type="password"
                          name="password"
                          onChange={onChange}

                        /> */}

                        <CInputGroup>
                          <input
                            className="form-register"
                            type="password"
                            placeholder="Enter your Password"
                            autoComplete="Re-Type Password"
                            onChange={onChange}
                            name="confirmPassword"
                            ref={confirmPasswordRef}
                          />
                          <ReactPasswordToggleIcon
                            inputRef={confirmPasswordRef}
                            showIcon={showIcon}
                            hideIcon={hideIcon}
                          />
                        </CInputGroup>
                      </div>
                    </div>
                    {error.confirmPassword && (
                      <div class="text-danger textalignment">
                        {error.confirmPassword}
                      </div>
                    )}

                    <div className="abc">
                      <p>
                        By clicking the Sign Up button below, you agreed to our
                        privacy policy and terms of use of our website.
                      </p>
                    </div>

                    <div className="d-grid gap-2 col-12 mx-auto ">
                      <button
                        type="submit"
                        className="cbutton"
                        value="Submit"
                        name="submit"
                      >
                        Submit
                      </button>
                    </div>
                    {error.registerError && (
                      <div class=" mx-3 text-danger textalignment">
                        {error.registerError}
                      </div>
                    )}
                    {/* </div>
                      )} */}
                  </CForm>
                  <div className="link">
                    <Link to="#" style={{ textDecoration: "none" }}>
                      Already have an account?
                      <span
                        onClick={(e) => {
                          history.push("/login");
                        }}
                      >
                        {" "}
                        Sign In{" "}
                      </span>
                    </Link>
                  </div>
                </CCardBody>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default Register;
