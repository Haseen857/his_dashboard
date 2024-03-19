import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommonDMWTable } from "src/components";
import DataTable from "react-data-table-component";
import { MDBDataTable, MDBPagination } from "mdbreact";
import { Link, useHistory, useLocation } from "react-router-dom";
import { MDBIcon } from "mdbreact";
// import { toast } from "react-toastify";
import { custom } from "joi";
import jwt from "jwt-decode";
import config from "../../config";
import swal from "sweetalert";
import Tooltip from "src/components/Tooltip";

const ViewDoctorsList = (props) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(
    queryPage && parseInt(queryPage[1]) !== 0 ? queryPage[1] : 1
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [verified, setverified] = useState();
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState(null);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState({});

  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;
  var roles = tokenDetails.roles;

  const pageChange = (newPage) => {
    // currentPage !== newPage && history.push(`/customers/tasks?page=${newPage}`);
    currentPage !== newPage &&
      history.push({
        pathname: "/customers/tasks",
        search: `?page=${newPage}`,
        state: history.location.state,
      });
  };

  useEffect(() => {
    var elements = document.getElementsByClassName("tbl-btn-danger");

    var deactivateDoctor = function () {
      var id = this.getAttribute("data-id");

      swal({
        icon: "warning",
        title: "Are you sure?",
        text: "Do you Want to Deactivate ",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Delete",
        cancelButtonText: "No",
        buttons: true,
      }).then((result) => {
        if (result) {
          let url = `hospital-doctors/${id}/active?status=false`;
          props
            .onStatusChangeDoctor(url)
            // .onDeleteDoctor(url)
            .then((response) => {
              swal({
                icon: "success",
                title: "Deactivated Successfully",
              }).then(() => {
                window.location.reload();
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    };

    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", deactivateDoctor, false);
    }

    var _elements = document.getElementsByClassName("tbl-btn-Activate");

    var activateDoctor = function () {
      var id = this.getAttribute("data-id");

      swal({
        icon: "warning",
        title: "Are you sure?",
        text: "Do you Want to Activate ",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Activate",
        cancelButtonText: "No",
        buttons: true,
      }).then((result) => {
        if (result) {
          let url = `hospital-doctors/${id}/active?status=true`;
          props
            .onStatusChangeDoctor(url)
            // .onDeleteDoctor(url)
            .then((response) => {
              swal({
                icon: "success",
                title: "Activated Successfully",
              }).then(() => {
                window.location.reload();
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    };

    for (var i = 0; i < _elements.length; i++) {
      _elements[i].addEventListener("click", activateDoctor, false);
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
        paddingLeft: "5px",
        paddingRight: "5px",
      },
    },
    cells: {
      style: {
        paddingLeft: "5px",
        paddingRight: "5px",
      },
    },
  };

  let customData = {
    columns: [
      {
        name: "S.No.",
        selector: (row) => row.serial,
      },
      {
        name: "Name",
        selector: (row) => row.name,
      },
      {
        name: "Speciality",
        selector: (row) => row.speciality,
      },
      // {
      //   name: "Position",
      //   selector: (row) => row.position,
      // },
      {
        name: "Mobile",
        selector: (row) => row.mobile,
      },

      {
        name: "City",
        selector: (row) => row.city,
      },

      {
        name: "Country",
        selector: (row) => row.country,
      },
      {
        name: "Actions",
        selector: (row) => row.actions,
      },
    ],
    rows: [],
  };

  const fetchAllDoctorsLists = (url) => {
    if (type == "hospital" || roles.includes("Super Admin")) {
      try {
        setLoading(true);
        props
          .onGetDoctor(url)
          .then((response) => {
            setLoading(false);
            console.log(response.payload);
            var items = response.payload.items;

            if (!items.length) {
              swal({
                icon: "success",
                title: "No Doctor found",
                text: "No Doctor found. please add new.",
                confirmButtonText: "okay",
                button: true,
              });
            }

            var rows = [];
            var sNo = (page - 1) * limit;
            for (var i = 0; i < items.length; i++) {
              var row = {};
              sNo += 1;
              row["serial"] = sNo;
              row["name"] = items[i].firstName + " " + items[i].lastName;
              row["speciality"] = items[i].speciality;
              row["position"] = items[i].position;
              row["country"] = items[i].country;
              row["mobile"] = items[i].mobile;
              row["city"] = items[i].city;
              row["country"] = items[i].country;

              // row["status"] = items[i].status;
              if (items[i].status == true) {
                if (type == "hospital") {
                  row["actions"] = (
                    <div className="action-btn">
                      <Tooltip title="View Doctor">
                        <Link
                          to={"doctor/detail/" + items[i].id}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-info"
                          title-tip="Details"
                        >
                          <MDBIcon icon="info-circle" />
                        </Link>
                      </Tooltip>

                      {/* <Tooltip title="Edit Doctor">
                        <Link
                          to={"doctor/edit/" + items[i].id}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-success"
                          title-tip="Edit"
                        >
                          <MDBIcon icon="edit" />
                        </Link>
                      </Tooltip> */}

                      <Tooltip title="Schedule a Doctor">
                        <Link
                          to={"/Schedule/" + items[i].id}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs  tbl-btn-common tbl-btn-info"
                          title-tip="Schedule"
                        >
                          <MDBIcon icon="calendar-alt" />
                        </Link>
                      </Tooltip>

                      <Tooltip title="Consultation Charges">
                        <Link
                          to={"/Slot/" + items[i].id}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-success"
                          title-tip="Slots"
                        >
                          <MDBIcon icon="book-medical"/>
                        </Link>
                      </Tooltip>

                      <Tooltip title="Delete Doctor">
                        <button
                          // href='doctors' onclick='return deleteDoctor(e,items[i].id)'
                          // onClick= {(e)=>deleteDoctor(e,items[i].id)}
                          href="#"
                          //onClick={(e) => this.deleteDoctor(2)}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
                          title-tip="Deactivate"
                          data-id={items[i].id}
                        >
                          <MDBIcon icon="trash-alt" />
                        </button>
                      </Tooltip>
                      {/* <a
                data-toggle="tooltip"
                title=""
                className="btn btn-xs btn-info tbl-btn-common tbl-btn-success titletip"
                title-tip="Email"
              >
                <MDBIcon icon="mail-bulk" />
              </a> */}
                    </div>
                  );
                } else if (roles.includes("Super Admin")) {
                  row["actions"] = (
                    <div className="action-btn">
                      <Tooltip title="View Doctor">
                        <Link
                          to={"doctor/detail/" + items[i].id}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-info"
                          title-tip="Details"
                        >
                          <MDBIcon icon="info-circle" />
                        </Link>
                      </Tooltip>

                      {/* <Tooltip title="Edit Doctor">
                        <Link
                          to={"doctor/edit/" + items[i].id}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-success"
                          title-tip="Edit"
                        >
                          <MDBIcon icon="edit" />
                        </Link>
                      </Tooltip> */}

                      <Tooltip title="Schedule a Doctor">
                        <Link
                          to={"/Schedule/" + items[i].id}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-voilet"
                          title-tip="Schedule"
                        >
                          <MDBIcon icon="calendar-alt" />
                        </Link>
                      </Tooltip>

                      <Tooltip title="Delete Doctor">
                        <button
                          // href='doctors' onclick='return deleteDoctor(e,items[i].id)'
                          // onClick= {(e)=>deleteDoctor(e,items[i].id)}
                          href="#"
                          //onClick={(e) => this.deleteDoctor(2)}
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
                          title-tip="Deactivate"
                          data-id={items[i].id}
                        >
                          <MDBIcon icon="trash-alt" />
                        </button>
                      </Tooltip>
                      {/* <a
                data-toggle="tooltip"
                title=""
                className="btn btn-xs btn-info tbl-btn-common tbl-btn-success titletip"
                title-tip="Email"
              >
                <MDBIcon icon="mail-bulk" />
              </a> */}
                    </div>
                  );
                }
              } else {
                row["actions"] = (
                  <div className="action-btn">
                    <button
                      // href='doctors' onclick='return deleteDoctor(e,items[i].id)'
                      // onClick= {(e)=>deleteDoctor(e,items[i].id)}
                      href="#"
                      //onClick={(e) => this.deleteDoctor(2)}
                      data-toggle="tooltip"
                      title=""
                      className="btn btn-xs btn-info tbl-btn-common tbl-btn-Activate"
                      title-tip="Activate"
                      data-id={items[i].id}
                    >
                      <MDBIcon icon="undo-alt" />
                    </button>
                  </div>
                );
              }

              rows.push(row);
            }
            debugger;

            // for (
            //   var j = items.length + 1;
            //   j < response.payload.meta.totalItems;
            //   j++
            // ) {
            //   var row = {};
            //   row["serial"] = 1;
            //   row["userid"] = "";
            //   row["fullname"] = "";
            //   row["country"] = "";
            //   row["status"] = "";
            //   row["actions"] = "";
            //   rows.push(row);
            // }

            console.log(rows);
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
            console.log(e);
          });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else if (type == "doctors") {
      swal({
        icon: "info",
        title: "Not yet Verified",
        text: "Re-login or contact your administrator",
        confirmButtonText: "okay",
        button: true,
      }).then(() => {
        props.history.push("/dashboard");
      });
    } else {
      swal({
        icon: "error",
        title: "Not Authorised To View Details",
        text: "Re login or contact your administrator",
        confirmButtonText: "okay",
        button: true,
      }).then(() => {
        props.history.push("/dashboard");
      });
    }
  };

  const searched = (e) => {
    if (type == "hospital" || roles.includes("Super Admin")) {
      let url = "";
      if (roles.includes("Super Admin")) {
        url = `doctors/findDoctor/search?search=${e.target.value}&type=name&consultationStatus=true&slotStatus=true`;
      } else {
        url = `hospital-doctors/search?search=${e.target.value}`;
      }
      try {
        setValue(e.target.value);
        if (e.target.value !== "") {
          props
            .onfindDoctor(url)
            .then((response) => {
              setLoading(false);
              console.log(response.payload);
              var items = response.payload;

              var rows = [];
              for (var i = 0; i < items.length; i++) {
                var row = {};
                row["serial"] = i + 1;
                row["name"] = items[i].firstName + " " + items[i].lastName;
                row["speciality"] = items[i].speciality;
                row["position"] = items[i].position;
                row["country"] = items[i].country;
                row["mobile"] = items[i].mobile;
                row["city"] = items[i].city;
                row["country"] = items[i].country;
                // row["status"] = items[i].status;
                if (items[i].status == true) {
                  if (type == "hospital") {
                    row["actions"] = (
                      <div className="action-btn">
                        <Tooltip title="View Doctor">
                          <Link
                            to={"doctor/detail/" + items[i].id}
                            data-toggle="tooltip"
                            title=""
                            className="btn btn-xs btn-info tbl-btn-common tbl-btn-info"
                            title-tip="Details"
                          >
                            <MDBIcon icon="info-circle" />
                          </Link>
                        </Tooltip>

                        {/* <Tooltip title="Edit Doctor">
                          <Link
                            to={"doctor/edit/" + items[i].id}
                            data-toggle="tooltip"
                            title=""
                            className="btn btn-xs btn-info tbl-btn-common tbl-btn-success"
                            title-tip="Edit"
                          >
                            <MDBIcon icon="edit" />
                          </Link>
                        </Tooltip> */}

                        <Tooltip title="Schedule a Doctor">
                          <Link
                            to={"/Schedule/" + items[i].id}
                            data-toggle="tooltip"
                            title=""
                            className="btn btn-xs btn-info tbl-btn-common tbl-btn-info"
                            title-tip="Schedule"
                          >
                            <MDBIcon icon="calendar-alt" />
                          </Link>
                        </Tooltip>

                        <Tooltip title="Consultation Charges">
                          <Link
                            to={"/Slot/" + items[i].id}
                            data-toggle="tooltip"
                            title=""
                            className="btn btn-xs btn-info tbl-btn-common tbl-btn-success"
                            title-tip="Slots"
                          >
                            <MDBIcon icon="book-medical" />
                          </Link>
                        </Tooltip>

                        <Tooltip title="Delete Doctor">
                          <button
                            // href='doctors' onclick='return deleteDoctor(e,items[i].id)'
                            // onClick= {(e)=>deleteDoctor(e,items[i].id)}
                            href="#"
                            //onClick={(e) => this.deleteDoctor(2)}
                            data-toggle="tooltip"
                            title=""
                            className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
                            title-tip="Deactivate"
                            data-id={items[i].id}
                          >
                            <MDBIcon icon="trash-alt" />
                          </button>
                        </Tooltip>
                        {/* <a
                  data-toggle="tooltip"
                  title=""
                  className="btn btn-xs btn-info tbl-btn-common tbl-btn-success titletip"
                  title-tip="Email"
                >
                  <MDBIcon icon="mail-bulk" />
                </a> */}
                      </div>
                    );
                  } else if (roles.includes("Super Admin")) {
                    row["actions"] = (
                      <div className="action-btn">
                        <Tooltip title="View Doctor">
                          <Link
                            to={"doctor/detail/" + items[i].id}
                            data-toggle="tooltip"
                            title=""
                            className="btn btn-xs btn-info tbl-btn-common tbl-btn-info"
                            title-tip="Details"
                          >
                            <MDBIcon icon="info-circle" />
                          </Link>
                        </Tooltip>

                        {/* <Tooltip title="Edit Doctor">
                          <Link
                            to={"doctor/edit/" + items[i].id}
                            data-toggle="tooltip"
                            title=""
                            className="btn btn-xs btn-info tbl-btn-common tbl-btn-success"
                            title-tip="Edit"
                          >
                            <MDBIcon icon="edit" />
                          </Link>
                        </Tooltip> */}

                        <Tooltip title="Schedule a Doctor">
                          <Link
                            to={"/Schedule/" + items[i].id}
                            data-toggle="tooltip"
                            title=""
                            className="btn btn-xs btn-info tbl-btn-common tbl-btn-info"
                            title-tip="Schedule"
                          >
                            <MDBIcon icon="calendar-alt" />
                          </Link>
                        </Tooltip>

                        <Tooltip title="Delete Doctor">
                          <button
                            // href='doctors' onclick='return deleteDoctor(e,items[i].id)'
                            // onClick= {(e)=>deleteDoctor(e,items[i].id)}
                            href="#"
                            //onClick={(e) => this.deleteDoctor(2)}
                            data-toggle="tooltip"
                            title=""
                            className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
                            title-tip="Deactivate"
                            data-id={items[i].id}
                          >
                            <MDBIcon icon="trash-alt" />
                          </button>
                        </Tooltip>
                        {/* <a
                  data-toggle="tooltip"
                  title=""
                  className="btn btn-xs btn-info tbl-btn-common tbl-btn-success titletip"
                  title-tip="Email"
                >
                  <MDBIcon icon="mail-bulk" />
                </a> */}
                      </div>
                    );
                  }
                } else {
                  row["actions"] = (
                    <div className="action-btn">
                      <button
                        // href='doctors' onclick='return deleteDoctor(e,items[i].id)'
                        // onClick= {(e)=>deleteDoctor(e,items[i].id)}
                        href="#"
                        //onClick={(e) => this.deleteDoctor(2)}
                        data-toggle="tooltip"
                        title=""
                        className="btn btn-xs btn-info tbl-btn-common tbl-btn-Activate"
                        title-tip="Activate"
                        data-id={items[i].id}
                      >
                        <MDBIcon icon="undo-alt" />
                      </button>
                    </div>
                  );
                }
                rows.push(row);
              }

              console.log(rows);
              customData.rows = rows;
              // customData.total = response.payload.meta.totalItems;
              // setTotal(response.payload.meta.totalItems);
              // // customData.totalPages = response.payload.meta.totalPages;
              // setPages(response.payload.meta.totalPages);
              setData(customData);
            })
            .catch((e) => {
              if (e.payload) {
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
                } else {
                  customData.rows = [];
                  setData(customData);
                }
                setLoading(false);
                console.log(e);
              } else {
                customData.rows = [];
                setData(customData);
              }
            });
        } else {
          GetDoctorListFilteredByPageAndLimit();
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else if (type == "doctors") {
      swal({
        icon: "info",
        title: "Not yet Verified",
        text: "Re-login or contact your administrator",
        confirmButtonText: "okay",
        button: true,
      }).then(() => {
        props.history.push("/dashboard");
      });
    } else {
      swal({
        icon: "error",
        title: "Not Authorised To View Details",
        text: "Re login or contact your administrator",
        confirmButtonText: "okay",
        button: true,
      }).then(() => {
        props.history.push("/dashboard");
      });
    }
  };

  const GetDoctorListFilteredByPageAndLimit = () => {
    let url = `doctors?page=${page}&limit=${limit}`;
    if (type == "hospital") {
      url = `hospital-doctors/hospital/${token.hospitalId}?page=${page}&limit=${limit}&verified=true&consultationChargeStatus=all`;
    } else if (roles.includes("Super Admin")) {
      url = `doctors/verified?page=${page}&limit=${limit}&verified=true&consultationStatus=true&slotStatus=true`;
    }
    fetchAllDoctorsLists(url);
  };

  const redirect = () => {
    // props.history.push("")
    window.location.reload();
  };

  // function ViewDoctor() {
  //   const handleChange = ({ selectedRows }) => {
  //     console.log('Selected Rows: ', selectedRows);
  //   };

  useEffect(() => {
    GetDoctorListFilteredByPageAndLimit();
  }, [page, limit]);

  const handleperrowchange = (newlimit) => {
    setLimit(newlimit);
  };

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">View Doctor</h5>
      </div>
      <div style={{ marginTop: "30px" }}>
        <div className="row">
          <div className="col-md-4">
            <div className="wrap">
              <div className="search">
                <input
                  type="text"
                  className="searchTerm"
                  placeholder="Search"
                  id="search"
                  name="search"
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
        {/* <div>
          {data && pages > 0 ? (
            <DataTable
              columns={data.columns}
              data={data.rows}
              pagination
              selectableRows
              onChangePage={(page) => {
                setPage(page);
              }}
              paginationServer
              paginationTotalRows={total}
              // onSelectedRowsChange={handleChange}
              customStyles={customStyles}
              persistTableHead
              subHeaderComponen
              subHeader
            />
          ) : null}
        </div> */}
      </div>
      <div>
        {data && pages > 0 ? (
          <DataTable
            columns={data.columns}
            data={data.rows}
            pagination
            // selectableRows
            onChangePage={(page) => {
              setPage(page);
            }}
            paginationServer
            paginationTotalRows={total}
            // onSelectedRowsChange={handleChange}
            onChangeRowsPerPage={handleperrowchange}
            customStyles={customStyles}
            persistTableHead
            subHeaderComponent
            subHeader
          />
        ) : null}
      </div>
    </>
  );
};

export default ViewDoctorsList;
