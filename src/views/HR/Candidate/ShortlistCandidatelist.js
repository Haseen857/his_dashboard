import React, { useEffect, useMemo } from "react";
import { CommonDMWTable } from "src/components";
import { MDBIcon } from "mdbreact";

import { useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
// import { MDBDataTable, MDBPagination } from "mdbreact";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { custom } from "joi";
import swal from "sweetalert";

import { storeObjectData } from "src/service/storage";
import jwt from "jwt-decode";
import config from "../../../config";
import Tooltip from "src/components/Tooltip";

var count = 0;
var pageed = 0;

const ShortlistCandidate = (props) => {
  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  // const type = tokenDetails.type;
  const roles = tokenDetails.roles;
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(
    queryPage && parseInt(queryPage[1]) !== 0 ? queryPage[1] : 1
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  // const [tasks, setTasks] = useState([]);
  const [data, setData] = useState(null);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState({});
  const [metatore, setmetaStore] = useState({});

  const goDasboard = () => {
    props.history.push("/dashboard");
  };
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
        whiteSpace: "normal",
      },
    },
    cells: {
      style: {
        paddingLeft: "6px",
        paddingRight: "6px",
        // inlineSize: "200px",
        // overflowWap: "breakword",
        whiteSpace: "normal",
      },
    },
  };

  useEffect(() => {
    var elements = document.getElementsByClassName("tbl-btn-danger");

    var deleteDoctor = function () {
      var id = this.getAttribute("data-id");

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
            .ondeletehospital(id)
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
    };

    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", deleteDoctor, false);
    }
  });

  let customData = {
    columns: [
      {
        name: "S.No.",
        selector: (row) => row.serial,
        sortable: true,
      },
      {
        name: "FirstName",
        selector: (row) => row.FirstName,
        sortable: true,
      },
      {
        name: "Date",
        selector: (row) => row.Date,
        sortable: true,
      },
      {
        name: "StartTime",
        selector: (row) => row.StartTime,
        sortable: true,
      },
      {
        name: "Mode",
        selector: (row) => row.Mode,
      },
      {
        name: "PaymentStatus",
        selector: (row) => row.PaymentStatus,
        sortable: true,
      },
      {
        name: "InterviewDone",
        selector: (row) => row.InterviewDone,
      },
      {
        name: "Actions",
        selector: (row) => row.actions,
      },
    ],
    rows: [],
  };

  const fetchAllLists = (searchQuery) => {
    if (roles.includes("HR")) {
      try {
        setLoading(true);
        var url = `vacancy/${id}/candidates/shortlisted-candidates`;
        storeObjectData(config.SelectedVacancy, id);
        props
          .ongetshortlistcandidate(url)
          .then((response) => {
            setLoading(false);
            // debugger;

            var items = response.payload;

            var rows = [];
            var sNo = (page - 1) * limit;
            for (var i = 0; i < items.length; i++) {
              if (
                !searchQuery ||
                (searchQuery &&
                  items[i].candidate_CV.user.firstName
                    .toLowerCase()
                    .indexOf(searchQuery) > -1)
              ) {
                var row = {};

                sNo += 1;
                row["serial"] = sNo;
                row["FirstName"] = items[i].candidate_CV.user.firstName;
                row["Date"] = items[i].date;
                row["InterviewDone"] =
                  items[i].interviewDone == true ? "Yes" : "No";
                row["Mode"] = items[i].mode;
                row["PaymentStatus"] = items[i].paymentStatus;
                row["StartTime"] = items[i].startTime;
                // row["country"] = items[i].candidate_CV.countryOfWork;
                row["actions"] = (
                  <div className="action-btn">
                    <Tooltip title="Candidate Details">
                      <Link
                        to={"/shortlistcandidatedetail/" + items[i].id}
                        data-toggle="tooltip"
                        className="btn btn-xs btn-info tbl-btn-common tbl-btn-info"
                        title-tip="Order Details"
                      >
                        <MDBIcon icon="info-circle" />
                      </Link>
                    </Tooltip>
                  </div>
                );
                rows.push(row);
              }
            }
            customData.rows = rows;
            setData(customData);
          })
          .catch((e) => {
            const last3 = e.payload.message.slice(-3);
            if (last3 === "403") {
              swal({
                icon: "warning",
                title: "Not Authorised",
                text: "contact Administration if this is a mistake!",
                confirmButtonText: "okay",
                button: true,
              }).then(() => {
                props.history.push("../");
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
          });
      } catch (error) {
        setLoading(false);
      }
    } else if (roles.length === 0) {
      swal({
        icon: "info",
        title: "Not yet Verified",
        text: "Re-login or contact your administrator",
        confirmButtonText: "okay",
        button: true,
      }).then(() => {
        goDasboard();
      });
    } else {
      swal({
        icon: "error",
        title: "Not Authorised To View Details",
        text: "Re login or contact your administrator",
        confirmButtonText: "okay",
        button: true,
      }).then(() => {
        goDasboard();
      });
    }
  };

  const searched = (e) => {
    if (e.target.value != "" && e.target.value.length > 2) {
      fetchAllLists(e.target.value.toLowerCase());
    } else {
      fetchAllLists();
    }
  };

  const handleperrowchange = (newlimit) => {
    setLimit(newlimit);
  };

  const dataTable = () => {
    return (
      <DataTable
        columns={data.columns}
        data={data.rows}
        customStyles={customStyles}
        subHeader
        onChangeRowsPerPage={handleperrowchange}
        persistTableHead
        subHeaderComponent
      />
    );
  };

  const redirect = () => {
    // props.history.push("")
    window.location.reload();
  };
  useEffect(() => {
    count = 0;
  }, []);
  useEffect(() => {
    fetchAllLists();
  }, []);

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">Shortlisted Candidates</h5>
      </div>
      <div style={{ marginTop: "30px" }}>
        <div className="row">
          <div className="col-md-4">
            <div class="wrap">
              <div class="search">
                <input
                  type="text"
                  class="searchTerm"
                  placeholder="Search"
                  id="search"
                  name="search"
                  aria-label="Search Input"
                  onChange={searched}
                />
              </div>
            </div>
          </div>
          <div
            className="col-md-8"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <button
              type="button"
              onClick={redirect}
              className="Submit-form-view-hospital-refresh"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div>
        <div>{data ? dataTable() : "No data to show."}</div>
      </div>
    </>
  );
};

export default ShortlistCandidate;
