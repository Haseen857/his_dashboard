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
import { doc } from "prettier";

const VisitingHours = (props) => {
  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;
  const roles = tokenDetails.roles;
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [arr, setarr] = useState([]);
  const [modearr, setmodearr] = useState([]);
  const [visitdays, setvisitdays] = useState(false);
  const [doctorName, setName] = useState([]);
  const ided = props.location;
  const idd = ided.pathname.substring(ided.pathname.lastIndexOf("/") + 1);

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });

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
    if (docID.length >= 3 && docID.length <= 25 && typeof docID === "string") {
      props
        .onFindDoctor(docID)
        .then((res) => {
          var items = res.payload;
          setName([...items]);
        })
        .catch((err) => {
          setLoading(false);
          // debugger;
          const last3 = err.payload.message.slice(-3);
          const msg = err.payload.response.data.message;
          if (last3 === "404") {
            setError({
              ...error,
              doctorId: last3 === "404" ? `${msg}` : error.doctorId,
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

  const notify = (day) => toast(`Saved Visiting Hours For ${day}`);
  const notiftTime = (startTime, endTime) =>
    toast(`End Time : ${endTime} cant be less than Start Time : ${startTime}`);
  const notempty = () => toast("End-time cant be Empty");

  function timecheker(startTime, endTime) {
    if (!startTime || !endTime) {
      return true;
    }

    const timefrom = new Date();
    let temp = startTime.split(":");
    timefrom.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    timefrom.setMinutes(parseInt(temp[1]));
    timefrom.setSeconds(parseInt(temp[2]));

    const timeto = new Date();
    temp = endTime.split(":");
    timeto.setHours((parseInt(temp[0]) - 1 + 24) % 24);
    timeto.setMinutes(parseInt(temp[1]));
    timeto.setSeconds(parseInt(temp[2]));

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
  let flag = false;

  timecheker(value.messagestart, value.messageend);
  timecheker(value.videostart, value.videoend);
  timecheker(value.audiostart, value.audioend);
  timecheker(value.physicalstart, value.physicalend);

  function handleday(day) {
    if (!day) {
      swal({
        icon: "warning",
        title: "Choose a day to store details for",
        text: "Make Sure you have chossen a day for which visiting hours to be stored",
        // confirmButtonText: "okay",
        button: false,
        timer: 3000,
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
        setvisitdays(false);
        // document.querySelector(`#submitday`).disabled = false;
        if (value.messagestart && value.messageend) {
          modearr.push({
            mode: "message",
            startTime: value.messagestart,
            endTime: value.messageend,
          });
        }
        if (value.videostart && value.videoend) {
          modearr.push({
            mode: "video",
            startTime: value.videostart,
            endTime: value.videoend,
          });
        }
        if (value.audiostart && value.audioend) {
          modearr.push({
            mode: "audio",
            startTime: value.audiostart,
            endTime: value.audioend,
          });
        }
        if (value.physicalstart && value.physicalend) {
          modearr.push({
            mode: "physical",
            startTime: value.physicalstart,
            endTime: value.physicalend,
          });
        }

        arr.push({
          day: value.day,
          timings: [...modearr],
        });

        if (day) {
          document.querySelector(`#${day}`).disabled = true;
          setValue({ ...value, day: "" });
          // setvisitdays(true);
          notify(day);
          modearr.splice(0, modearr.length);
        }
        flag = false;
      }
    }
  }

  const handle = () => {
    if (!value.day) {
      swal({
        icon: "warning",
        title: "Choose a day to store details for",
        text: "Make Sure you have chossen a day for which visiting hours to be stored",
        // confirmButtonText: "okay",
        button: false,
        timer: 3000,
        // cancel: true,
      });
    } else {
      handleday(value.day);
    }
  };

  const handlevisiting = (e) => {
    e.preventDefault();

    const data = {
      doctorId: value.doctorId,
    };
    const error = validate(data, AddScheduleSchema);
    if (error) return;

    const slotdurationcheck = parseInt(value.slotDuration);

    let docid;

    if (idd == "visitinghours" || idd == "") {
      docid = value.doctorId;
      //   ;
    } else {
      docid = idd;
      //   ;
    }

    const payload = {
      doctorId: docid,
      duration: slotdurationcheck,
      days: [...arr],
    };

    debugger;

    if (!docid || !slotdurationcheck || !arr.length) {
      swal({
        icon: "warning",
        title: "Please fill all details",
        text: "Please fill all details",
        confirmButtonText: "okay",
        button: true,
      });
      setError({
        ...error,
        doctorId: !value.doctorId ? "doctor Id is required" : error.doctorId,
        // slotDuration: !slotdurationcheck
        //   ? "Slot Timings is required"
        //   : error.slotDuration,
        // day: !value.day ? "Select a Day" : error.day,
      });
    } else if (slotdurationcheck < 1 || slotdurationcheck > 60) {
      swal({
        icon: "warning",
        title: "Slot Duration is incorrect",
        text: "Slot duration cant be less than 1 minute or greater than 60 minute",
        confirmButtonText: "okay",
        button: true,
      });
    } else {
      //   ;
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
                text: `Visiting Hours are been recorded for ${docid} `,
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
              const msg = error.payload.response.data.message;
              const errMsg = error.payload.response.data.error;

              if (last3 === "422") {
                swal({
                  icon: "info",
                  title: `${errMsg}`,
                  text: `${msg}`,
                  confirmButtonText: "okay",
                  button: true,
                }).then((result) => {
                  props.history.push("/dashboard");
                });
              } else if (last3 === "401") {
                swal({
                  icon: "error",
                  title: `${errMsg}`,
                  text: `${msg}`,
                  confirmButtonText: "okay",
                  button: true,
                });
              } else if (last3 === "400") {
                swal({
                  icon: "error",
                  title: `${errMsg}`,
                  text: `${msg}`,
                  confirmButtonText: "okay",
                  button: true,
                }).then((result) => {
                  window.location.reload();
                });
              } else
                setError({
                  ...error,
                });
            });
        }
      });
    }
  };
  return (
    <div>
      <div className="form-header">
        <h5 className="lineformtitle">Visiting Hours</h5>
      </div>
      {idd == "visitinghours" || idd == "" ? (
        <div className="col-md-5">
          <label
            for="inputEmail4"
            className="form-label add-view-product-label-hospital"
          >
            Doctor ID
          </label>
          <div>
            <input
              type="text"
              list="browsers"
              className="form-controls"
              placeholder="Enter Doctor ID or Search by Name"
              id="doctorId"
              name="doctorId"
              onChange={onChange}
            />
            <datalist id="browsers">
              <select
                className="form-controls"
                data-coreui-multiple="false"
                // className="form-controls"
                onChange={onChange}
                id="doctorId"
                name="doctorId"
                // value={hospital.country}
              >
                {doctorName.map((getcon) => (
                  <option key={getcon.id} value={getcon.id}>
                    {" "}
                    {getcon.firstName + " " + getcon.lastName}
                  </option>
                ))}
              </select>
            </datalist>
          </div>
          <p style={{ color: "red" }}>
            {error.doctorId && <div class="text-danger">{error.doctorId}</div>}
          </p>
        </div>
      ) : (
        <div></div>
      )}
      <ToastContainer />
      <form className="row  d-flex justify-content-start ml-20">
        <div className="col-md-6">
          <label
            for="inputPassword4"
            className="form-label add-view-product-label"
          >
            Slot Duration
          </label>
          <div data-placeholder="minutes">
            <input
              className="form-multi-select form-controls"
              placeholder="60 minutes"
              onChange={onChanged}
              id="slotDuration"
              name="slotDuration"
              type="number"
              min="1"
              max="60"
              onInput="this.value = Math.abs(this.value) > 0 ? Math.abs(this.value) : null"
            />
          </div>
        </div>
        <div className="col-md-6">
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
      </form>
      <br />
      <br />
      <div>
        <div className="d-flex justify-content-end">
          <h6>
            {value.day
              ? `Save Timings for ${value.day} `
              : "Save Timing For Days"}
          </h6>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="rounded-0 Submit-form-view-hospital"
            type="button"
            id="submitday"
            // disabled={value.day ? false : true}
            onClick={handle}
          >
            Save Timings
          </button>
        </div>
      </div>
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
                step="2"
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
                step="2"
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
                step="2"
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
                step="2"
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
                step="2"
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
                step="2"
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
                step="2"
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
                step="2"
              />
            </div>
          </td>
        </tr>
      </table>

      <div
        style={{ textAlign: "end", marginBottom: "50px", marginTop: "40px" }}
      >
        <button
          className="rounded-0 Submit-form-view-hospital"
          type="button"
          onClick={handlevisiting}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default VisitingHours;
