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

const HospitalVerify = (props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10000);
  const [value, setValue] = useState({});

  // const [tasks, setTasks] = useState([]);

  const [pages, setPages] = useState(0);
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
        name: "Name",
        selector: (row) => row.name,
        // width: "80px",
      },
      // {
      //   name: "Speciality",
      //   selector: (row) => row.speciality,
      // },
      // {
      //   name: "Position",
      //   selector: (row) => row.position,
      // },
      {
        name: "Mobile No.",
        selector: (row) => row.mobileNo,
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
    debugger;
    if (roles.includes("Super Admin")) {
      try {
        setLoading(true);
        props
          .onGetHospitalForVerification(page, limit)
          .then((response) => {
            setLoading(false);

            var items = response.payload.items;

            var rows = [];
            var sNo = (page - 1) * limit;
            var count = 0;
            for (var i = 0; i < items.length; i++) {
              var row = {};
              // let fullname = user.firstName+""+user.lastName
              if (
                (items[i].checked === false && items[i].isVerified === false) ||
                items[i].documentUpdated === true
              ) {
                //   (items[i].checked === false && items[i].isVerified === false) ||
                //   items[i].documentUpdated === true
                // ) {
                count = count + 1;
                sNo += 1;
                row["serial"] = sNo;
                row["name"] = items[i].hospitalName;
                row["mobileNo"] = items[i].mobileNo;
                row["address"] = items[i].address;
                row["city"] = items[i].city;
                row["country"] = items[i].country;
                if (true) {
                  row["actions"] = (
                    <div style={{ display: "flex" }}>
                      <Tooltip title="View Details" className= "ghg">
                      <NavLink
                        to={
                          "hospitalverify/HospitalDocumentDetails/" +
                          items[i].id
                        }
                        data-toggle="tooltip"
                        className={
                          "btn btn-xs btn-info tbl-btn-common tbl-btn-info "
                          // : "changeColor"
                        }
                     
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
        if (e.target.value !== "") {
          props
            .onSearchHospitalForVerification(e.target.value)
            .then((response) => {
              setLoading(false);
              // debugger;
              var items = response.payload;

              var rows = [];
              var sNo = (page - 1) * limit;
              for (var i = 0; i < items.length; i++) {
                var row = {};
                if (
                  (items[i].checked === false &&
                    items[i].isVerified === false) ||
                  items[i].documentUpdated === true
                ) {
                  sNo += 1;
                  row["serial"] = sNo;
                  row["name"] = items[i].hospitalName;
                  row["mobileNo"] = items[i].mobileNo;
                  row["address"] = items[i].address;
                  row["city"] = items[i].city;
                  row["country"] = items[i].country;
                  row["actions"] = (
                    <div style={{ display: "flex" }}>
                      <NavLink
                        to={
                          "hospitalverify/HospitalDocumentDetails/" +
                          items[i].id
                        }
                        data-toggle="tooltip"
                        className={
                          "btn btn-xs btn-info tbl-btn-common tbl-btn-info "
                        
                        }
                        
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
        // selectableRows
        // onChangePage={(page) => {
        //   setPage(page);
        // }}
        // paginationServer
        // paginationTotalRows={total}
        // onSelectedRowsChange={handleChange}
        // onChangeRowsPerPage={handleperrowchange}
        customStyles={customStyles}
        persistTableHead
        subHeaderComponent
        subHeader
      />
    );
  };

  useEffect(() => {
    fetchAllLists(page, limit);
  }, [page, limit]);

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">Hospital verification </h5>
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
              <MDBIcon icon="sync-alt" />
              &nbsp;
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div style={{marginBottom:'40px'}}>
        <div>{data && pages > 0 ? dataTable() : "No data to show."}</div>
      </div>
    </>
  );
};

export default HospitalVerify;
