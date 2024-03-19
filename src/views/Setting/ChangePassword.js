import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Resetschema from "src/schemas/ResetSchema";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
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

import { logOut } from "src/service/storage";
import swal from "sweetalert";

const ResetPassword = (props) => {
  let oldpasswordRef = useRef();
  let passwordRef = useRef();
  let confirmPasswordRef = useRef();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});

  const showIcon = () => <i class="fa fa-eye" aria-hidden="true"></i>;
  const hideIcon = () => <i class="fa fa-eye-slash" aria-hidden="true"></i>;

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    const errorMessage = validateProperty(e.target, Resetschema);
    if (errorMessage) {
      setError({ ...error, [e.target.name]: errorMessage });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!value.newpassword || !value.confirmPassword) {
      setError({
        ...error,
        newpassword: !value.newpassword
          ? "Password is not allowed to be empty"
          : error.newpassword,
        confirmPassword: !value.confirmPassword
          ? "Confirm Password is not allowed to be empty"
          : error.confirmPassword,
      });
      return;
    }
    // const email = JSON.parse(localStorage.getItem(config.UnVerifiedEmail));
    if (value.newpassword != value.confirmPassword) {
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

    if (value.newpassword == value.oldpassword) {
      swal({
        icon: "warning",
        title: "Warning",
        text: "New Password and Old Password Can not be same",
        confirmButtonText: "okay",
        button: true,
      }).then((result) => {
        if (result) {
          // window.location.reload();
        }
      });
      return;
    }
    let url = "";
    const payload = {
      oldPassword: value.oldpassword,
      newPassword: value.newpassword,
    };
    debugger;

    url = "auth/resetPassword";
    props
      .onResetpassword(payload, url)
      .then((response) => {
        swal({
          icon: "success",
          title: "Password Updated",
          text: "Password Updated Successfully",
          confirmButtonText: "okay",
          button: true,
        }).then((result) => {
          if (result) {
            // window.location.reload();
            logOut();
            props.history.push("../login");
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        swal({
          icon: "error",
          title: "Error Occured",
          text: Array.isArray(error.payload.response.data.message)
            ? error.payload.response.data.message.join(", ")
            : error.payload.response.data.message,
          confirmButtonText: "okay",
          button: true,
        }).then((result) => {
          if (result) {
            // window.location.reload();
          }
        });
      });
  };

  return (
    <div className="container-fluid">
      <div>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={4} className="loginform" style={{ marginTop: "40px" }}>
              <CCardGroup>
                <CCard className="p-4 login">
                  <CCardBody>
                    <div style={{ textAlign: "center" }}>
                      <h4>Change Password</h4>
                    </div>
                    <br />

                    <CForm onSubmit={handleLogin}>
                      <CInputGroup className="mb-4 ">
                        <input
                          className="form-register"
                          type="password"
                          placeholder="Enter Old Password"
                          onChange={onChange}
                          name="oldpassword"
                          ref={oldpasswordRef}
                        />
                        <ReactPasswordToggleIcon
                          inputRef={oldpasswordRef}
                          showIcon={showIcon}
                          hideIcon={hideIcon}
                        />
                      </CInputGroup>
                      {error.oldpassword && (
                        <div class="text-danger">{error.oldpassword}</div>
                      )}
                      <CInputGroup className="mb-4">
                        <input
                          className="form-register"
                          type="password"
                          placeholder="Enter New Password"
                          onChange={onChange}
                          name="newpassword"
                          ref={passwordRef}
                        />
                        <ReactPasswordToggleIcon
                          inputRef={passwordRef}
                          showIcon={showIcon}
                          hideIcon={hideIcon}
                        />
                      </CInputGroup>
                      {error.newpassword && (
                        <div class="text-danger">{error.newpassword}</div>
                      )}

                      <CInputGroup className="mb-4">
                        <input
                          className="form-register"
                          type="password"
                          placeholder="Re-Type Password"
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
                      {error.confirmPassword && (
                        <div class="text-danger">{error.confirmPassword}</div>
                      )}
                      <div className="d-grid gap-2 col-12 mx-auto ">
                        <button className="cbutton" type="submit">
                          Change Password
                        </button>
                      </div>
                    </CForm>
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

export default ResetPassword;
