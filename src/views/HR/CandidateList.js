import React, { useEffect, useMemo } from "react";
import { CommonDMWTable } from "src/components";
import { MDBIcon } from "mdbreact";

import { useState, useRef } from "react";

import DataTable from "react-data-table-component";

import { NavLink, useHistory, useLocation, Link } from "react-router-dom";

import swal from "sweetalert";
import jwt from "jwt-decode";
import config from "../../config";
import Tooltip from "src/components/Tooltip";
import { storeObjectData } from "src/service/storage";

const HrList = (props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10000);
  const [value, setValue] = useState({});
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  // const type = tokenDetails.type;
  const roles = tokenDetails.roles;
  // console.log(roles);
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");

  const [loading, setLoading] = useState(false);
  // const [tasks, setTasks] = useState([]);
  const [data, setData] = useState(null);

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
        name: "First Name",
        selector: (row) => row.firstName,
        // width: "80px",
      },

      {
        name: "Email",
        selector: (row) => row.email,
      },
      {
        name: "Type",
        selector: (row) => row.type,
      },
      {
        name: "Experience Details",
        selector: (row) => row.experienceDetails,
      },

      {
        name: "Country",
        selector: (row) => row.country,
        // width: "100px",
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
        var url = "candidates";
        props
          .onGetCandidateList(url)
          .then((response) => {
            setLoading(false);
            var items = response.payload;

            var rows = [];
            var sNo = (page - 1) * limit;

            for (var i = 0; i < items.length; i++) {
              var row = {};
              if (
                !searchQuery ||
                (searchQuery &&
                  ((items[i].user.firstName &&
                    items[i].user.firstName.toLowerCase().indexOf(searchQuery) >
                      -1) ||
                    (items[i].user.email &&
                      items[i].user.email.toLowerCase().indexOf(searchQuery) >
                        -1) ||
                    (items[i].experienceDetails &&
                      items[i].experienceDetails
                        .toLowerCase()
                        .indexOf(searchQuery) > -1)))
              ) {
                {
                  sNo += 1;
                  row["serial"] = sNo;
                  row["firstName"] = items[i].user.firstName;
                  row["email"] = items[i].user.email;
                  row["type"] = items[i].user.userType.type;
                  row["experienceDetails"] = items[i].experienceDetails
                    ? items[i].experienceDetails
                    : "N/A";
                  row["country"] = items[i].countryOfWork;
                  if (true) {
                    row["actions"] = (
                      <div style={{ display: "flex" }}>
                        <Tooltip title="View Details">
                          <NavLink
                            to={"/appliedcandidatedetail/" + items[i].id}
                            data-toggle="tooltip"
                            className={
                              "btn btn-xs btn-info tbl-btn-common tbl-btn-info "
                              // : "changeColor"
                            }
                            title-tip="Details"
                          >
                            <MDBIcon icon="info-circle" />
                          </NavLink>
                        </Tooltip>
                      </div>
                    );
                  }
                  rows.push(row);
                }
              }
            }
            customData.rows = rows;
            setData(customData);
          })
          .catch((e) => {
            const last3 = e.payload.message.slice(-3);
            const msg = e.payload.response.data.message;
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
              console.log(e);
            }
          });
      } catch (error) {
        setLoading(false);
        console.log(error);
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

  const dataTable = () => {
    return (
      <DataTable
        columns={data.columns}
        data={data.rows}
        customStyles={customStyles}
        persistTableHead
        subHeader
      />
    );
  };

  useEffect(() => {
    fetchAllLists();
  }, []);

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">Candidate List </h5>
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
              onClick={() => {
                window.location.reload();
              }}
              className="Submit-form-view-hospital-refresh"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "40px" }}>
        <div>{data && pages > 0 ? dataTable() : "No data to show."}</div>
      </div>
    </>
  );
};

export default HrList;
