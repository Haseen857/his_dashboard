import React from "react";
import {
  FaCommentDots,
  FaPhoneSquareAlt,
  FaVideo,
  FaClinicMedical,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { validateProperty, validate } from "src/common/utils";
import AddScheduleSchema from "src/schemas/AddscheduleSchema";
import swal from "sweetalert";
import jwt from "jwt-decode";
import config from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";

const Slot = (props) => {
  const [visiblemessage, setVisiblemessage] = useState(false);
  const [visiblevideo, setVisiblevideo] = useState(false);
  const [visibleaudio, setVisibleaudio] = useState(false);
  const [visiblephysical, setVisiblephysical] = useState(false);
  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;
  const roles = tokenDetails.roles;
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [arr, setarr] = useState([]);
  const [consult, setconsult] = useState([]);
  // const [visit2, setvisit2] = useState("na");
  const [visitmesg, setvisitmesg] = useState(false);
  const [visitvideo, setvisitvideo] = useState(false);
  const [visitaudio, setvisitaudio] = useState(false);
  const [visitphys, setvisitphys] = useState(false);
  // let [daynew, setdaynew] = useState();

  const notify = (day) => toast(`Saved Visiting Hours For ${day}`);
  const notiftTime = (startTime, endTime) =>
    toast(`End Time : ${endTime} cant be less than Start Time : ${startTime}`);
  const notempty = () => toast("End-time cant be Empty");

  function timecheker(startTime, endTime) {
    // debugger;

    if (!startTime || !endTime) {
      return true;
    }

    const timefrom = new Date();
    let temp = startTime.split(":");
    timefrom.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    timefrom.setMinutes(parseInt(temp[1]));

    const timeto = new Date();
    temp = endTime.split(":");
    timeto.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    timeto.setMinutes(parseInt(temp[1]));

    if (timeto < timefrom) {
      notiftTime(startTime, endTime);
      return false;
    } else return true;
  }

  if (type === "doctor") {
    swal({
      icon: "info",
      title: "Not allowed to Register",
      text: "Contact Administration!",
      confirmButtonText: "okay",
      button: true,
    }).then(() => {
      // window.location.reload();
      props.history.push("/dashboard");
      // window.location.reload();
    });
  }
  const onChanged = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });

    // setValue({ ...value, [e.target.name]: e.target.value });
    const errorMessage = validateProperty(e.target, AddScheduleSchema);
    if (errorMessage) {
      setError({ ...error, [e.target.name]: errorMessage });
    } else {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  let flag = false;

  timecheker(value.messagestart, value.messageend);
  timecheker(value.videostart, value.videoend);
  timecheker(value.audiostart, value.audioend);
  timecheker(value.physicalstart, value.physicalend);

  function handleday(day) {
    if (!day) {
      debugger;
      swal({
        icon: "warning",
        title: "Choose a day to store details for",
        text: "Make Sure you have chosen the day for which visiting hours are to be stored",
        // confirmButtonText: "okay",
        button: false,
        timer: 2000,
        // cancel: true,
      });
    } else if (
      !value.messagestart &&
      !value.audiostart &&
      !value.physicalstart &&
      !value.videostart
    ) {
      swal({
        icon: "warning",
        title: "Please fill details",
        text: "Please fill details for atleast one mode",
        // confirmButtonText: "okay",
        button: false,
        timer: 2000,
        // cancel: true,
      });
      flag = true;
    }

    if (
      (value.messagestart && !value.messageend) ||
      (value.audiostart && !value.audioend) ||
      (value.physicalstart && !value.physicalend) ||
      (value.videostart && !value.videoend)
    ) {
      notempty();
      flag = true;
    }

    if (value.day == day) {
      if (
        !flag &&
        timecheker(value.messagestart, value.messageend) &&
        timecheker(value.videostart, value.videoend) &&
        timecheker(value.audiostart, value.audioend) &&
        timecheker(value.physicalstart, value.physicalend)
      ) {
        setarr((current) => [
          ...current,
          {
            day: value.day,
            details: [
              {
                mode: "message",
                startTime: value.messagestart,
                endTime: value.messageend,
              },
              {
                mode: "video",
                startTime: value.videostart,
                endTime: value.videoend,
              },
              {
                mode: "audio",
                startTime: value.audiostart,
                endTime: value.audioend,
              },
              {
                mode: "physical",
                startTime: value.physicalstart,
                endTime: value.physicalend,
              },
            ],
          },
        ]);
        document.querySelector(`#${day}`).disabled = true;
        notify(day);
        flag = false;
      }
    }
  }

  const handle = () => {
    handleday(value.day);
    console.log(arr);
  };

  const handlevisiting = (e) => {
    e.preventDefault();

    const slotdurationcheck = parseInt(value.slotDuration);
    if (slotdurationcheck < 1 || slotdurationcheck > 60) {
      swal({
        icon: "warning",
        title: "Slot Duration is incorrect",
        text: "Slot duration cant be less than 1 minute or greater than 60 minute",
        confirmButtonText: "okay",
        button: true,
      });
    }

    const payload = {
      doctorId: value.doctorId,
      duration: slotdurationcheck,
      timings: arr,
    };

    // if (slotdurationcheck >= 1 || slotdurationcheck <= 60) {
    swal({
      icon: "info",
      title: "Are you sure you want to submit details?",
      text: "Make Sure Visiting Hours for all days are as per your Requirements ",
      confirmButtonText: "okay",
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((result) => {
      if (result) {
        props
          .onsubmitedVisitingHours(payload)
          .then((response) => {
            // storeObjectData(config.AuthStorageKey, response.payload);
            // props.history.push("");

            swal({
              icon: "success",
              title: "Successfull",
              text: `Visiting Hours are been recorded for ${value.doctorId} `,
              confirmButtonText: "okay",
              button: true,
            }).then((result) => {
              if (result) {
                // window.location.reload();
                props.history.push("/dashboard");
                // window.location.reload();
              }
            });
          })
          .catch((error) => {
            setLoading(false);
            const last3 = error.payload.message.slice(-3);
            // console.log(last3);

            // console.log(last3);
            console.log(typeof last3);

            if (last3 === "422") {
              swal({
                icon: "info",
                title: "Already Registered",
                // text: "verification mail sent on registered Email",
                confirmButtonText: "okay",
                button: true,
              });
            } else if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time out",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              });
            } else if (last3 === "400") {
              swal({
                icon: "error",
                title: "Visiting Hours cant be empty",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              });
            } else
              setError({
                ...error,
                // ["AddHospitalerror"]: error.payload.message,
                // ["addHospitalerrr"]: "you have already Submited the form",
              });
          });
      }
    });
    // }
  };

  // if (error.messageFollowUp || error.messageFirstVisit) {
  //   document.getElementById("#handlemessage").disabled = true;
  // }

  const handleMessaging = (e) => {
    let disc = 0;

    const data = {
      messageFirstVisit: value.messageFirstVisit,
      messageFollowUp: value.messageFollowUp,
    };

    const error = validate(data, AddScheduleSchema);
    if (error) return;
    if (value.messageFollowUp) {
      disc = parseInt(value.messageFollowUp);
    }
    setconsult((current) => [
      ...current,
      {
        mode: "message",
        chargeDetails: [
          {
            visit: "first",
            fee: parseInt(value.messageFirstVisit),
          },
          {
            visit: "followUp",
            fee: disc,
          },
        ],
      },
    ]);

    setVisiblemessage(false);
    setvisitmesg(true);
    debugger;
  };

  const handleVideo = () => {
    let disc = 0;
    if (value.messageFollowUp) {
      disc = parseInt(value.videoFollowUp);
    }
    const data = {
      videoFirstVisit: value.videoFirstVisit,
      videoFollowUp: value.videoFollowUp,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;
    setconsult((current) => [
      ...current,
      {
        mode: "video",
        chargeDetails: [
          {
            visit: "first",
            fee: parseInt(value.videoFirstVisit),
          },
          {
            visit: "followUp",
            fee: disc,
          },
        ],
      },
    ]);
    setVisiblevideo(false);
    setvisitvideo(true);
    debugger;
  };

  const handleAudio = () => {
    let disc = 0;
    if (value.messageFollowUp) {
      disc = parseInt(value.audioFollowUp);
    }
    const data = {
      audioFirstVisit: value.audioFirstVisit,
      audioFollowUp: value.audioFollowUp,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;

    setconsult((current) => [
      ...current,
      {
        mode: "audio",
        chargeDetails: [
          {
            visit: "first",
            fee: parseInt(value.audioFirstVisit),
          },
          {
            visit: "followUp",
            fee: disc,
          },
        ],
      },
    ]);

    setLoading(true);
    setVisibleaudio(false);
    setvisitaudio(true);
  };

  const handlePhysical = () => {
    let disc = 0;
    if (value.messageFollowUp) {
      disc = parseInt(value.physicalFollowUp);
    }
    const data = {
      physicalFirstVisit: value.physicalFirstVisit,
      physicalFollowUp: value.physicalFollowUp,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;

    setconsult((current) => [
      ...current,
      {
        mode: "physical",
        chargeDetails: [
          {
            visit: "first",
            fee: parseInt(value.physicalFirstVisit),
          },
          {
            visit: "first",
            fee: disc,
          },
        ],
      },
    ]);

    setLoading(true);
    setvisitphys(true);
    setVisiblephysical(false);
  };
  console.log(consult);
  const handlesubmit = (e) => {
    e.preventDefault();

    let disc = 0;
    if (value.discount) {
      disc = parseInt(value.discount);
    }

    const data = {
      doctorId: value.doctorId,
      discount: value.discount,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;

    console.log(consult);
    setLoading(true);
    // debugger;

    if (
      (value.messageFirstVisit ||
        value.videoFirstVisit ||
        value.audioFirstVisit ||
        value.physicalFirstVisit) &&
      consult.length !== 0
    ) {
      const payload = {
        doctorId: value.doctorId,
        discount: disc,
        details: consult,
      };

      props
        .onsubmitedconsultation(payload)
        .then((response) => {
          // storeObjectData(config.AuthStorageKey, response.payload);
          // props.history.push("");
          debugger;
          swal({
            icon: "success",
            title: "Successfully Saved",
            text: "Saved Consultation Charges , Fill Visiting Hours",
            // confirmButtonText: "okay",
            button: false,
            timer: 3000,
          });
        })
        .catch((error) => {
          setLoading(false);
          const last3 = error.payload.message.slice(-3);
          const msg = error.payload.response.data.message;
          // console.log(last3);
          debugger;
          // console.log(last3);
          console.log(typeof last3);

          if (last3 === "422") {
            swal({
              icon: "info",
              title: "Already Registered",
              // text: "verification mail sent on registered Email",
              confirmButtonText: "okay",
              button: true,
            });
          } else if (last3 === "401") {
            swal({
              icon: "error",
              title: "Time out",
              text: `${msg}`,
              confirmButtonText: "okay",
              button: true,
            });
          } else if (last3 === "400") {
            swal({
              icon: "error",
              title: "bad request",
              text: `${msg}`,
              confirmButtonText: "okay",
              button: true,
            });
          } else
            setError({
              ...error,
              ["Addchargeerror"]: error.payload.message,
              // ["addHospitalerrr"]: "you have already Submited the form",
            });
        });
    } else {
      swal({
        icon: "warning",
        title: "Fill Consultation Charges",
        text: "Setup consulation Charges for Modes according to your need before submitting",
        // confirmButtonText: "okay",
        button: false,
        timer: 3000,
        // cancel: true,
      });
    }
  };
  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">consultation charges</h5>
      </div>
      <form className="row  d-flex justify-content-start ml-20">
        <div className="col-md-5">
          <label
            for="inputEmail4"
            className="form-label add-view-product-label-hospital"
          >
            Doctor ID
          </label>
          <input
            type="text"
            className="form-controls"
            placeholder="Enter Doctor ID"
            id="doctorId"
            name="doctorId"
            // value={hospital.hospitalName}
            onChange={onChange}
          />
          <p style={{ color: "red" }}>
            {error.doctorId && <div class="text-danger">{error.doctorId}</div>}
          </p>
        </div>

        <div className="col-md-5">
          <label
            for="inputPassword4"
            className="form-label  add-view-product-label-hospital"
          >
            Discount
          </label>
          <input
            type="string"
            className="form-controls"
            placeholder="enter discount"
            // value={hospital.mobileNo}
            onChange={onChange}
            id="discount"
            name="discount"
          />
          <p style={{ color: "red" }}>
            {error.discount && <div class="text-danger">{error.discount}</div>}
          </p>
        </div>

        <div className="col-md-2">
          <button
            type="button"
            class="slot-button"
            onClick={handlesubmit}
            style={{ position: "relative", top: "32px", left: "47px" }}
          >
            Save
          </button>
          {error.Addchargeerror && (
            <div class="text-danger">{error.Addchargeerror}</div>
          )}
        </div>
      </form>
      <br />
      <br />

      <div className="row">
        <div className="col-md-3">
          <div className="card-main">
            <div className="inside-main">
              <FaCommentDots className="facicon" />
              <p>Message</p>
            </div>
            <CButton
              onClick={() => setVisiblemessage(!visiblemessage)}
              className="slot-button"
              disabled={visitmesg}
            >
              Setup
            </CButton>
            <CModal
              alignment="center"
              visible={visiblemessage}
              onClose={() => setVisiblemessage(false)}
            >
              <CModalHeader>
                <CModalTitle>
                  <div>
                    <h5 style={{ marginLeft: "57px" }}>
                      Messaging Consultation Fee
                    </h5>
                  </div>
                </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="row">
                  <div className="col-md-5">
                    <h6>1st appoinment:</h6>
                  </div>
                  <div className="col-md-6">
                    <input
                      onChange={onChange}
                      id="messageFirstVisit"
                      name="messageFirstVisit"
                      type="text"
                      style={{ padding: "3px  6px", outline: "none" }}
                      required
                    />

                    <p style={{ color: "red" }}>
                      {error.messageFirstVisit && (
                        <div class="text-danger">{error.messageFirstVisit}</div>
                      )}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5">
                    <i class="fa-solid fa-message"></i>
                    <h6>Follow-up:</h6>
                  </div>
                  <div className="col-md-6">
                    <input
                      onChange={onChange}
                      id="messageFollowUp"
                      name="messageFollowUp"
                      type="text"
                      style={{ padding: "3px  6px", outline: "none" }}
                      disabled={
                        value.messageFirstVisit && !error.messageFirstVisit
                          ? false
                          : true
                      }
                    />
                    <p style={{ color: "red" }}>
                      {error.messageFollowUp && (
                        <div class="text-danger">{error.messageFollowUp}</div>
                      )}
                    </p>
                  </div>
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton
                  onClick={() => setVisiblemessage(false)}
                  className="slot-button"
                >
                  Close
                </CButton>
                <CButton
                  className="slot-button"
                  onClick={handleMessaging}
                  disabled={
                    error.messageFirstVisit || error.messageFollowUp
                      ? true
                      : false
                  }
                >
                  Save
                </CButton>
              </CModalFooter>
            </CModal>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-main">
            <div className="inside-main">
              <FaVideo className="facicon" />
              <p>Video Call</p>
            </div>
            <CButton
              onClick={() => setVisiblevideo(!visiblevideo)}
              className="slot-button"
              disabled={visitvideo}
            >
              Setup
            </CButton>
            <CModal
              alignment="center"
              visible={visiblevideo}
              onClose={() => setVisiblevideo(false)}
            >
              <CModalHeader>
                <CModalTitle>
                  <div>
                    <h5 style={{ marginLeft: "57px" }}>
                      Video Consultation Fee
                    </h5>
                  </div>
                </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="row">
                  <div className="col-md-5">
                    <h6>1st appoinment:</h6>
                  </div>
                  <div className="col-md-6">
                    <input
                      onChange={onChange}
                      id="videoFirstVisit"
                      name="videoFirstVisit"
                      type="text"
                      style={{ padding: "3px  6px", outline: "none" }}
                    />
                    <p style={{ color: "red" }}>
                      {error.videoFirstVisit && (
                        <div class="text-danger">{error.videoFirstVisit}</div>
                      )}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5">
                    <i class="fa-solid fa-message"></i>
                    <h6>Follow-up:</h6>
                  </div>
                  <div className="col-md-6">
                    <input
                      onChange={onChange}
                      id="videoFollowUp"
                      name="videoFollowUp"
                      type="text"
                      style={{ padding: "3px  6px", outline: "none" }}
                      disabled={
                        value.videoFirstVisit && !error.videoFirstVisit
                          ? false
                          : true
                      }
                    />
                    <p style={{ color: "red" }}>
                      {error.videoFollowUp && (
                        <div class="text-danger">{error.videoFollowUp}</div>
                      )}
                    </p>
                  </div>
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton
                  onClick={() => setVisiblevideo(false)}
                  className="slot-button"
                >
                  Close
                </CButton>
                <CButton
                  className="slot-button"
                  onClick={handleVideo}
                  disabled={
                    error.videoFirstVisit || error.videoFollowUp ? true : false
                  }
                >
                  Save
                </CButton>
              </CModalFooter>
            </CModal>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-main">
            <div className="inside-main">
              <FaPhoneSquareAlt className="facicon" />
              <p>Voice Call</p>
            </div>
            <CButton
              onClick={() => setVisibleaudio(!visibleaudio)}
              className="slot-button"
              disabled={visitaudio}
            >
              Setup
            </CButton>
            <CModal
              alignment="center"
              visible={visibleaudio}
              onClose={() => setVisibleaudio(false)}
            >
              <CModalHeader>
                <CModalTitle>
                  <div>
                    <h5 style={{ marginLeft: "57px" }}>
                      Voice Consultation Fee
                    </h5>
                  </div>
                </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="row">
                  <div className="col-md-5">
                    <h6>1st appoinment:</h6>
                  </div>
                  <div className="col-md-6">
                    <input
                      onChange={onChange}
                      id="audioFirstVisit"
                      name="audioFirstVisit"
                      type="text"
                      style={{ padding: "3px  6px", outline: "none" }}
                    />
                    <p style={{ color: "red" }}>
                      {error.audioFirstVisit && (
                        <div class="text-danger">{error.audioFirstVisit}</div>
                      )}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5">
                    <i class="fa-solid fa-message"></i>
                    <h6>Follow-up:</h6>
                  </div>
                  <div className="col-md-6">
                    <input
                      onChange={onChange}
                      id="audioFollowUp"
                      name="audioFollowUp"
                      type="text"
                      style={{ padding: "3px  6px", outline: "none" }}
                      disabled={
                        value.audioFirstVisit && !error.audioFirstVisit
                          ? false
                          : true
                      }
                    />
                    <p style={{ color: "red" }}>
                      {error.audioFollowUp && (
                        <div class="text-danger">{error.audioFollowUp}</div>
                      )}
                    </p>
                  </div>
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton
                  onClick={() => setVisibleaudio(false)}
                  className="slot-button"
                >
                  Close
                </CButton>
                <CButton
                  className="slot-button"
                  onClick={handleAudio}
                  disabled={
                    error.audioFirstVisit || error.audioFollowUp ? true : false
                  }
                >
                  Save
                </CButton>
              </CModalFooter>
            </CModal>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-main">
            <div className="inside-main">
              <FaClinicMedical className="facicon" />
              <p>physical</p>
            </div>
            <CButton
              onClick={() => setVisiblephysical(!visiblephysical)}
              className="slot-button"
              disabled={visitphys}
            >
              Setup
            </CButton>
            <CModal
              alignment="center"
              visible={visiblephysical}
              onClose={() => setVisiblephysical(false)}
            >
              <CModalHeader>
                <CModalTitle>
                  <div>
                    <h5 style={{ marginLeft: "57px" }}>
                      Physical Consultation Fee
                    </h5>
                  </div>
                </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="row">
                  <div className="col-md-5">
                    <h6>1st appoinment:</h6>
                  </div>
                  <div className="col-md-6">
                    <input
                      onChange={onChange}
                      id="physicalFirstVisit"
                      name="physicalFirstVisit"
                      type="text"
                      style={{ padding: "3px  6px", outline: "none" }}
                    />
                    <p style={{ color: "red" }}>
                      {error.physicalFirstVisit && (
                        <div class="text-danger">
                          {error.physicalFirstVisit}
                        </div>
                      )}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5">
                    <i class="fa-solid fa-message"></i>
                    <h6>Follow-up:</h6>
                  </div>
                  <div className="col-md-6">
                    <input
                      onChange={onChange}
                      id="physicalFollowUp"
                      name="physicalFollowUp"
                      type="text"
                      style={{ padding: "3px  6px", outline: "none" }}
                      disabled={
                        value.physicalFirstVisit && !error.physicalFirstVisit
                          ? false
                          : true
                      }
                    />
                    <p style={{ color: "red" }}>
                      {error.physicalFollowUp && (
                        <div class="text-danger">{error.physicalFollowUp}</div>
                      )}
                    </p>
                  </div>
                </div>
              </CModalBody>
              <CModalFooter>
                <CButton
                  onClick={() => setVisiblephysical(false)}
                  className="slot-button"
                >
                  Close
                </CButton>
                <CButton
                  className="slot-button"
                  onClick={handlePhysical}
                  disabled={
                    error.physicalFirstVisit || error.physicalFollowUp
                      ? true
                      : false
                  }
                >
                  Save
                </CButton>
              </CModalFooter>
            </CModal>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div>
        <h5
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "27px",
            marginBottom: "30px",
          }}
        >
          Visiting Hours
        </h5>
      </div>
      <ToastContainer />
      <form className="row  d-flex justify-content-start ml-20">
        <div className="col-md-5">
          <label className="form-label add-view-product-label">
            {" "}
            Choose Days{" "}
          </label>
          <select
            className="form-multi-select form-controls"
            id="day"
            name="day"
            onChange={onChanged}
          >
            <option>Choose day</option>
            <option name="monday" value="monday" id="monday">
              Monday
            </option>
            <option name="tuesday" value="tuesday" id="tuesday">
              Tuesday
            </option>
            <option name="wednesday" value="wednesday" id="wednesday">
              Wednesday
            </option>
            <option name="thursday" value="thursday" id="thursday">
              Thursday
            </option>
            <option name="friday" value="friday" id="friday">
              Friday
            </option>
            <option name="saturday" value="saturday" id="saturday">
              Saturday
            </option>
            <option name="sunday" value="sunday" id="sunday">
              Sunday
            </option>
          </select>
        </div>

        <div className="col-md-5">
          <label
            for="inputPassword4"
            className="form-label add-view-product-label"
          >
            Slot Duration
          </label>
          <input
            className="form-multi-select form-controls"
            placeholder="60"
            onChange={onChanged}
            id="slotDuration"
            name="slotDuration"
            type="number"
            min="1"
            max="60"
            onInput="this.value = Math.abs(this.value) > 0 ? Math.abs(this.value) : null"
          />
        </div>

        <div className="col-md-2">
          <button
            type="button"
            class="slot-button"
            onClick={handle}
            style={{ position: "relative", top: "49px", left: "47px" }}
          >
            {/* {value.day ? `save for ${value.day}` : "Save"} */}
            Save
          </button>
        </div>
      </form>
      <br />
      <br />

      <table id="customer-slot">
        <tr>
          <th></th>
          <th>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h4>Start Time</h4>
            </div>
          </th>
          <th>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h4>End Time</h4>
            </div>
          </th>
        </tr>
        <tr>
          <td>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FaCommentDots style={{ fontSize: "40px", color: "#213f9a" }} />
            </div>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#213f9a",
              }}
            >
              Message
            </span>
          </td>
          <td>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                onChange={onChanged}
                type="time"
                id="messagestart"
                name="messagestart"
                className="form-controls-for-slot"
              />
            </div>
          </td>
          <td>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                onChange={onChanged}
                type="time"
                id="messageend"
                name="messageend"
                className="form-controls-for-slot"
              />
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FaVideo style={{ fontSize: "40px", color: "#213f9a" }} />
            </div>

            <span
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#213f9a",
              }}
            >
              Video Call
            </span>
          </td>
          <td>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                onChange={onChanged}
                type="time"
                id="videostart"
                name="videostart"
                className="form-controls-for-slot"
              />
            </div>
          </td>
          <td>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                onChange={onChanged}
                type="time"
                id="videoend"
                name="videoend"
                className="form-controls-for-slot"
              />
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FaPhoneSquareAlt
                style={{ fontSize: "40px", color: "#213f9a" }}
              />
            </div>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#213f9a",
              }}
            >
              Voice Call
            </span>
          </td>
          <td>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                onChange={onChanged}
                type="time"
                id="audiostart"
                name="audiostart"
                className="form-controls-for-slot"
              />
            </div>
          </td>
          <td>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                onChange={onChanged}
                type="time"
                id="audioend"
                name="audioend"
                className="form-controls-for-slot"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FaClinicMedical style={{ fontSize: "40px", color: "#213f9a" }} />
            </div>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#213f9a",
              }}
            >
              physical
            </span>
          </td>
          <td>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                onChange={onChanged}
                type="time"
                id="physicalstart"
                name="physicalstart"
                className="form-controls-for-slot"
              />
            </div>
          </td>
          <td>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                onChange={onChanged}
                type="time"
                id="physicalend"
                name="physicalend"
                className="form-controls-for-slot"
              />
            </div>
          </td>
        </tr>
      </table>
      <div
        style={{ textAlign: "end", marginBottom: "50px", marginTop: "40px" }}
      >
        <h6>save timings for all days</h6>
        <button
          className="rounded-0 Submit-form-view-hospital"
          type="button"
          onClick={handlevisiting}
        >
          Save Timings
        </button>
      </div>
    </>
  );
};

export default Slot;
