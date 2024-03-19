import React, { useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import example from "../../assets/images/hos.jpg";
import jwt from "jwt-decode";
import config from "../../config";
import DataTable from "react-data-table-component";

function ProductAdsDetail(props) {
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  // const { id } = useParams();
  const history = useHistory();
  let statused = value ? value.isVerified : "";
  let nothing = String(statused);

  const ided = props.location;
  const idd = ided.pathname.substring(ided.pathname.lastIndexOf("/") + 1);
  const lastItem = ided.pathname.substring(ided.pathname.lastIndexOf("/") + 1);
  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;

  const redirect = () => {
    if (props.location.pathname.indexOf("medicaladsdetail") > -1) {
      history.push("/ViewMedicalAdsList");
    } else if (props.location.pathname.indexOf("productadsdetail") > -1) {
      history.push("/ViewProductAdsList");
    } else if (props.location.pathname.indexOf("productadsVerifydetail") > -1) {
      history.push("/ViewProductAdsVerifyList");
    } else if (props.location.pathname.indexOf("medicaladsVerifydetail") > -1) {
      history.push("/ViewMedicalAdsVerifyList");
    }
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

  const acceptAdvertisement = () => {
    verifyAdvertisement(true);
  };

  const rejectAdvertisement = () => {
    verifyAdvertisement(false);
  };

  const verifyAdvertisement = (accept) => {
    let url = `advertisement/${lastItem}/verify`;

    if (
      accept == false &&
      (value.reason == null || value.reason == "" || value.reason == undefined)
    ) {
      swal({
        icon: "error",
        title: "Please Add Reason for Rejection",
      }).then(() => {});
      return;
    }
    const status = accept == false ? "Rejected" : "Verified";
    const payload = {
      reason: value.reason,
      accept: accept,
    };
    props
      .onVerifyAdvertisement(payload, url)
      .then((response) => {
        swal({
          icon: "success",
          title: "Advertisement " + status + " Successfully",
        }).then(() => {
          if (props.location.pathname.indexOf("productadsVerifydetail") > -1) {
            history.push("/ViewProductAdsVerifyList");
          } else if (
            props.location.pathname.indexOf("medicaladsVerifydetail") > -1
          ) {
            history.push("/ViewMedicalAdsVerifyList");
          }
        });
        //window.location.reload();
      })
      .catch((error) => {
        const last3 = error.payload.message.slice(-3);
        if (last3 === "403") {
          swal({
            icon: "error",
            title: "Not Authorised",
            text: "contact Administration if this is a mistake!",
            confirmButtonText: "okay",
            button: true,
          }).then(() => {
            props.history.push("/ViewProductAdsVerifyList");
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
          swal({
            icon: "error",
            title: "Error Occured",
            text: Array.isArray(error.payload.response.data.message)
              ? error.payload.response.data.message.join(", ")
              : error.payload.response.data.message,
            confirmButtonText: "okay",
            button: true,
          }).then(() => {
            // props.history.push("/adddoctor");
            // window.location.reload();
          });
        }
        setLoading(false);
        setError({
          ...error,
          ["EditDoctorError"]: error.payload.message,
        });
      });
  };

  useEffect(() => {
    const advertisementList = JSON.parse(
      window.localStorage.getItem(config.AdvertisementList)
    );
    var selectedAdvertisement = advertisementList.filter(
      (s) => s.id == lastItem
    )[0];
    selectedAdvertisement.reason = null;
    setValue(selectedAdvertisement);
  }, []);

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">AD DETAILS</h5>
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
            <button className="doctort-back" onClick={redirect}>
              Back
            </button>
            <pre> </pre>
          </div>
        </div>
        <table id="customers">
          <tr>
            <td>Profile Photo</td>
            <td className="lightgray">
              <img
                width="200"
                src={!value.brochure ? example : value.brochure}
              ></img>
            </td>
          </tr>
          {/* <tr>
            <td>ID</td>
            <td className="lightgray">{value.id}</td>
          </tr> */}

          <tr>
            <td>Name</td>
            <td className="lightgray">{value.name}</td>
          </tr>
          <tr>
            <td>Manufacturer</td>
            <td className="lightgray">{value.manufacturer}</td>
          </tr>
          <tr>
            <td>Reference Number</td>
            <td className="lightgray">{value.referenceNumber}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td className="lightgray">{value.country}</td>
          </tr>
          <tr>
            <td>User Name</td>
            <td className="lightgray">{value.user && value.user.firstName}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td className="lightgray">{value.user && value.user.email}</td>
          </tr>
        </table>
      </div>
      {props.location.pathname.indexOf("Verify") > -1 ? (
        <div className="row main-div" style={{ marginBottom: "40px" }}>
          <div className="row g-3 d-flex justify-content-start ml-20">
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
                  onClick={acceptAdvertisement}
                >
                  Accept
                </button>

                <button
                  className="btn9  rounded-0 Reject-btn"
                  type="submit"
                  onClick={rejectAdvertisement}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProductAdsDetail;
