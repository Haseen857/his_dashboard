import React, { useEffect, useMemo } from "react";
import { CommonDMWTable } from "src/components";
import { MDBIcon } from "mdbreact";

import { useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
// import { MDBDataTable, MDBPagination } from "mdbreact";
import { NavLink, useHistory, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { custom } from "joi";
import swal from "sweetalert";
import jwt from "jwt-decode";
import config from "../../config";
import Select from "react-dropdown-select";
import Tooltip from "src/components/Tooltip";

const IndividualDoctor = (props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10000);
  const [verified, setverified] = useState();
  const [tasks, setTasks] = useState([]);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState({});
  const [searchtype, setSearchType] = useState({
    typed: "name",
  });

  // console.log(searchtype);
  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  // const type = tokenDetails.type;
  const roles = tokenDetails.roles;
  // console.log(roles);

  const [loading, setLoading] = useState(false);
  // const [tasks, setTasks] = useState([]);
  const [data, setData] = useState(null);

  // const onchange = (e) => {

  //   // debugger;
  // };

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
        name: "Name",
        selector: (row) => row.name,
        // width: "80px",
      },
      {
        name: "Speciality",
        selector: (row) => row.speciality,
      },
      {
        name: "Position",
        selector: (row) => row.position,
      },
      {
        name: "Mobile No.",
        selector: (row) => row.phoneNo,
      },

      {
        name: "Address",
        selector: (row) => row.address,
      },
      {
        name: "City",
        selector: (row) => row.city,
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
  const handleperrowchange = (newlimit) => {
    setLimit(newlimit);
  };
  const fetchAllLists = (page, limit) => {
    if (roles.includes("Super Admin")) {
      try {
        setLoading(true);
        props
          .onGetDoctorForVerification(page, limit)
          .then((response) => {
            setLoading(false);
            // debugger;
            var items = response.payload.items;
            let count = 0;
            var rows = [];
            for (var i = 0; i < items.length; i++) {
              var row = {};
              if (
                items[i].documentsAvailable === true &&
                items[i].isVerified === false
              ) {
                // let fullname = user.firstName+""+user.lastName
                count = count + 1;
                row["serial"] = count;
                row["name"] =
                  items[i].user.firstName + " " + items[i].user.lastName;
                row["speciality"] = items[i].speciality;
                row["position"] = items[i].position;
                row["phoneNo"] = items[i].mobile;
                row["address"] = items[i].address;
                row["city"] = items[i].city;
                row["country"] = items[i].country;
                if (true) {
                  row["actions"] = (
                    <div style={{ display: "flex" }}>
                      <Tooltip title="View Details">
                        <NavLink
                          to={
                            "individualdoctor/IndiDocDocumentDetails/" +
                            items[i].id
                          }
                          data-toggle="tooltip"
                          className={
                            "btn btn-xs btn-info tbl-btn-common tbl-btn-info "
                            // : "changeColor"
                          }
                          // className={
                          //   !items[i].checked
                          //     ? "btn btn-xs btn-info tbl-btn-common tbl-btn-info "
                          //     : "changeColor"
                          // }
                          title-tip="Order Details"
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
            customData.rows = rows;
            setTotal(response.payload.meta.totalItems);
            // customData.totalPages = response.payload.meta.totalPages;
            setPages(response.payload.meta.totalPages);
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
    if (roles.includes("Super Admin")) {
      try {
        setValue(e.target.value);
        debugger;
        if (e.target.value !== "") {
          props
            .onGetDoctorForSearch(e.target.value, searchtype.typed)
            .then((response) => {
              setLoading(false);
              // debugger;
              var items = response.payload;
              let count = 0;
              var rows = [];
              var sNo = (page - 1) * limit;
              for (var i = 0; i < items.length; i++) {
                var row = {};
                if (
                  items[i].documentsAvailable === true &&
                  items[i].isVerified === false
                ) {
                  count = count + 1;
                  sNo += 1;
                  row["serial"] = sNo;
                  row["name"] = items[i].firstName + " " + items[i].lastName;
                  row["speciality"] = items[i].speciality;
                  row["position"] = items[i].position;
                  row["phoneNo"] = items[i].mobile;
                  row["address"] = items[i].address;
                  row["city"] = items[i].city;
                  row["country"] = items[i].country;
                  row["actions"] = (
                    <div style={{ display: "flex" }}>
                      <NavLink
                        to={
                          "individualdoctor/IndiDocDocumentDetails/" +
                          items[i].id
                        }
                        data-toggle="tooltip"
                        className={
                          "btn btn-xs btn-info tbl-btn-common tbl-btn-info "
                          // : "changeColor"
                        }
                        // className={
                        //   !items[i].checked
                        //     ? "btn btn-xs btn-info tbl-btn-common tbl-btn-info "
                        //     : "changeColor"
                        // }
                        title-tip="Order Details"
                      >
                        <MDBIcon icon="info-circle" />
                      </NavLink>
                    </div>
                  );
                  rows.push(row);
                }
              }

              customData.rows = rows;
              setData(customData);
            })
            .catch((e) => {
              // debugger;
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
              } else if (last3 === "404") {
                customData.rows = [];
                setData(customData);
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

  const dataTable = () => {
    return (
      <DataTable
        columns={data.columns}
        data={data.rows}
        // pagination
        // // selectableRows
        // onChangePage={(page) => {
        //   setPage(page);
        // }}
        // paginationServer
        // paginationTotalRows={total}
        // // onSelectedRowsChange={handleChange}
        // onChangeRowsPerPage={handleperrowchange}
        customStyles={customStyles}
        persistTableHead
        subHeaderComponent
        subHeader
      />
    );
  };

  // fetchAllLists();
  useEffect(() => {
    fetchAllLists(page, limit);
  }, [page, limit]);

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">Doctor verification </h5>
      </div>

      <div>
        {/* <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="typed"
            id="flexRadioDefault1"
            value="name"
            checked={searchtype.typed === "name" ? true : false}
            onChange={(e) => {
              setSearchType({ [e.target.name]: e.target.value });
            }}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Name
          </label>
        </div> */}
      </div>
      <div style={{ marginTop: "30px" }}>
        <div className="row" style={{ marginBottom: "30px" }}>
          <div
            className="col-md-4 "
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <div class="search">
                <input
                  type="text"
                  class="searchTerm"
                  placeholder="Search"
                  id="search"
                  name="search"
                  aria-label="Search Input"
                  onChange={searched}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div
              class="form-check"
              style={{ marginLeft: "10px", marginBottom: 0 }}
            >
              <input
                class="form-check-input"
                type="radio"
                name="typed"
                id="flexRadioDefault2"
                value="speciality"
                checked={searchtype.typed === "speciality" ? true : false}
                onClick={(e) => {
                  searchtype.typed === "speciality"
                    ? setSearchType({ [e.target.name]: "name" })
                    : setSearchType({ [e.target.name]: e.target.value });
                }}
                onChange={(e) => {
                  setSearchType({ [e.target.name]: e.target.value });
                }}
              />
              <label
                class="form-check-label"
                for="flexRadioDefault2"
                style={{ fontSize: "16px", fomtWeight: "500" }}
              >
                Speciality
              </label>
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
             <MDBIcon icon="sync-alt" />
              &nbsp;
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

export default IndividualDoctor;
