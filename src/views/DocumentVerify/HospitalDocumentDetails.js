import React, { useEffect, useState } from "react";
import { Route, useParams, useHistory } from "react-router-dom";
import swal from "sweetalert";
import example from "../../assets/images/hos.jpg";
import { Link } from "react-router-dom";
import { MDBIcon } from "mdbreact";
import DataTable from "react-data-table-component";

const DocumentDetails = (props) => {
  const history = useHistory();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  // const { id } = useParams();
  const ided = props.location;
  const idd = ided.pathname.substring(ided.pathname.lastIndexOf("/") + 1);
  const routeback = () => {
    history.push("/hospitalverify");
  };
  let customData = {
    columns: [
      {
        name: "S.No.",
        selector: (row) => row.serial,
        // width: "80px",
      },
      {
        name: "item Name",
        selector: (row) => row.name,
        // width: "80px",
      },
      {
        name: "Download Documents",
        selector: (row) => row.doc,
      },
    ],
    rows: [],
  };

  useEffect(() => {
    handleGet();
  }, []);

  const handleGet = () => {
    try {
      props
        .onGetHospitalDetails(idd)
        .then((response) => {
          debugger;
          // console.log(response);
          var items = response.payload;
          // setDoc(response.payload);
          setValue(response.payload[0].hospital);

          var rows = [];
          for (var i = 0; i < items.length; i++) {
            var row = {};
            row["serial"] = i + 1;
            row["name"] = items[i].name;
            row["doc"] = (
              <div className="iconname">
                <a href={items[i].documentUrl} target="_blank" download>
                  <MDBIcon icon="file-download" />
                </a>
              </div>
            );
            rows.push(row);
          }

          console.log(rows);
          customData.rows = rows;

          setData(customData);
        })
        .catch((error) => {
          const last3 = error.payload.response.status;
          const message = error.payload.message;

          if (last3 === "403") {
            swal({
              icon: "error",
              title: "Not Authorised",
              text: `${message}`,
              button: false,
              timer: 3000,
            }).then(() => {
              props.history.push("/hospitalverify");
              window.location.reload();
            });
          } else if (last3 === "401") {
            swal({
              icon: "error",
              title: "Time-out",
              text: `${message}`,
              button: false,
              timer: 2000,
            }).then(() => {
              props.history.push("/hospitalverify");
              // window.location.reload();
            });
          } else {
            swal({
              icon: "error",
              title: "Error",
              text: `${message}`,
              button: false,
              timer: 3000,
            }).then(() => {
              props.history.push("/hospitalverify");
              // window.location.reload();
            });
          }
          setLoading(false);
          setError({
            ...error,
            // ["AddDoctorError"]: error.payload.message,
          });
        });
    } catch {}
  };

  const dataTable = () => {
    return (
      <DataTable
        columns={data.columns}
        // customStyles={{ cells: { style: { width: 250 } } }}
        data={data.rows}
        persistTableHead
        subHeaderComponent
      />
    );
  };

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleAcceptancetrue = (e) => {
    e.preventDefault();

    const payload = {
      reason: value.reason === "Not accepted " ? "Accepted" : value.reason,
      accept: true,
    };

    props
      .submitAcceptance(payload, idd)
      .then((response) => {
        // storeObjectData(config.AuthStorageKey, response.payload);
        // props.history.push("");
        // ;
        swal({
          icon: "success",
          title: "Hospital Verified",
          text: `${response.payload}`,
          confirmButtonText: "okay",
          button: true,
        }).then(() => {
          props.history.push("/hospitalverify");
        });
      })
      .catch((error) => {
        setLoading(false);
        const last3 = error.payload.response.status;
        const msg = error.payload.message;

        // console.log(last3);

        if (last3 === "422") {
          swal({
            icon: "info",
            title: "Already Registered",
            // text: "verification mail sent on registered Email",
            button: false,
            timer: 2000,
          });
        } else if (last3 === "401") {
          swal({
            icon: "error",
            title: "Time out",
            text: `${msg}`,
            button: false,
            timer: 2000,
          });
        } else if (last3 === "400") {
          swal({
            icon: "error",
            title: "bad request",
            text: `${msg}`,
            button: false,
            timer: 2000,
          });
        } else
          setError({
            ...error,
            // ["addHospitalerrr"]: "you have already Submited the form",
          });
      });
  };

  const handleAcceptancefalse = (e) => {
    e.preventDefault();

    if (value.reason == null) {
      swal({
        icon: "error",
        title: "Please Add Reason for Rejection",
      }).then(() => {});
      return;
    }

    const payload = {
      reason: value.reason,
      accept: false,
    };
    // ;

    props
      .submitAcceptance(payload, idd)
      .then((response) => {
        // storeObjectData(config.AuthStorageKey, response.payload);
        // props.history.push("");
        // ;
        swal({
          icon: "success",
          title: "Hospital Rejected",
          text: `${response.payload}`,
          confirmButtonText: "okay",
          button: true,
        }).then((result) => {
          props.history.push("/hospitalverify");
        });
      })
      .catch((error) => {
        setLoading(false);
        const last3 = error.payload.response.status;
        const msg = error.payload.message;

        if (last3 === "422") {
          swal({
            icon: "info",
            title: "Already Registered",
            // text: "verification mail sent on registered Email",
            button: false,
            timer: 2000,
          });
        } else if (last3 === "401") {
          swal({
            icon: "error",
            title: "Time out",
            text: `${msg}`,
            button: false,
            timer: 2000,
          });
        } else if (last3 === "400") {
          swal({
            icon: "error",
            title: "bad request",
            text: `${msg}`,
            button: false,
            timer: 2000,
          });
        } else
          setError({
            ...error,
            ["AddHospitalerror"]: error.payload.message,
            // ["addHospitalerrr"]: "you have already Submited the form",
          });
      });
  };

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">DOCUMENT DETAILS</h5>
      </div>
      <div
        className="tablewidth"
        style={{ marginTop: "-53px", marginBottom: "30px" }}
      >
        <div className="row">
          <div className="col-md-6"></div>
          <div
            className="col-md-6"
            style={{ display: "flex", justifyContent: "end" }}
          >
            
            <button className="doctort-back" onClick={routeback}>
            <MDBIcon fas icon="chevron-left" />
            &nbsp;
              Back
            </button>
          </div>
        </div>
        <table id="customers">
          <tbody>
            <tr>
              <td>Profile Photo</td>
              <td className="lightgray">
                <img
                  width="200"
                  src={!value.profileUrl ? example : value.profileUrl}
                ></img>
              </td>
            </tr>
            <tr>
              <td className="col-md-2">ID</td>
              <td className="lightgray col-md-4">{value.id}</td>
            </tr>
            <tr>
              <td>User ID</td>
              <td className="lightgray">{value.userId}</td>
            </tr>
            <tr>
              <td>Hospital Name</td>
              <td className="lightgray">{value.hospitalName}</td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td className="lightgray">{value.mobileNo}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td className="lightgray">{value.address}</td>
            </tr>
            <tr>
              <td>City</td>
              <td className="lightgray">{value.city}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td className="lightgray">{value.country}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td className="lightgray">{value.created_at}</td>
            </tr>
            {value.checked ? (
              <>
                <tr>
                  <td>Previously Checked</td>
                  <td className="lightgray">{value.checked ? "Yes" : "NO"}</td>
                </tr>
                <tr>
                  <td>Reason</td>
                  <td className="lightgray">
                    {value.reason ? value.reason : "~Not Mentioned~"}
                  </td>
                </tr>
              </>
            ) : (
              <></>
            )}
            <tr>
              {/* <td>
              {" "}
              <a
                href={"../../doctor/edit/" +id}>
              <button className="btn  rounded-0 Submit-formerd" type="button">
                Update Form
              </button>
              </a>
            </td> */}
              {/* <td className="lightgray"></td> */}
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <div>
        <div>{data ? dataTable() : "No Documents to show"}</div>
      </div>
      <div className="row main-div" style={{ marginBottom: "40px" }}>
        <form className="row g-3 d-flex justify-content-start ml-20">
          <div className="col-md-6">
            <label
              for="inputEmail4"
              className="form-label add-view-product-label"
            >
              Reason
            </label>
            <textarea
              className="form-controls"
              placeholder="Enter Reason"
              onChange={onChange}
              name="reason"
            />
          </div>

          <div className="col-md-6">
            <div style={{ paddingTop: "52px" }}>
              <button
                className="btn9  rounded-0 accept-btn"
                type="submit"
                onClick={handleAcceptancetrue}
              >
                Accept
              </button>

              <button
                className="btn9  rounded-0 Reject-btn"
                type="submit"
                onClick={handleAcceptancefalse}
              >
                Reject
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default DocumentDetails;
