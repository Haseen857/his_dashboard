import React, { useEffect, useState } from "react";
import { Route, useParams, useHistory } from "react-router-dom";
// import { storeObjectData } from "src/service/storage";
import swal from "sweetalert";
import example from "../../assets/images/doctor.png";
import jwt from "jwt-decode";
import config from "src/config";
import isLoggedIn from "src/common/auth";

function EventDetails(props) {
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;
  var roles = tokenDetails.roles;
  //   debugger;
  //   useEffect(() => {

  //     // debugger;
  //   }, []);

  // const store = JSON.parse(window.localStorage.getItem("eventData"));

  // //   console.log(store);
  // //   const value = props.location.query;
  // const value = store.eventData;
  // //   console.log(isLoggedIn);
  // // console.log(value);
  // const redirect = () => {
  //   window.localStorage.removeItem("eventData");
  //   history.push("/viewevent");
  // };

  const redirect = () => {
    history.push("/viewevent");
  };

  var interestedInEvent = function () {
    // if (roles.includes("Super Admin")) {
    // var id = this.getAttribute("data-id");
    const payload = { eventId: id };
    // debugger;
    swal({
      icon: "warning",
      title: "Are you sure?",
      text: "Are you interested in the event",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, I'm Interested",
      cancelButtonText: "No",
      buttons: true,
    }).then((result) => {
      if (result) {
        props
          .oninterestedEvent(payload)
          .then((response) => {
            swal({
              icon: "success",
              title: "Registered for Event",
              confirmButtonText: "okay",
              button: true,
            }).then((result) => {
              if (result) {
                window.location.reload();
              }
            });

            // props.history.push("/viewhospital");
          })
          .catch((error) => {
            setLoading(false);
            // console.log(error.payload.message);
            const last3 = error.payload.message.slice(-3);
            if (last3 === "403") {
              swal({
                icon: "error",
                title: "Not Authorised",
                text: "contact Administration if this is a mistake!",
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                props.history.push("/viewhospital");
                window.location.reload();
              });
            } else if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time Out",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              });
            } else if (last3 === "422") {
              swal({
                icon: "error",
                title: "Registered Already ",
                text: "Registered Already for the selected Event",
                confirmButtonText: "okay",
                button: true,
              });
            }
          });
      }
    });
    // } else {
    //   swal({
    //     icon: "warning",
    //     title: "Not Authorised",
    //     text: "contact Administration if this is a mistake!",
    //     confirmButtonText: "okay",
    //     button: true,
    //   });
    // }
  };

  var NotinterestedInEvent = function () {
    // if (roles.includes("Super Admin")) {
    // var id = this.getAttribute("data-id");
    // const payload = { eventId: id };
    let url = `events/register/cancel/${id}`;
    // debugger;
    swal({
      icon: "warning",
      title: "Are you sure?",
      text: "Are you not interested in the event",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "No, I'm not Interested",
      cancelButtonText: "No",
      buttons: true,
    }).then((result) => {
      if (result) {
        props
          .onnotinterestedEvent(url)
          .then((response) => {
            swal({
              icon: "success",
              title: "Registeration Cancelled",
              confirmButtonText: "okay",
              button: true,
            }).then((result) => {
              if (result) {
                window.location.reload();
              }
            });

            // props.history.push("/viewhospital");
          })
          .catch((error) => {
            setLoading(false);
            // console.log(error.payload.message);
            const last3 = error.payload.message.slice(-3);
            if (last3 === "403") {
              swal({
                icon: "error",
                title: "Not Authorised",
                text: "contact Administration if this is a mistake!",
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                props.history.push("/viewevent");
                window.location.reload();
              });
            } else if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time Out",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              });
            } else if (last3 === "422") {
              swal({
                icon: "error",
                title: "Registered Already ",
                text: "Registered Already for the selected Event",
                confirmButtonText: "okay",
                button: true,
              });
            }
          });
      }
    });
    // } else {
    //   swal({
    //     icon: "warning",
    //     title: "Not Authorised",
    //     text: "contact Administration if this is a mistake!",
    //     confirmButtonText: "okay",
    //     button: true,
    //   });
    // }
  };

  useEffect(() => {
    debugger;
    let url = `events/${id}`;
    // if(type == "hospital"){
    // url=`hospital-doctors/${id}`
    //   }
    props
      .ongetEventDetail(url)
      .then((response) => {
        // storeObjectData(config.AuthStorageKey, response.payload);
        // response.payload["firstName"] = response.payload.user.firstName;
        // response.payload["lastName"] = response.payload.user.lastName;
        setValue(response.payload);
      })
      .catch((error) => {
        const last3 = error.payload.message.slice(-3);
        if (last3 === "403") {
          swal({
            icon: "error",
            title: "Not Authorised",
            text: "contact Administration if this is a mistake!",
            confirmButtonText: "okay",
            button: true,
          }).then(() => {
            props.history.push("/viewdoctor");
            window.location.reload();
          });
        } else if (last3 === "401") {
          swal({
            icon: "error",
            title: "Time-out",
            text: "Re login or contact your administrator",
            confirmButtonText: "okay",
            button: true,
          });
        }
        setLoading(false);
        setError({
          ...error,
          ["AddDoctorError"]: error.payload.message,
        });
      });
  }, []);

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">Event DETAILS</h5>
      </div>
      <div
        className="tablewidth"
        style={{ marginTop: "-53px", marginBottom: "30px" }}
      >
        <div className="row">
          <div className="col-md-6"> </div>
          <div
            className="col-md-6"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <button
              className="btn btn-xs btn-info tbl-btn-common tbl-btn-primary"
              onClick={redirect}
            >
              Back
            </button>
            {type == "doctor" && value.alreadyRegistered == false ? (
              <button
                className="btn btn-xs btn-info tbl-btn-common tbl-btn-success"
                style={{ marginLeft: "10px", height: "40px" }}
                onClick={interestedInEvent}
              >
                I'm Interested
              </button>
            ) : type == "doctor" ? (
              <button
                className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
                style={{ marginLeft: "10px", height: "40px" }}
                onClick={NotinterestedInEvent}
              >
                I'm not Interested
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* <div className="order-detail">
          
          <button className="doctort-back" onClick={redirect} >Back</button>
        </div> */}
        <table id="customers">
          <tbody>
            <tr>
              <td>Cover</td>
              <td className="lightgray">
                <img
                  width="200"
                  src={!value.cover ? example : value.cover}
                ></img>
              </td>
            </tr>

            <tr>
              <td>topic</td>
              <td className="lightgray">{value.topic}</td>
            </tr>
            <tr>
              <td>Spokes Person</td>
              <td className="lightgray">{value.spokesPerson}</td>
            </tr>
            <tr>
              <td>Event ID</td>
              <td className="lightgray">{value.id}</td>
            </tr>
            <tr>
              <td>Fee</td>
              <td className="lightgray">{value.eventFee}</td>
            </tr>
            <tr>
              <td>Discount Percentage</td>
              <td className="lightgray">{value.discountPercent}</td>
            </tr>
            <tr>
              <td>Coupon</td>
              <td className="lightgray">{value.coupon}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td className="lightgray">{value.description}</td>
            </tr>
            <tr>
              <td>Event Link</td>
              <td className="lightgray">
                <a href={value.eventLink} target="_blank">
                  {value.eventLink}
                </a>
              </td>
            </tr>
            <tr>
              <td>Department</td>
              <td className="lightgray">{value.departmentId}</td>
            </tr>
            <tr>
              <td>Start Date</td>
              <td className="lightgray">{value.startDate}</td>
            </tr>
            <tr>
              <td>End Date</td>
              <td className="lightgray">{value.endDate}</td>
            </tr>
            <tr>
              <td>Start Time</td>
              <td className="lightgray">{value.startTime}</td>
            </tr>
            <tr>
              <td>End Time</td>
              <td className="lightgray">{value.endTime}</td>
            </tr>
            <tr>
              <td>Payment Status</td>
              <td className="lightgray">{value.paymentStatus}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td className="lightgray">{value.address}</td>
            </tr>
            <tr>
              <td>City</td>
              <td className="lightgray">{value.city}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td className="lightgray">{value.country}</td>
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
        >
          {/* <a
            href={"../../doctor/edit/" + id}>
            <button className="Submit-form-view-hospital" type="button">
              Update
            </button>
          </a> */}
        </div>
      </div>
    </>
  );
}

export default EventDetails;
