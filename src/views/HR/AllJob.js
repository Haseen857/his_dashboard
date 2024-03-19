import React, { useEffect, useMemo } from "react";
import { CommonDMWTable } from "src/components";
import { MDBIcon } from "mdbreact";

import { useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
// import { MDBDataTable, MDBPagination } from "mdbreact";
import { Link, useHistory, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { custom } from "joi";
import swal from "sweetalert";
import jwt from "jwt-decode";
import config from "../../config";
import Tooltip from "src/components/Tooltip";

var count = 0;
var pageed = 0;

const HrVacancy = (props) => {
  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const userId = token.userId;
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
        whiteSpace: "normal",
      },
    },
  };

  useEffect(() => {
    var elements = document.getElementsByClassName("tbl-btn-danger");

    var deletevacancy = function () {
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
            .ondeletevacancy(id)
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
                  props.history.push("/alljob");
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
      elements[i].addEventListener("click", deletevacancy, false);
    }
  });

  let customData = {
    columns: [
      
      {
        name: "S.No.",
        selector: (row) => row.serial,
        sortable: true,
        width:"200px",
      },
      {
        name: "Company Name",
        selector: (row) => row.companyName,
        sortable: true,
        width:"220px",
      },
      {
        name: "Employment Type",
        selector: (row) => row.employmentType,
        width:"220px",
      },
      {
        name: "Experience",
        selector: (row) => row.experience,
        width:"200px",
      },
      {
        name: "Job Description",
        selector: (row) => row.jobDescription,
        sortable: true,
        width:"220px",
      },
      // {
      //   name: "Headquarter",
      //   selector: (row) => row.headquarter,
      //   sortable: true,
      // },
      {
        name: "Actions",
        selector: (row) => row.actions,
        width:"220px",
      },
    ],
    rows: [],
  };

  const fetchAllLists = (searchQuery) => {
    if (roles.includes("HR")) {
      try {
        setLoading(true);
        props
          .onGethrvacancy(userId)
          .then((response) => {
            //setmetaStore(response.payload.meta);
            setLoading(false);
            // debugger;
            if (response.payload.length > 0){
              var items = response.payload;

              var rows = [];
              var sNo = (page - 1) * limit;
              for (var i = 0; i < items.length; i++) {
                if (
                  !searchQuery ||
                  (searchQuery &&
                    (items[i].companyName.toLowerCase().indexOf(searchQuery) >
                      -1 ||
                      items[i].employmentType
                        .toLowerCase()
                        .indexOf(searchQuery) > -1 ||
                        items[i].employmentType
                        .toLowerCase()
                        .indexOf(searchQuery) > -1 ||
                      items[i].experience.toLowerCase().indexOf(searchQuery) >
                        -1))
                ) 
                {
                  var row = {};

                  sNo += 1;
                  row["serial"] = sNo;
                  row["companyName"] = items[i].companyName;
                  row["employmentType"] = items[i].employmentType;
                  // row["phoneNo"] = items[i].phoneNo;
                  row["experience"] = items[i].experience;
                  row["jobDescription"] = items[i].jobDescription;
                  // row["headquarter"] = items[i].headquarter;
                  row["actions"] = (
                    <div className="action-btn">
                      <Tooltip title="Vacancy Details">
                        <Link
                          to={"vacancydetail/" + items[i].id}
                          data-toggle="tooltip"
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-info"
                          title-tip="Order Details"

                          // onClick={redirect}
                        >
                          <MDBIcon icon="info-circle" />
                        </Link>
                      </Tooltip>

                      <Tooltip title="Applied List">
                        <Link
                          to={"appliedjob/" + items[i].id}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-cyan"
                          title-tip="Edit"
                          // onClick={redirect}
                        >
                          <MDBIcon icon="marker" />
                        </Link>
                      </Tooltip>

                      <Tooltip title="Filtered List">
                        <Link
                          to={"filtercandidates/" + items[i].id}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-voilet"
                          title-tip="Edit"
                          // onClick={redirect}
                        >
                          <MDBIcon icon="search" />
                        </Link>
                      </Tooltip>

                      <Tooltip title="Shortlisted List">
                        <Link
                          to={"shortlistcandidate/" + items[i].id}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-success"
                          title-tip="Edit"
                          // onClick={redirect}
                        >
                          <MDBIcon icon="list"/>
                        </Link>
                      </Tooltip>

                      {/* <Tooltip title="Delete Vacancy">
                        <button
                          // href='doctors' onclick='return deleteDoctor(e,items[i].id)'
                          // onClick= {(e)=>deleteDoctor(e,items[i].id)}
                          href="#"
                          //onClick={(e) => this.deleteDoctor(2)}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
                          title-tip="Delete"
                          data-id={items[i].id}
                        >
                          <MDBIcon icon="trash-alt" />
                        </button>
                      </Tooltip> */}
                    </div>
                  );
                  rows.push(row);
                }
              }

              customData.rows = rows;
              // customData.total = response.payload.meta.totalItems;
              //setTotal(response.payload.meta.totalItems);
              // customData.totalPages = response.payload.meta.totalPages;
              //setPages(response.payload.meta.totalPages);
              setData(customData);
            }
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
        pagination
        // selectableRows
        paginationServer
        paginationTotalRows={total}
        onChangePage={(page) => {
          // if (page == metatore.totalPages) {
          //   const x = metatore.totalPages - 1;

          //   count = x * limit - 1;
          //   debugger;
          // }

          if (page == pageed - 1) {
            count = count - 2 * limit;
          }

          pageed = page;
          setPage(page);
        }}
        customStyles={customStyles}
        onChangeRowsPerPage={handleperrowchange}
        persistTableHead
        subHeader
        subHeaderComponent
      />
    );
  };

  const redirect = () => {
    // props.history.push("")
    window.location.reload();
  };

  const redirectToAddVacancy = () => {
    // props.history.push("")
    props.history.push("../addvacancy");
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
        <h5 className="lineformtitle">All Vacancy</h5>
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
            <pre> </pre>
            <button
              type="button"
              onClick={redirectToAddVacancy}
              className="Submit-form-view-hospital-refresh"
            >
              Add Vacancy
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

export default HrVacancy;
