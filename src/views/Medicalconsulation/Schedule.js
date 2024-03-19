import React, { Component } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import swal from "sweetalert";

const styles = {
  wrap: {
    display: "flex",
  },
  left: {
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
  },
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      selectedDate: "",
      items: {},
      leaveData: [],

      // eventDoubleClickHandling: "Enabled",
      onTimeRangeSelected: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Create a new event:",
          "HIS Appointment"
        );
        dp.clearSelection();
        if (!modal.result) {
          return;
        }
        let text = args.start.value;
        const DateTime = text.split("T");
        const Finalstart = DateTime[1];
        const startvalue = Finalstart;

        let endtime = args.end.value;
        const EndTime = endtime.split("T");
        const FinalEnd = EndTime[1];
        const Endvalue = FinalEnd;
        let { id } = this.props.match.params;
        const payload = {
          date: DateTime[0],
          startTime: startvalue,
          endTime: Endvalue,
          meetingTitle: modal.result,
          description: modal.result,
          doctorId: id,
        };
        props
          .onAddSchedule(payload)
          .then((response) => {
            swal({
              icon: "success",
              title: "Added Successfully",
            }).then(() => {
              dp.events.add({
                start: args.start,
                end: args.end,
                // id: DayPilot.guid(),
                text: modal.result,
              });
              window.location.reload();
            });
          })
          .catch((err) => {
            const last3 = err.payload.message.slice(-3);
            if (last3 === "401") {
              swal({
                icon: "error",
                title: "Time-out",
                text: "Re login or contact your administrator",
                confirmButtonText: "okay",
                button: true,
              });
            }
            // const last3 = error.payload.message.slice(-3);
            // if (last3 === "422") {
            else {
              swal({
                icon: "error",
                title: "Error",
                text: Array.isArray(err.payload.response.data.message)
                  ? err.payload.response.data.message.join(", ")
                  : err.payload.response.data.message,
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                props.history.push("/schedule");
                window.location.reload();
              });
            }
            console.log(err);
          });
      },
      eventDeleteHandling: "Update",
      //   onBeforeEventRender: function (args) {
      //     alert("hereee before");
      //   },
      //   onAfterEventRender: function (args) {
      //     alert("hereee after");
      //   },
      onEventClick: async (args) => {
        debugger;
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Update event text:",
          args.e.text()
        );
        if (!modal.result) {
          return;
        }
        let text = args.e.start().value;
        const DateTime = text.split("T");
        const Finalstart = DateTime[1];
        const startvalue = Finalstart;

        // DateTime[1] = text.split(":", 2).join(":");
        // const Finalstart = DateTime[1];
        let endtime = args.e.end().value;
        const EndTime = endtime.split("T");
        const FinalEnd = EndTime[1];
        const Endvalue = FinalEnd;
        let { id } = this.props.match.params;
        const payload = {
          date: DateTime[0],
          startTime: startvalue,
          endTime: Endvalue,
          meetingTitle: modal.result,
          description: modal.result,
          doctorId: id,
          id: args.e.id(),
        };
        props.onEditAppointment(payload).then((response) => {
          swal({
            icon: "success",
            title: "Updated Successfully",
          }).then(() => {
            const e = args.e;
            e.data.text = modal.result;
            dp.events.update(e);
            window.location.reload();
          });
        });
      },
      onEventDeleted: async (args) => {
        const dp = this.calendar;
        // const modal = await DayPilot.Modal.prompt(
        //   (dp.onEventDeleted = function (args) {
        //     dp.message("Event deleted: " + args.e.text());
        //   })
        // );
        let id = args.e.data.id;
        const ID = {
          id: [id],
        };
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
          props.onDeleteAppointment(ID).then((response) => {
            swal({
              icon: "success",
              title: "Deleted Successfully",
            }).then(() => {
              // const e = args.e;
              // e.data.text = modal.result;
              // dp.events.Deleted(e);
              window.location.reload();
            });
          });
        });
      },
      // onEventDoubleClick: async (args) => {
      //   alert("Hii");
      //   // if (args.e.id() === "3") {
      //   //   args.preventDefault();
      //   // }
      // },
    };
  }

  // var dp = new DayPilot.Scheduler("dp");
  // dp.eventDoubleClickHandling = "Enabled";
  // dp.onEventDoubleClick = function(args) {
  //   alert("Event with id " + args.e.id() + " was double-clicked");
  // };
  // var dp = new DayPilot.Scheduler("dp");
  // dp.onEventDoubleClick = function(args) {
  //   alert("Event with id " + args.e.id() + " was double-clicked");
  // };

  GetFirstDayOfCurrentMonth() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    const offset = firstDay.getTimezoneOffset();
    firstDay = new Date(firstDay.getTime() - offset * 60 * 1000);
    return firstDay.toISOString().split("T")[0];
  }

  GetLastDayOfCurrentMonth() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const offset = firstDay.getTimezoneOffset();
    firstDay = new Date(firstDay.getTime() - offset * 60 * 1000);
    return firstDay.toISOString().split("T")[0];
  }

  componentDidMount() {
    function getWeekStartDate() {
      const today = new Date();
      const first = today.getDate() - today.getDay();

      let weekStart = new Date(today.setDate(first));
      console.log(weekStart);

      const offset = weekStart.getTimezoneOffset();
      weekStart = new Date(weekStart.getTime() - offset * 60 * 1000);
      return weekStart.toISOString().split("T")[0];
    }

    function getWeekEndDate() {
      const today = new Date();
      const first = today.getDate() - today.getDay();
      const last = first + 6;

      let weekEnd = new Date(today.setDate(last));
      console.log(weekEnd);

      const offset = weekEnd.getTimezoneOffset();
      weekEnd = new Date(weekEnd.getTime() - offset * 60 * 1000);
      return weekEnd.toISOString().split("T")[0];
    }

    // load event data
    let { id } = this.props.match.params;
    this.props
      .onGetAppointment(id, getWeekStartDate(), getWeekEndDate())
      .then((response) => {
        // storeObjectData(config.AuthStorageKey, response.payload);
        var items = response.payload;

        if (!items.length) {
          swal({
            icon: "success",
            title: "No Appointment",
            text: "No Appointment",
            confirmButtonText: "okay",
            button: true,
          });
        }

        var rows = [];
        for (var i = 0; i < items.length; i++) {
          var row = {};
          row["id"] = items[i].id;
          row["start"] = items[i].date + "T" + items[i].startTime;
          row["end"] = items[i].date + "T" + items[i].endTime;
          row["text"] = items[i].description;
          rows.push(row);
        }

        this.setState({
          startDate: getWeekStartDate(),
          events: rows,
        });
      })
      .catch((err) => {
        const last3 = err.payload.message.slice(-3);
        if (last3 === "401") {
          swal({
            icon: "error",
            title: "Time-out",
            text: "Re login or contact your administrator",
            confirmButtonText: "okay",
            button: true,
          });
        }
        // const last3 = error.payload.message.slice(-3);
        // if (last3 === "422") {
        else {
          swal({
            icon: "error",
            title: "Error",
            text: Array.isArray(err.payload.response.data.message)
              ? err.payload.response.data.message.join(", ")
              : err.payload.response.data.message,
            confirmButtonText: "okay",
            button: true,
          }).then(() => {
            this.props.history.push("/dashboard");
          });
        }
        console.log(err);
      });

    this.props
      .onGetOverview(
        id,
        this.GetFirstDayOfCurrentMonth(),
        this.GetLastDayOfCurrentMonth()
      )
      .then((response) => {
        // storeObjectData(config.AuthStorageKey, response.payload);
        var items = response.payload;
        this.setState({
          items: items,
        });
        //   if (!items.length) {
        //     swal({
        //       icon: "success",
        //       title: "No Appointment",
        //       text: "No Appointment",
        //       confirmButtonText: "okay",
        //       button: true,
        //     });
        //   }

        //   var rows = [];
        //   for (var i = 0; i < items.length; i++) {
        //     var row = {};
        //     row["id"] = items[i].id;
        //     row["start"] = items[i].date + "T" + items[i].startTime;
        //     row["end"] = items[i].date + "T" + items[i].endTime;
        //     row["text"] = items[i].description;
        //     rows.push(row);
        //   }

        //   this.setState({
        //     startDate: getWeekStartDate(),
        //     events: rows,
        //   });
        // })
        // .catch((err) => {
        //   const last3 = err.payload.message.slice(-3);
        //   if (last3 === "401") {
        //     swal({
        //       icon: "error",
        //       title: "Time-out",
        //       text: "Re login or contact your administrator",
        //       confirmButtonText: "okay",
        //       button: true,
        //     });
        //   }
        //   // const last3 = error.payload.message.slice(-3);
        //   // if (last3 === "422") {
        //   else {
        //     swal({
        //       icon: "error",
        //       title: "Error",
        //       text: Array.isArray(err.payload.response.data.message)
        //         ? err.payload.response.data.message.join(", ")
        //         : err.payload.response.data.message,
        //       confirmButtonText: "okay",
        //       button: true,
        //     }).then(() => {
        //       this.props.history.push("/dashboard");
        //     });
        //   }
        //   console.log(err);
        // });
      });
  }

  componentDidUpdate() {
    function getMonthStartDate() {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

      const offset = firstDay.getTimezoneOffset();
      firstDay = new Date(firstDay.getTime() - offset * 60 * 1000);
      return firstDay.toISOString().split("T")[0];
    }

    function getMonthEndDate() {
      var date = new Date();
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const offset = lastDay.getTimezoneOffset();
      lastDay = new Date(lastDay.getTime() - offset * 60 * 1000);
      return lastDay.toISOString().split("T")[0];
    }

    let { id } = this.props.match.params;
    this.props
      .onGetAppointment(id, getMonthStartDate(), getMonthEndDate())
      .then((response) => {
        // storeObjectData(config.AuthStorageKey, response.payload);
        var items = response.payload;

        let leaveData = items.filter(function (el) {
          return el.status == "leave";
        });
        var dates = document.getElementsByClassName(
          "navigator_default_cell_text"
        );
        var page = this;

        for (let i = 0; i < dates.length; i++) {
          var date = dates[i];

          var isLeaveDay = leaveData.filter(function (el) {
            return el.date.split("-")[2] == date.textContent;
          });

          if (isLeaveDay.length > 0) {
            date.style.backgroundColor = "green";
            date.style.color = "white";
          }
        }
      })
      .catch((err) => {
        const last3 = err.payload.message.slice(-3);
        if (last3 === "401") {
          swal({
            icon: "error",
            title: "Time-out",
            text: "Re login or contact your administrator",
            confirmButtonText: "okay",
            button: true,
          });
        }
        // const last3 = error.payload.message.slice(-3);
        // if (last3 === "422") {
        else {
          swal({
            icon: "error",
            title: "Error",
            text: Array.isArray(err.payload.response.data.message)
              ? err.payload.response.data.message.join(", ")
              : err.payload.response.data.message,
            confirmButtonText: "okay",
            button: true,
          }).then(() => {
            this.props.history.push("/dashboard");
          });
        }
        console.log(err);
      });

    var dates = document.getElementsByClassName("navigator_default_cell_text");
    var page = this;

    for (let i = 0; i < dates.length; i++) {
      var date = dates[i];

      date.addEventListener("dblclick", function (e) {
        // alert(page.state.selectedDate);
        swal({
          icon: "warning",
          title: "Are you sure?",
          text: "Do You Want to Take Leave",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          buttons: true,
        }).then((result) => {
          if (result) {
            let { id } = page.props.match.params;
            const payload = {
              date: page.state.selectedDate,
              doctorId: id,
            };
            let url = `doctors-schedule/leave`;
            page.props
              .onScheduleLeave(payload, url)
              .then((response) => {
                swal({
                  icon: "success",
                  title: "Added Successfully",
                }).then(() => {
                  window.location.reload();
                });
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      });
    }
  }

  render() {
    const { ...config } = this.state;
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={1}
            // skipMonths={3}
            //startDate={"2022-03-07"}
            //timeRangeSelectedHandling={"Disabled"}
            startDate={this.GetFirstDayOfCurrentMonth()}
            onBeforeCellRender={(args) => {
              if (args.cell.isCurrentMonth === false) {
                args.cell.cssClass = "hideNonCurrentMonthDay";
              }
            }}
            // selectionDay={"2022-03-07"}
            onTimeRangeSelected={(args) => {
              let selectedDate = args.day.value;
              this.setState({
                selectedDate: selectedDate,
              });
              let text = args.start.value;
              const DateTime = text.split("T");
              const Finalstart = DateTime[0];
              const startValue = Finalstart;

              let endtime = args.end.value;
              const EndTime = endtime.split("T");
              const FinalEnd = EndTime[0];
              const endValue = FinalEnd;

              // load event data
              let { id } = this.props.match.params;
              this.props
                .onGetAppointment(id, startValue, endValue)
                .then((response) => {
                  // storeObjectData(config.AuthStorageKey, response.payload);
                  var items = response.payload;

                  // if (!items.length) {
                  //   swal({
                  //     icon: "success",
                  //     title: "No Appointment",
                  //     text: "No Appointment",
                  //     confirmButtonText: "okay",
                  //     button: true,
                  //   });
                  // }

                  var rows = [];
                  for (var i = 0; i < items.length; i++) {
                    var row = {};
                    row["id"] = items[i].id;
                    row["start"] = items[i].date + "T" + items[i].startTime;
                    row["end"] = items[i].date + "T" + items[i].endTime;
                    row["text"] = items[i].description;
                    rows.push(row);
                  }

                  this.setState({
                    startDate: startValue,
                    events: rows,
                  });
                })
                .catch((err) => {
                  const last3 = err.payload.message.slice(-3);
                  if (last3 === "401") {
                    swal({
                      icon: "error",
                      title: "Time-out",
                      text: "Re login or contact your administrator",
                      confirmButtonText: "okay",
                      button: true,
                    });
                  }
                  // const last3 = error.payload.message.slice(-3);
                  // if (last3 === "422") {
                  else {
                    swal({
                      icon: "error",
                      title: "Error",
                      text: Array.isArray(err.payload.response.data.message)
                        ? err.payload.response.data.message.join(", ")
                        : err.payload.response.data.message,
                      confirmButtonText: "okay",
                      button: true,
                    }).then(() => {
                      this.props.history.push("/dashboard");
                    });
                  }
                  console.log(err);
                });

              // this.props
              //   .onGetOverview(id, startValue, endValue)
              //   .then((response) => {
              //     // storeObjectData(config.AuthStorageKey, response.payload);
              //     var items = response.payload;
              //     this.setState({
              //       items: items,
              //     });
              //   });
            }}

            // eventDoubleClickHandling="Enabled"
            // onEventDoubleClick={(args) => {
            //   alert("Hii");
            //   // if (args.e.id() === "3") {
            //   //   args.preventDefault();
            //   // }
            // }}
            // onEventrightClick={(args) => {
            //   alert("Hii");
            //   // if (args.e.id() === "3") {
            //   //   args.preventDefault();
            //   // }
            // }}
          />
          <p style={{ color: "red" }}>Double click to apply leave</p>
        </div>
        <div style={styles.main}>
          <DayPilotCalendar
            {...config}
            ref={(component) => {
              this.calendar = component && component.control;
            }}
          />
          <br />

          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-5">
                  <h5 className="toalappionment">Total Appointments:</h5>
                </div>
                <div
                  className="col-md-2"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                >
                  {this.state.items.totalPatient}
                </div>
                <div className="col-md-5">
                  <button className="btn-schedule rounded-0 " type="button">
                    Cancle All App--
                  </button>
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                <div className="col-md-5">
                  <h5 className="toalappionment">New Patients:</h5>
                </div>
                <div
                  className="col-md-2"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                >
                  {this.state.items.totalNewPatient}
                </div>
                <div className="col-md-5">
                  <button className="btn-schedule  rounded-0 " type="button">
                    Mark as Holiday
                  </button>
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                <div className="col-md-5">
                  <h5 className="toalappionment">Old Patients:</h5>
                </div>
                <div
                  className="col-md-2"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                >
                  {this.state.items.totalOldPatient}
                </div>
                <div className="col-md-5">
                  <button className="btn-schedule  rounded-0 " type="button">
                    Add Notes
                  </button>
                </div>
              </div>

              <br />
              <br />
              <div className="row">
                <div className="col-md-5">
                  <h5 className="toalappionment">Total Leaves:</h5>
                </div>
                <div
                  className="col-md-2"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                >
                  {this.state.items.totalLeaves}
                </div>
                <div className="col-md-5">
                  <button className="btn-schedule   rounded-0 " type="button">
                    Cancle All App--
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <h5 className="toalappionment">Maximum No. of Appointments</h5>
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="col-md-2">
              <button className="btn-schedules   rounded-0 " type="button">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
