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
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "react-toastify/dist/ReactToastify.css";
import {
  button,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import EditProfile from "./EditProfile";


const EditSchedulefee = (props) => {
  const [visible, setVisible] = useState(false)
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
  const [consult, setconsult] = useState([]);
  const [currencyy, setCurrenncyy] = useState([]);
  const [doctorName, setName] = useState([]);

  const BASE_URL = "https://countriesnow.space/api/v0.1/countries/currency";

  useEffect(() => {
    const getcurreency = async () => {
      const response = await fetch(`${BASE_URL}`).then((response) =>
        response.json()
      );

      const { data } = response;
      // debugger;
      setCurrenncyy(await data);
    };
    getcurreency();
  }, []);

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

  try {
    let docID = "";
    if (value.doctorId) {
      docID = value.doctorId;
    }

    if (docID.length >= 3 && docID.length < 25 && typeof docID === "string") {
      props
        .onFindDoctor(docID)
        .then((res) => {
          var items = res.payload;
          setName([...items]);
          // debugger;
        })
        .catch((err) => {
          setLoading(false);

          const last3 = err.payload.message.slice(-3);
          const msg = err.payload.response.data.message;
          if (last3 === "404") {
            setError({
              ...error,
              doctorId:
                last3 === "404" && docID.length >= 2
                  ? `${msg}`
                  : error.doctorId,
            });
          } else if (last3 === "401") {
            swal({
              icon: "error",
              title: "Time out",
              text: `${msg}`,
              confirmButtonText: "okay",
              button: true,
            });
          }
        });
    }
  } catch (error) {
    console.log(error);
  }

  const handleMessaging = (e) => {
    let disc = 0;
    let indexed = 0;
    const found = consult.find((element) => {
      if (element.mode === "message") {
        indexed = consult.findIndex((element) => element.mode === "message");
        return true; // stop searching
      }
    });

    const data = {
      messageFirstVisit: value.messageFirstVisit,
      messageFollowUp: value.messageFollowUp,
    };

    const error = validate(data, AddScheduleSchema);
    if (error) return;
    if (value.messageFollowUp) {
      disc = parseInt(value.messageFollowUp);
    } else {
      disc = parseInt(0);
    }

    if (found) {
      consult.splice(indexed, 1, {
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
      });
    } else {
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
    }
    setVisiblemessage(false);
  };

  const handleVideo = () => {
    let disc = 0;
    let indexed = 0;
    const found = consult.find((element) => {
      if (element.mode === "video") {
        indexed = consult.findIndex((element) => element.mode === "video");
        return true; // stop searching
      }
    });

    if (value.messageFollowUp) {
      disc = parseInt(value.videoFollowUp);
    } else {
      disc = parseInt(0);
    }
    const data = {
      videoFirstVisit: value.videoFirstVisit,
      videoFollowUp: value.videoFollowUp,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;
    if (found) {
      consult.splice(indexed, 1, {
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
      });
    } else {
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
    }
    setVisiblevideo(false);
  };

  const handleAudio = () => {
    let disc = 0;
    let indexed = 0;
    const found = consult.find((element) => {
      if (element.mode === "audio") {
        indexed = consult.findIndex((element) => element.mode === "audio");
        return true; // stop searching
      }
    });
    if (value.messageFollowUp) {
      disc = parseInt(value.audioFollowUp);
    } else {
      disc = parseInt(0);
    }
    const data = {
      audioFirstVisit: value.audioFirstVisit,
      audioFollowUp: value.audioFollowUp,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;
    if (found) {
      consult.splice(indexed, 1, {
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
      });
    } else {
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
    }
    setVisibleaudio(false);
  };

  const handlePhysical = () => {
    let disc = 0;
    let indexed = 0;
    const found = consult.find((element) => {
      if (element.mode === "physical") {
        indexed = consult.findIndex((element) => element.mode === "physical");
        return true; // stop searching
      }
    });
    if (value.messageFollowUp) {
      disc = parseInt(value.physicalFollowUp);
    } else {
      disc = parseInt(0);
    }
    const data = {
      physicalFirstVisit: value.physicalFirstVisit,
      physicalFollowUp: value.physicalFollowUp,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;
    if (found) {
      consult.splice(indexed, 1, {
        mode: "physical",
        chargeDetails: [
          {
            visit: "first",
            fee: parseInt(value.physicalFirstVisit),
          },
          {
            visit: "followUp",
            fee: disc,
          },
        ],
      });
    } else {
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
    }

    setVisiblephysical(false);
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    let disc = 0;
    if (value.discount) {
      disc = parseInt(value.discount);
    }

    const data = {
      doctorId: value.doctorId,
      discount: value.discount,
      currency: value.currency,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;

    setLoading(true);

    if (!value.doctorId || !value.discount) {
      // debugger;
      setError({
        ...error,
        doctorId: !value.doctorId ? "doctor Id is required" : error.doctorId,
        discount: !value.discount ? "discount is required" : error.discount,
        currency: !value.currency ? "currency is required" : error.currency,
      });
    } else if (!value.currency) {
      setError({
        ...error,
        currency: !value.currency ? "currency is required" : error.currency,
      });
    } else if (!value.discount) {
      setError({
        ...error,

        discount: !value.discount
          ? "discount amount is required"
          : error.discount,
      });
    } else if (
      (value.messageFirstVisit ||
        value.videoFirstVisit ||
        value.audioFirstVisit ||
        value.physicalFirstVisit) &&
      consult.length !== 0
    ) {
      const payload = {
        doctorId: value.doctorId,
        discount: disc,
        currency: value.currency,
        details: consult,
      };
      // debugger;
      props
        .onsubmitedconsultation(payload)
        .then((response) => {
          // storeObjectData(config.AuthStorageKey, response.payload);
          // props.history.push("");
          swal({
            icon: "success",
            title: "Successfully Saved",
            text: "Saved Consultation Charges , Fill Visiting Hours",
            // confirmButtonText: "okay",
            button: false,
            timer: 3000,
          }).then(() => {
            props.history.push(`/slot/visitinghours/` + value.doctorId);
          });
        })
        .catch((error) => {
          setLoading(false);
          const last3 = error.payload.message.slice(-3);
          const msg = error.payload.response.data.message;

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
            for="inputPassword4"
            className="form-label  add-view-product-label-hospital"
          >
            Doctor Id
          </label>
          <input
            className="form-controls"
            id="currency"
            data-coreui-multiple="false"
            // className="form-controls"
            onChange={onChange}
            name="currency"
            placeholder="Please Enter doctor id"
          // value={hospital.country}
          >

          </input>
          <p style={{ color: "red" }}>
            {error.currency && <div class="text-danger">{error.currency}</div>}
          </p>
        </div>
        <div className="col-md-5">
          <label
            for="inputPassword4"
            className="form-label  add-view-product-label-hospital"
          >
            Currency
          </label>
          <select
            className="form-controls"
            id="currency"
            data-coreui-multiple="false"
            // className="form-controls"
            onChange={onChange}
            name="currency"
          // value={hospital.country}
          >
            <option value={""}>--Select Currency--</option>
            {currencyy.map((getcon) => (
              <option key={getcon.name} value={getcon.currency}>
                {" "}
                {getcon.currency + `  ( ${getcon.name} )`}
              </option>
            ))}
          </select>
          <p style={{ color: "red" }}>
            {error.currency && <div class="text-danger">{error.currency}</div>}
          </p>
        </div>
      </form>
      <br />
      <br />

      <br />

      <div className="row">
        <div className="col-md-3">
          <div className="card-main">
            <div className="inside-main">
              <FaCommentDots className="facicon" />
              <p>Message</p>
            </div>
            <div className="d-flex justify-content-around">
              <div >
                <p style={{ fontWeight: '600', fontSize: '15px', position: "relative", top: "15px", borderBottom: '3px solid' }}>First visit</p>

                <p className="d-flex justify-content-center" style={{ fontWeight: '600', fontSize: '15px' }}>0</p>
              </div>
            </div>
            <div>
              <p style={{ fontWeight: '600', fontSize: '15px', position: "relative", top: "15px", borderBottom: '3px solid' }}>Follow  Up</p>

              <p className="d-flex justify-content-center" style={{ fontWeight: '600', fontSize: '15px' }}>0</p>
            </div>

            <button

              onClick={() => setVisiblemessage(!visiblemessage)}
              className="slot-button"
            // disabled={visitmesg}
            >
              Edit
            </button>
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

                <button
                  className="slot-button"
                  onClick={handleMessaging}
                  disabled={
                    error.messageFirstVisit || error.messageFollowUp
                      ? true
                      : false
                  }
                >
                  Save
                </button>
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
            <div className="d-flex justify-content-around">
              <div >
                <p style={{ fontWeight: '600', fontSize: '15px', position: "relative", top: "15px", borderBottom: '3px solid' }}>First visit</p>

                <p className="d-flex justify-content-center" style={{ fontWeight: '600', fontSize: '15px' }}>0</p>
              </div>
            </div>
            <div>
              <p style={{ fontWeight: '600', fontSize: '15px', position: "relative", top: "15px", borderBottom: '3px solid' }}>Follow  Up</p>

              <p className="d-flex justify-content-center" style={{ fontWeight: '600', fontSize: '15px' }}>0</p>
            </div>
            <button
              onClick={() => setVisiblevideo(!visiblevideo)}
              className="slot-button"
            >
              Edit
            </button>
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

                <button
                  className="slot-button"
                  onClick={handleVideo}
                  disabled={
                    error.videoFirstVisit || error.videoFollowUp ? true : false
                  }
                >
                  Save
                </button>
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

            <div className="d-flex justify-content-around">
              <div >
                <p style={{ fontWeight: '600', fontSize: '15px', position: "relative", top: "15px", borderBottom: '3px solid' }}>First visit</p>

                <p className="d-flex justify-content-center" style={{ fontWeight: '600', fontSize: '15px' }}>0</p>
              </div>
            </div>
            <div>
              <p style={{ fontWeight: '600', fontSize: '15px', position: "relative", top: "15px", borderBottom: '3px solid' }}>Follow  Up</p>

              <p className="d-flex justify-content-center" style={{ fontWeight: '600', fontSize: '15px' }}>0</p>
            </div>
            <button
              onClick={() => setVisibleaudio(!visibleaudio)}
              className="slot-button"
            >
              Edit
            </button>
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

                <button
                  className="slot-button"
                  onClick={handleAudio}
                  disabled={
                    error.audioFirstVisit || error.audioFollowUp ? true : false
                  }
                >
                  Save
                </button>
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
            <div className="d-flex justify-content-around">
              <div >
                <p style={{ fontWeight: '600', fontSize: '15px', position: "relative", top: "15px", borderBottom: '3px solid' }}>First visit</p>

                <p className="d-flex justify-content-center" style={{ fontWeight: '600', fontSize: '15px' }}>0</p>
              </div>
            </div>
            <div>
              <p style={{ fontWeight: '600', fontSize: '15px', position: "relative", top: "15px", borderBottom: '3px solid' }}>Follow  Up</p>

              <p className="d-flex justify-content-center" style={{ fontWeight: '600', fontSize: '15px' }}>0</p>
            </div>
            <button
              onClick={() => setVisiblephysical(!visiblephysical)}
              className="slot-button"
            >
              Edit
            </button>
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

                <button
                  className="slot-button"
                  onClick={handlePhysical}
                  disabled={
                    error.physicalFirstVisit || error.physicalFollowUp
                      ? true
                      : false
                  }
                >
                  Save
                </button>
              </CModalFooter>
            </CModal>
          </div>
        </div>
      </div>
      <br />
      <br />


      <br />

      <div>
        <h3>Slot Duration 15 mint </h3>
      </div>

      <div className="form-header">
        <h5 className="lineformtitle">Doctor's Schedule</h5>
      </div>



      {/* 
      according */}
      <div className="row">
        <div className="col-md-4">
          <section class="container">
            <div class="ac">
              <input class="ac-input" id="ac-1" name="ac-1" type="checkbox" />
              <label class="ac-label d-flex justify-content-between" for="ac-1">Monday
                <div class="checkbox switcher" style={{ marginRight: '30px' }}>
                  <label for="test1">
                    <input type="checkbox" id="test1" value="" checked />
                    <span><small></small></span>

                  </label>
                </div>
              </label>

              <article class="ac-text">
                <div class="ac-sub">
                  <input class="ac-input" id="ac-2" name="ac-2" type="checkbox" />
                  <label class="ac-label" for="ac-2">Add consultation timings</label>
                  <article class="ac-sub-text">
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaCommentDots className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaCommentDots className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaVideo className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaPhoneSquareAlt className="facicon-inside" /></button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaClinicMedical className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaClinicMedical className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                    </div>
                  </article>
                </div>
              </article>

            </div>




          </section>
        </div>


        {/* second div */}
        <div className="col-md-4">
          <section class="container">
            <div class="ac">
              <input class="ac-input" id="ac-1" name="ac-1" type="checkbox" />
              <label class="ac-label d-flex justify-content-between" for="ac-1">Tuesday
                <div class="checkbox switcher" style={{ marginRight: '30px' }}>
                  <label for="test1">
                    <input type="checkbox" id="test1" value="" checked />
                    <span><small></small></span>

                  </label>
                </div>
              </label>

              <article class="ac-text">
                <div class="ac-sub">
                  <input class="ac-input" id="ac-2" name="ac-2" type="checkbox" />
                  <label class="ac-label" for="ac-2">Add consultation timings</label>
                  <article class="ac-sub-text">
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaCommentDots className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaCommentDots className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaVideo className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaPhoneSquareAlt className="facicon-inside" /></button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaClinicMedical className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaClinicMedical className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                    </div>
                  </article>
                </div>
              </article>

            </div>




          </section>
        </div>

        {/* third div */}
        <div className="col-md-4">
          <section class="container">
            <div class="ac">
              <input class="ac-input" id="ac-1" name="ac-1" type="checkbox" />
              <label class="ac-label d-flex justify-content-between" for="ac-1">Wednesday
                <div class="checkbox switcher" style={{ marginRight: '30px' }}>
                  <label for="test1">
                    <input type="checkbox" id="test1" value="" checked />
                    <span><small></small></span>

                  </label>
                </div>
              </label>

              <article class="ac-text">
                <div class="ac-sub">
                  <input class="ac-input" id="ac-2" name="ac-2" type="checkbox" />
                  <label class="ac-label" for="ac-2">Add consultation timings</label>
                  <article class="ac-sub-text">
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaCommentDots className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaCommentDots className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaVideo className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaPhoneSquareAlt className="facicon-inside" /></button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaClinicMedical className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaClinicMedical className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                    </div>
                  </article>
                </div>
              </article>

            </div>




          </section>
        </div>



        {/* four div */}
        <div className="col-md-4">
          <section class="container">
            <div class="ac">
              <input class="ac-input" id="ac-1" name="ac-1" type="checkbox" />
              <label class="ac-label d-flex justify-content-between" for="ac-1">Thursday
                <div class="checkbox switcher" style={{ marginRight: '30px' }}>
                  <label for="test1">
                    <input type="checkbox" id="test1" value="" checked />
                    <span><small></small></span>

                  </label>
                </div>
              </label>

              <article class="ac-text">
                <div class="ac-sub">
                  <input class="ac-input" id="ac-2" name="ac-2" type="checkbox" />
                  <label class="ac-label" for="ac-2">Add consultation timings</label>
                  <article class="ac-sub-text">
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaCommentDots className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaCommentDots className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaVideo className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaPhoneSquareAlt className="facicon-inside" /></button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaClinicMedical className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaClinicMedical className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                    </div>
                  </article>
                </div>
              </article>

            </div>




          </section>
        </div>


        {/* five div */}
        <div className="col-md-4">
          <section class="container">
            <div class="ac">
              <input class="ac-input" id="ac-1" name="ac-1" type="checkbox" />
              <label class="ac-label d-flex justify-content-between" for="ac-1">Friday
                <div class="checkbox switcher" style={{ marginRight: '30px' }}>
                  <label for="test1">
                    <input type="checkbox" id="test1" value="" checked />
                    <span><small></small></span>

                  </label>
                </div>
              </label>

              <article class="ac-text">
                <div class="ac-sub">
                  <input class="ac-input" id="ac-2" name="ac-2" type="checkbox" />
                  <label class="ac-label" for="ac-2">Add consultation timings</label>
                  <article class="ac-sub-text">
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaCommentDots className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaCommentDots className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaVideo className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaPhoneSquareAlt className="facicon-inside" /></button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaClinicMedical className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaClinicMedical className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                    </div>
                  </article>
                </div>
              </article>

            </div>
          </section>
        </div>

        {/* six div */}
        <div className="col-md-4">
          <section class="container">
            <div class="ac">
              <input class="ac-input" id="ac-1" name="ac-1" type="checkbox" />
              <label class="ac-label d-flex justify-content-between" for="ac-1">Saturday
                <div class="checkbox switcher" style={{ marginRight: '30px' }}>
                  <label for="test1">
                    <input type="checkbox" id="test1" value="" checked />
                    <span><small></small></span>

                  </label>
                </div>
              </label>

              <article class="ac-text">
                <div class="ac-sub">
                  <input class="ac-input" id="ac-2" name="ac-2" type="checkbox" />
                  <label class="ac-label" for="ac-2">Add consultation timings</label>
                  <article class="ac-sub-text">
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaCommentDots className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaCommentDots className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaVideo className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaPhoneSquareAlt className="facicon-inside" /></button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaClinicMedical className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaClinicMedical className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                    </div>
                  </article>
                </div>
              </article>

            </div>




          </section>
        </div>

        {/* 7 div */}
        <div className="col-md-4">
          <section class="container">
            <div class="ac">
              <input class="ac-input" id="ac-1" name="ac-1" type="checkbox" />
              <label class="ac-label d-flex justify-content-between" for="ac-1">Sunday
                <div class="checkbox switcher" style={{ marginRight: '30px' }}>
                  <label for="test1">
                    <input type="checkbox" id="test1" value="" checked />
                    <span><small></small></span>

                  </label>
                </div>
              </label>

              <article class="ac-text">
                <div class="ac-sub">
                  <input class="ac-input" id="ac-2" name="ac-2" type="checkbox" />
                  <label class="ac-label" for="ac-2">Add consultation timings</label>
                  <article class="ac-sub-text">
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaCommentDots className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaCommentDots className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}><FaVideo className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>



                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaPhoneSquareAlt className="facicon-inside" /></button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>


                      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: "none" }}> <FaClinicMedical className="facicon-inside" /> </button>
                      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>
                            <FaClinicMedical className="facicon-inside" />
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input type='time' />
                            <h5>To</h5>
                            <input type='time' />
                          </div>

                        </CModalBody>
                        <CModalFooter>
                          <button className="slot-button">Save </button>
                        </CModalFooter>
                      </CModal>
                    </div>
                  </article>
                </div>
              </article>

            </div>
          </section>
        </div>
      </div>

      <hr className="horizontal-line" />
      <div style={{ textAlign: "end", marginBottom: "50px" }}>
        <button
          className="rounded-0 Submit-form-view-hospital"
          type="Submit"
        >
          Submit
        </button>
      </div>


    </>
  );
};

export default EditSchedulefee;
