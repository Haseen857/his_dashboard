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
import { logOut, storeObjectData } from "src/service/storage";
import config from "../../config";
import swal from "sweetalert";
import Tooltip from "src/components/Tooltip";

const ViewProductAdsList = (props) => {
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
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState({});

  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;
  var roles = tokenDetails.roles;
  var currentUserId = token.userId;

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
        name: "Details",
        selector: (row) => row.details,
      },
      {
        name: "Manufacturer",
        selector: (row) => row.manufacturer,
      },

      {
        name: "Country",
        selector: (row) => row.country,
      },

      {
        name: "Is Verified",
        selector: (row) => row.isVerified,
      },
      {
        name: "Actions",
        selector: (row) => row.actions,
      },
    ],
    rows: [],
  };

  const fetchAdvertisementList = (url, searchQuery) => {
    if (type == "hospital" || roles.includes("Super Admin")) {
      try {
        setLoading(true);
        props
          .onGetProductAds(url)
          .then((response) => {
            setLoading(false);
            var items = response.payload;
            storeObjectData(config.AdvertisementList, items);

            if (!items.length) {
              swal({
                icon: "success",
                title: "No Advertisement found",
                text: "No Advertisement found. please add new.",
                confirmButtonText: "okay",
                button: true,
              });
            }

            var rows = [];
            var sNo = (page - 1) * limit;
            for (var i = 0; i < items.length; i++) {
              var row = {};
              if (
                (type == "hospital" &&
                  items[i].userId === currentUserId &&
                  !searchQuery) ||
                (roles.includes("Super Admin") && !searchQuery) ||
                (type == "hospital" &&
                  items[i].userId === currentUserId &&
                  searchQuery &&
                  ((items[i].name &&
                    items[i].name.toLowerCase().indexOf(searchQuery) > -1) ||
                    (items[i].details &&
                      items[i].details.toLowerCase().indexOf(searchQuery) >
                        -1) ||
                    (items[i].manufacturer &&
                      items[i].manufacturer.toLowerCase().indexOf(searchQuery) >
                        -1))) ||
                (roles.includes("Super Admin") &&
                  searchQuery &&
                  ((items[i].name &&
                    items[i].name.toLowerCase().indexOf(searchQuery) > -1) ||
                    (items[i].details &&
                      items[i].details.toLowerCase().indexOf(searchQuery) >
                        -1) ||
                    (items[i].manufacturer &&
                      items[i].manufacturer.toLowerCase().indexOf(searchQuery) >
                        -1)))
              ) {
                if (
                  (props.location.pathname.indexOf("Verify") > -1 &&
                    items[i].isVerified != true) ||
                  props.location.pathname.indexOf("Verify") == -1
                ) {
                  sNo += 1;
                  row["serial"] = sNo;
                  row["name"] = items[i].name;
                  row["details"] = items[i].details;
                  row["manufacturer"] = items[i].manufacturer;
                  row["country"] = items[i].country;
                  row["isVerified"] =
                    items[i].isVerified == true ? "Yes" : "No";

                  // if (type == "hospital") {
                  row["actions"] = (
                    <div className="action-btn">
                      <Tooltip title="View Advertisement">
                        <Link
                          to={
                            props.location.pathname.indexOf(
                              "ProductAdsVerify"
                            ) > -1
                              ? "productadsVerifydetail/" + items[i].id
                              : props.location.pathname.indexOf(
                                  "MedicalAdsVerify"
                                ) > -1
                              ? "medicaladsVerifydetail/" + items[i].id
                              : props.location.pathname.indexOf(
                                  "ViewProductAdsList"
                                ) > -1
                              ? "productadsdetail/" + items[i].id
                              : "medicaladsdetail/" + items[i].id
                          }
                          data-toggle="tooltip"
                          title=""
                          className="btn btn-xs btn-info tbl-btn-common tbl-btn-info"
                          title-tip="Details"
                        >
                          <MDBIcon icon="info-circle" />
                        </Link>
                      </Tooltip>
                    </div>
                  );
                  //}

                  rows.push(row);
                }
              }
            }
            debugger;

            console.log(rows);
            customData.rows = rows;
            // customData.total = response.payload.meta.totalItems;
            //setTotal(response.payload.meta.totalItems);
            // customData.totalPages = response.payload.meta.totalPages;
            //setPages(response.payload.meta.totalPages);
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
    if (e.target.value != "" && e.target.value.length > 2) {
      GetAdvertisementList(e.target.value.toLowerCase());
    } else {
      GetAdvertisementList();
    }
  };

  const GetAdvertisementList = (searchQuery) => {
    let url = ``;
    if (type == "hospital" || roles.includes("Super Admin")) {
      url = `advertisement/product`;
      if (props.location.pathname.indexOf("MedicalAds") > -1) {
        url = `advertisement/event`;
      }
      fetchAdvertisementList(url, searchQuery);
    }
  };
  const redirect = () => {
    // props.history.push("")
    if (props.location.pathname.indexOf("MedicalAds") > -1) {
      history.push("/addMedicalAds");
    } else {
      history.push("/addProductAds");
    }
  };

  // function ViewDoctor() {
  //   const handleChange = ({ selectedRows }) => {
  //     console.log('Selected Rows: ', selectedRows);
  //   };

  useEffect(() => {
    GetAdvertisementList();
  }, []);

  const handleperrowchange = (newlimit) => {
    setLimit(newlimit);
  };

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">View Advertisement</h5>
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
            {type == "hospital" ? (
              <button
                type="button"
                onClick={redirect}
                className="Submit-form-view-hospital-refresh"
              >
                Add
              </button>
            ) : null}
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
export default ViewProductAdsList;
