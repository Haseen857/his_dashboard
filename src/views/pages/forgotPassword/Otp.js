// import React from "react";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import otpschema from "src/schemas/otpschema";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow,
} from "@coreui/react";
import config from "src/config";
import { validate, validateProperty } from "src/common/utils";
import { storeObjectData } from "src/service/storage";
import jwt from "jwt-decode";
import swal from "sweetalert";
import dmws from "../../../assets/images/dmws.png";

const Otp = (props) => {
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    const errorMessage = validateProperty(e.target, otpschema);
    if (errorMessage) {
      setError({ ...error, [e.target.name]: errorMessage });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  const handleOtp = (e) => {
    e.preventDefault();
    if (!value.otp) {
      setError({
        ...error,
        otp: !value.otp ? "OTP is not allowed to be empty" : error.otp,
      });
      return;
    }
    const email = JSON.parse(localStorage.getItem(config.UnVerifiedEmail));
    var url, payload;
    if (email) {
      payload = { email: email, token: value.otp };
      url = "auth/token/verifyUser";
    } else {
      payload = { token: value.otp };
      url = "auth/token/verify";
    }
    debugger;
    props
      .onOtp(url, payload)
      .then((response) => {
        window.localStorage.removeItem("Status");
        window.localStorage.removeItem("UnVerifiedEmail");
        window.localStorage.removeItem("otpEmail");

        debugger;

        storeObjectData(config.AuthStorageKey, response.payload);
        const tokenDetails = jwt(response.payload.accessToken);
        const type = tokenDetails.type;

        if (type == "hospital" || type == "doctor" || type == "hr") {
          var payload = response.payload;
          props
            .onGetProfile("profile")
            .then((response) => {
              debugger;

              payload["hospitalId"] = response.payload.id;
              payload["createdByAdmin"] = response.payload.createdByAdmin
                ? response.payload.createdByAdmin
                : false;

              storeObjectData(config.AuthStorageKey, payload);
              if (!payload.createdByAdmin) {
                if (email) {
                  props.history.push("../add" + type);
                } else {
                  props.history.push("../ResetPassword");
                }
              } else {
                props.history.push("../" + type + "document");
              }
              window.location.reload();
            })
            .catch((error) => {
              debugger;
              if (email) {
                props.history.push("../add" + type);
              } else {
                props.history.push("../ResetPassword");
              }
              window.location.reload();
            });
        } else {
          if (email) {
            debugger;
            props.history.push("../dashboard");
          } else {
            props.history.push("../ResetPassword");
          }
          window.location.reload();
        }
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

  const genrateotp = (e) => {
    e.preventDefault();
    const email = JSON.parse(localStorage.getItem(config.otpEmail));
    const registerEmail = JSON.parse(
      localStorage.getItem(config.UnVerifiedEmail)
    );

    // const payload = { email: email };
    var url, payload;
    if (registerEmail) {
      payload = { email: registerEmail };
      url = "auth/resendToken";
    } else {
      payload = { email: email };
      url = "auth/forgotpassword/token";
    }

    // ("");
    debugger;
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

  useEffect(() => {
    const store =
      JSON.parse(window.localStorage.getItem("Status")) ||
      JSON.parse(window.localStorage.getItem("otpEmail")) ||
      JSON.parse(window.localStorage.getItem("UnVerifiedEmail"))
        ? true
        : false;

    if (store == false) {
      props.history.push("/login");
      window.location.reload();
    }

    setMinutes(1);
    setSeconds(29);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="container-fluid">
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={4} className="loginform" style={{ width: "500px" }}>
              <CCardGroup>
                <CCard className="login">
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
                        OTP Verification
                      </p> */}
                      <p className="text-center textoflogin">
                        Check your email for the OTP
                      </p>
                    </div>

                    <CForm>
                      <div className="d-flex rows">
                        {/* <label className="col-sm-4 col-form-label">
                          Enter OTP
                        </label> */}

                        <div className="col-sm-12">
                          <input
                            className="form-register"
                            placeholder="One Time Password (OTP)"
                            type="text"
                            name="otp"
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      {error.otp && <div class="text-danger">{error.otp}</div>}

                      <br />

                      <div className="d-grid gap-2 col-12 mx-auto ">
                        <button className="cbutton" onClick={handleOtp}>
                          Submit
                        </button>
                      </div>
                    </CForm>

                    {/* <div className="link">
                      <Link to="#" style={{ textDecoration: "none" }}>
                        Didn't receive OTP ?
                        <span onClick={genrateotp}>Resend</span>
                      </Link>
                    </div> */}

                    <div className="countdown-text">
                      {seconds > 0 || minutes > 0 ? (
                        <p>
                          Time Remaining:{" "}
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                      ) : (
                        <p>Didn't receive OTP ?</p>
                      )}

                      <button
                        disabled={seconds > 0 || minutes > 0}
                        style={{
                          color:
                            seconds > 0 || minutes > 0
                              ? "#DFE3E8"
                              : "rgb(5 13 85)",
                        }}
                        onClick={genrateotp}
                      >
                        Resend OTP
                      </button>
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

export default Otp;
