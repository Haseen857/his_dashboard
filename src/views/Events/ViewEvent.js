import React, { useEffect, useMemo } from "react";

import { MDBIcon } from "mdbreact";

import { useState } from "react";

import DataTable from "react-data-table-component";

import { Link, useHistory, useLocation, useParams } from "react-router-dom";
// import isLoggedIn from "src/common/auth";

import swal from "sweetalert";
import jwt from "jwt-decode";
import config from "../../config";
import Tooltip from "src/components/Tooltip";

const ViewEvent = (props) => {
  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;

  const roles = tokenDetails.roles;
  // console.log(roles);
  // console.log(roles);
  const [loading, setLoading] = useState(false);
  // const [tasks, setTasks] = useState([]);
  const [data, setData] = useState(null);
  const { id } = useParams();

  const goDasboard = () => {
    props.history.push("/dashboard");
  };

  useEffect(() => {
    var elements = document.getElementsByClassName("tbl-btn-danger");
    // || roles.includes("Hospital Admin")
    var deleteDoctor = function () {
      if (roles.includes("Super Admin")) {
        var id = this.getAttribute("data-id");
        // debugger;
        swal({
          icon: "warning",
          title: "Are you sure?",
          text: "You can't undo change once deleted",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Delete",
          cancelButtonText: "No",
          buttons: true,
        }).then((result) => {
          if (result) {
            props
              .ondeleteEvent(id)
              .then((response) => {
                swal({
                  icon: "success",
                  title: "Record Deleted",
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
                }
              });
          }
        });
      } else {
        swal({
          icon: "warning",
          title: "Not Authorised",
          text: "contact Administration if this is a mistake!",
          confirmButtonText: "okay",
          button: true,
        });
      }
    };

    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", deleteDoctor, false);
    }

    var _elements = document.getElementsByClassName("tbl-btn-success");
    // || roles.includes("Hospital Admin")
    var interestedInEvent = function () {
      // if (roles.includes("Super Admin")) {
      var id = this.getAttribute("data-id");
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

    for (var i = 0; i < _elements.length; i++) {
      _elements[i].addEventListener("click", interestedInEvent, false);
    }
  });

  const customStyles = {
    rows: {
      style: {
        color: "#213f9a",
        fontSize: "13px",
      },
    },
    headCells: {
      style: {
        color: "#213f9a",
        fontSize: "16px",
        fontWeight: 800,
        paddingLeft: "6px",
        paddingRight: "6px",
      },
    },
    cells: {
      style: {
        paddingLeft: "6px",
        paddingRight: "6px",
      },
    },
  };

  let customData = {
    columns: [
      {
        name: "S.No.",
        selector: (row) => row.serial,
        // width: "80px",
      },
      {
        name: "Event Type",
        selector: (row) => row.eventType,
        // width: "80px",
      },
      {
        name: "Topic",
        selector: (row) => row.topic,
        // width: "80px",
      },
      {
        name: "Mode",
        selector: (row) => row.mode,
        // width: "80px",
      },
      {
        name: "Speaker",
        selector: (row) => row.speaker,
        // width: "80px",
      },
      // {
      //   name: "Start Date",
      //   selector: (row) => row.startDate,
      // },
      // {
      //   name: "End Date",
      //   selector: (row) => row.endDate,
      // },
      // {
      //   name: "Start Time",
      //   selector: (row) => row.startTime,
      // },
      // {
      //   name: "End Time",
      //   selector: (row) => row.endTime,
      // },

      // {
      //   name: "Address",
      //   selector: (row) => row.address,
      // },
      // {
      //   name: "City",
      //   selector: (row) => row.city,
      // },

      // {
      //   name: "Country",
      //   selector: (row) => row.country,
      //   // width: "100px",
      // },
      {
        name: "Actions",
        selector: (row) => row.actions,
      },
    ],
    rows: [],
  };

  const fetchAllLists = (date) => {
    // if (roles.includes("Hospital Admin")) {
    try {
      setLoading(true);
      var url = "";
      if (id === "reg") {
        url = `events/my-registrations`;
      } else if (id === "creator") {
        url = `events/my-events`;
      } else {
        url = `events?date=${date}`;
      }
      // var dated;
      // if (e.target.value) {
      //   dated = e.target.value;
      // } else {
      //   dated = e;
      // }

      props
        .ongetEvent(url)
        .then((response) => {
          // debugger;
          setLoading(false);
          var items = response.payload;
          // debugger;
          var rows = [];

          for (var i = 0; i < items.length; i++) {
            var row = {};
            var _items = {};
            if (id === "reg") {
              _items = items[i].event;
            } else {
              _items = items[i];
            }

            //event , mode ,topic ,

            row["serial"] = i + 1;
            row["eventType"] = _items.type;
            row["topic"] = _items.topic;
            row["mode"] = _items.mode;
            row["speaker"] = _items.spokesPerson;
            // row["startDate"] = items[i].startDate;
            // row["endDate"] = items[i].endDate;
            // row["startTime"] = items[i].startTime;
            // row["endTime"] = items[i].endTime;
            // row["address"] = items[i].address;
            // row["city"] = items[i].city;
            // row["country"] = items[i].country;
            if (roles.includes("Super Admin")) {
              row["actions"] = (
                <div style={{ display: "flex" }}>
                  <Tooltip title="View Event">
                    <Link
                      to={{
                        pathname: "/event/detail/" + _items.id,
                        query: _items,
                      }}
                      // to={}
                      data-toggle="tooltip"
                      className={
                        "btn btn-xs btn-info tbl-btn-common tbl-btn-info "
                        // : "changeColor"
                      }
                      id={i}
                      onClick={(e) => {
                        var payloaded = {
                          eventData: items[e.currentTarget.id],
                        };
                        window.localStorage.setItem(
                          "eventData",
                          JSON.stringify(payloaded)
                        );
                      }}
                      title-tip="Order Details"
                    >
                      <MDBIcon icon="info-circle" />
                    </Link>
                  </Tooltip>

                  <Tooltip title="Edit Event">
                    <Link
                      to={{
                        pathname: "/editevent",
                      }}
                      // to={}
                      data-toggle="tooltip"
                      className={
                        "btn btn-xs btn-info tbl-btn-common tbl-btn-cyan "
                        // : "changeColor"
                      }
                      id={i}
                      onClick={(e) => {
                        var payloaded = {
                          eventData: items[e.currentTarget.id],
                        };
                        window.localStorage.setItem(
                          "eventData",
                          JSON.stringify(payloaded)
                        );
                      }}
                      title-tip="Order Details"
                    >
                      <MDBIcon icon="edit" />
                    </Link>
                  </Tooltip>

                  <Tooltip title="Delete Event">
                    <button
                      // href='doctors' onclick='return deleteDoctor(e,items[i].id)'
                      // onClick= {(e)=>deleteDoctor(e,items[i].id)}
                      href="#"
                      //onClick={(e) => this.deleteDoctor(2)}
                      data-toggle="tooltip"
                      title=""
                      className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
                      title-tip="Delete"
                      data-id={_items.id}
                    >
                      <MDBIcon icon="trash-alt" />
                    </button>
                  </Tooltip>

                  {/* <Tooltip title="Interested In Event">
                    <button
                      // href='doctors' onclick='return deleteDoctor(e,items[i].id)'
                      // onClick= {(e)=>deleteDoctor(e,items[i].id)}
                      href="#"
                      //onClick={(e) => this.deleteDoctor(2)}
                      data-toggle="tooltip"
                      title=""
                      className="btn btn-xs btn-info tbl-btn-common tbl-btn-success"
                      title-tip="Interested"
                      data-id={items[i].id}
                    >
                      <MDBIcon icon="trash-alt" />
                    </button>
                  </Tooltip> */}
                </div>
              );
            } else {
              row["actions"] = (
                <div style={{ display: "flex" }}>
                  <Tooltip title="View Event">
                    <Link
                      to={{
                        pathname: "/event/detail/" + _items.id,
                        query: _items,
                      }}
                      // to={}
                      data-toggle="tooltip"
                      className={
                        "btn btn-xs btn-info tbl-btn-common tbl-btn-info "
                        // : "changeColor"
                      }
                      id={i}
                      onClick={(e) => {
                        var payloaded = {
                          eventData: items[e.currentTarget.id],
                        };
                        window.localStorage.setItem(
                          "eventData",
                          JSON.stringify(payloaded)
                        );
                      }}
                      title-tip="Order Details"
                    >
                      <MDBIcon icon="info-circle" />
                    </Link>
                  </Tooltip>

                  {/* <Tooltip title="Interested In Event">
                    <button
                      // href='doctors' onclick='return deleteDoctor(e,items[i].id)'
                      // onClick= {(e)=>deleteDoctor(e,items[i].id)}
                      href="#"
                      //onClick={(e) => this.deleteDoctor(2)}
                      data-toggle="tooltip"
                      title=""
                      className="btn btn-xs btn-info tbl-btn-common tbl-btn-success"
                      title-tip="Interested"
                      data-id={items[i].id}
                    >
                      <MDBIcon icon="trash-alt" />
                    </button>
                  </Tooltip> */}
                </div>
              );
            }
            rows.push(row);
            // debugger;
          }

          customData.rows = rows;

          setData(customData);
        })
        .catch((e) => {
          // debugger;
          const last3 = e.payload.response.data.status;
          // const last3 = 0;
          const msg = e.payload.response.data.message;
          // const msg = "";
          if (last3 === "403") {
            swal({
              icon: "warning",
              title: "Not Authorised",
              text: `${msg}`,
              confirmButtonText: "okay",
              button: true,
            }).then(() => {
              props.history.push("/dashboard");
            });
          } else if (last3 === "401") {
            swal({
              icon: "error",
              title: "Time-out",
              text: `${msg}`,
              confirmButtonText: "okay",
              button: true,
            }).then(() => {
              props.history.push("/dashboard");
            });
          } else {
            swal({
              icon: "info",
              text: `${msg}`,
              confirmButtonText: "okay",
              button: true,
            }).then(() => {
              props.history.push("/dashboard");
            });
            setLoading(false);
          }
        });
    } catch (error) {
      setLoading(false);
    }
    // } else if (roles.length === 0) {
    //   swal({
    //     icon: "info",
    //     title: "Not yet Verified",
    //     text: "Re-login or contact your administrator",
    //     confirmButtonText: "okay",
    //     button: true,
    //   }).then(() => {
    //     goDasboard();
    //   });
    // } else {
    //   swal({
    //     icon: "error",
    //     title: "Not Authorised To View Details",
    //     text: "Re login or contact your administrator",
    //     confirmButtonText: "okay",
    //     button: true,
    //   }).then(() => {
    //     goDasboard();
    //   });
    // }
  };

  useEffect(() => {
    var today = new Date().toISOString().slice(0, 10);
    // console.log(today);
    fetchAllLists(today);
    // debugger;
  }, []);

  const dataTable = () => {
    return (
      <DataTable
        columns={data.columns}
        data={data.rows}
        customStyles={customStyles}
        persistTableHead
        subHeaderComponent
      />
    );
  };

  // fetchAllLists();
  // useEffect(() => {
  //   fetchAllLists();
  // }, []);

  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <div className="row">
          <div className="col-md-4">
            <div class="wrap">
              <div class="search">
                <input
                  type="date"
                  class="searchTerm"
                  placeholder="Search"
                  id="search"
                  name="search"
                  aria-label="Search Input"
                  onChange={(e) => fetchAllLists(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div
            className="col-md-8"
            style={{ display: "flex", justifyContent: "end" }}
          >
            {/* <button
              type="button"
              onClick={redirect}
              className="Submit-form-view-hospital-refresh"
            >
              Refresh
            </button> */}
          </div>
        </div>
      </div>
      <div>
        <div>{data ? dataTable() : "No data to show."}</div>
      </div>
      <div>
        <hr className="horizontal-line" />
      </div>
    </>
  );
};

export default ViewEvent;
