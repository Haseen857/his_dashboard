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

const HospitalView = (props) => {
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
        name: "Hospital Name",
        selector: (row) => row.hospitalName,
        sortable: true,
      },
      {
        name: "Mobile No",
        selector: (row) => row.mobileNo,
      },
      // {
      //   name: "Hospital ID",
      //   selector: (row) => row.phoneNo,
      // },
      {
        name: "Address",
        selector: (row) => row.address,
      },
      {
        name: "City",
        selector: (row) => row.city,
        sortable: true,
      },
      {
        name: "Country",
        selector: (row) => row.country,
        sortable: true,
      },
      {
        name: "Actions",
        selector: (row) => row.actions,
      },
    ],
    rows: [],
  };

  // const [count, setcount] = useState(1);

  const fetchAllLists = (page, limit) => {
    if (roles.includes("Super Admin")) {
      try {
        setLoading(true);
        props
          .ongethospital(page, limit)
          .then((response) => {
            setmetaStore(response.payload.meta);
            setLoading(false);
            // debugger;
            var items = response.payload.items;

            var rows = [];
            var sNo = (page - 1) * limit;
            for (var i = 0; i < items.length; i++) {
              var row = {};

              sNo += 1;
              row["serial"] = sNo;
              row["hospitalName"] = items[i].hospitalName;
              row["mobileNo"] = items[i].mobileNo;
              // row["phoneNo"] = items[i].phoneNo;
              row["address"] = items[i].address;
              row["city"] = items[i].city;
              row["country"] = items[i].country;
              row["actions"] = (
                <div className="action-btn">
                  <Tooltip title="Show Hospital Details">
                    <Link
                      to={"viewhospital/HospitalDetail/" + items[i].id}
                      data-toggle="tooltip"
                      className="btn btn-xs btn-info tbl-btn-common tbl-btn-info"
                      title-tip="Order Details"

                      // onClick={redirect}
                    >
                      <MDBIcon icon="info-circle" />
                    </Link>
                  </Tooltip>

                  <Tooltip title="Edit Hospital">
                    <Link
                      to={"viewhospital/editHospital/" + items[i].id}
                      data-toggle="tooltip"
                      title=""
                      className="btn btn-xs btn-info tbl-btn-common tbl-btn-success"
                      title-tip="Edit"
                      // onClick={redirect}
                    >
                      <MDBIcon icon="edit" />
                    </Link>
                  </Tooltip>

                  <Tooltip title="Delete Hospital">
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
                  </Tooltip>
                </div>
              );
              rows.push(row);
            }

            customData.rows = rows;
            // customData.total = response.payload.meta.totalItems;
            setTotal(response.payload.meta.totalItems);
            // customData.totalPages = response.payload.meta.totalPages;
            setPages(response.payload.meta.totalPages);
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
    if (roles.includes("Super Admin")) {
      try {
        setValue(e.target.value);
        if (e.target.value !== "") {
          props
            .onfindhospital(e.target.value)
            .then((response) => {
              setLoading(false);

              var items = response.payload;

              var rows = [];
              var sNo = (page - 1) * limit;
              for (var i = 0; i < items.length; i++) {
                var row = {};
                sNo += 1;
                row["serial"] = sNo;
                row["hospitalName"] = items[i].hospitalName;
                row["mobileNo"] = items[i].mobileNo;
                row["phoneNo"] = items[i].phoneNo;
                row["address"] = items[i].address;
                row["city"] = items[i].city;
                row["country"] = items[i].country;
                row["actions"] = (
                  <div className="action-btn">
                    <Link
                      to={"viewhospital/HospitalDetail/" + items[i].id}
                      data-toggle="tooltip"
                      title=""
                      className="btn btn-xs btn-info tbl-btn-common tbl-btn-info"
                      title-tip="detail"
                    >
                      <MDBIcon icon="info-circle" />
                    </Link>
                    <Link
                      to={"viewhospital/editHospital/" + items[i].id}
                      data-toggle="tooltip"
                      title=""
                      className="btn btn-xs btn-info tbl-btn-common tbl-btn-success"
                      title-tip="Edit"
                    >
                      <MDBIcon icon="edit" />
                    </Link>

                    <Link
                      to={"viewhospital/deleteHospital/" + items[i].id}
                      data-toggle="tooltip"
                      title=""
                      className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
                      title-tip="Delete"
                    >
                      <MDBIcon icon="trash-alt" />
                    </Link>
                  </div>
                );
                rows.push(row);
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
        } else {
          fetchAllLists(page, limit);
        }
      } catch (error) {
        setLoading(false);

        const last3 = error.payload.message.slice(-3);
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
    fetchAllLists(page, limit);
  }, [page, limit]);

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">Recent Vacancy</h5>
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
        <div>{data && pages > 0 ? dataTable() : "No data to show."}</div>
      </div>
    </>
  );
};

export default HospitalView;
