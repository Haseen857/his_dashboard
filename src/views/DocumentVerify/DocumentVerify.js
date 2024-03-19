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
import Tooltip from "src/components/Tooltip";

const DoctorVerify = (props) => {
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
        selector: (row) => row.mobileNo,
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

  const fetchAllLists = () => {
    if (roles.includes("Hospital Admin")) {
      try {
        setLoading(true);
        props
          .onGetDoctorsForVerification()
          .then((response) => {
            setLoading(false);
            var items = response.payload;
            // debugger;
            var rows = [];
            var count = 0;
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
                row["mobileNo"] = items[i].mobile;
                row["city"] = items[i].city;
                row["country"] = items[i].country;

                if (true) {
                  row["actions"] = (
                    <div style={{ display: "flex" }}>
                      <Tooltip title="View Details">
                        <NavLink
                          to={"doctorverify/documentdetail/" + items[i].id}
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
            }
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

  const dataTable = () => {
    return (
      <DataTable
        columns={data.columns}
        // customStyles={{ cells: { style: { width: 250 } } }}
        data={data.rows}
        // pagination
        // selectableRows

        customStyles={customStyles}
        persistTableHead
        subHeaderComponent
      />
    );
  };

  // fetchAllLists();
  useEffect(() => {
    fetchAllLists();
  }, []);

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">Doctor verification </h5>
      </div>
      <div>
        <div>{data ? dataTable() : "No data to show."}</div>
      </div>
    </>
  );
};

export default DoctorVerify;
