import React, { useEffect, useState } from "react";
import { Route, useParams, useHistory } from "react-router-dom";
import swal from "sweetalert";
import example from "../../assets/images/doctor.png";
import { Link } from "react-router-dom";
import { MDBIcon } from "mdbreact";
import DataTable from "react-data-table-component";
import config from "../../config";
import jwt from "jwt-decode";

const AdvertisementDetail = (props) => {
  const history = useHistory();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState(null);
  const { id } = useParams();
  const [values, setValues] = useState({});
  // const [data, setData] = useState<certificates[]>([]);

  const ided = props.location;
  const idd = ided.pathname.substring(ided.pathname.lastIndexOf("/") + 1);

  // const tokenDetails = jwt(token.accessToken);

  // const { id } = useParams();

  // const type = tokenDetails.type;
  // const ids = token.id;

  const routeback = () => {
    history.push("/hrverify");
  };
  let customData = {
    columns: [
      {
        name: "S.No.",
        selector: (matchdata) => matchdata.serial,
        // width: "80px",
      },
      {
        name: "Row Name",
        selector: (matchdata) => matchdata.name,
        // width: "80px",
      },
      {
        name: "Download Documents",
        selector: (matchdata) => matchdata.doc,
      },
    ],
    rows: [],
  };

  function OpenCertificate(certificate) {
    window.open(certificate, "_blank");
  }

  useEffect(() => {
    var matchdata = JSON.parse(localStorage.getItem(config.Details));
    for (var i = 0; i < matchdata.length; i++) {
      if (matchdata[i].id == idd) {
        setValues(matchdata[i]);
        break;
      }
    }
  }, []);

  // const handleGet = () => {
  //   // try {
  //   //   //   var url = `hr-company/${id}`;
  //   //   props
  //   //     .onGetAdvertisementDetail(idd)
  //   //     .then((response) => {
  //   //       console.log(response);
  //   //       // setDoc(response.payload);
  //   //       setValue(response.payload);
  //   //       if (response.payload.documentsAvailable == true) {
  //   //         var url = `hr-company/upload/documents/${id}`;
  //   //         props
  //   //           .onGetHRDetail(url)
  //   //           .then((response) => {
  //   //             var items = response.payload;
  //   //             var rows = [];
  //   //             for (var i = 0; i < items.length; i++) {
  //   //               var row = {};
  //   //               row["serial"] = i + 1;
  //   //               row["name"] = items[i].documentUrl;
  //   //               row["doc"] = (
  //   //                 <div className="iconname">
  //   //                   <a href={items[i].documentUrl} target="_blank" download>
  //   //                     <MDBIcon icon="file-download" />
  //   //                   </a>
  //   //                 </div>
  //   //               );
  //   //               rows.push(row);
  //   //             }
  //   //             console.log(rows);
  //   //             customData.rows = rows;
  //   //             setData(customData);
  //   //           })
  //   //           .catch((error) => {
  //   //             const last3 = error.payload.message.slice(-3);
  //   //             if (last3 === "403") {
  //   //               swal({
  //   //                 icon: "error",
  //   //                 title: "Not Authorised",
  //   //                 text: "contact Administration if this is a mistake!",
  //   //                 button: false,
  //   //                 timer: 3000,
  //   //               }).then(() => {
  //   //                 props.history.push("/hrverify");
  //   //                 window.location.reload();
  //   //               });
  //   //             } else if (last3 === "401") {
  //   //               swal({
  //   //                 icon: "error",
  //   //                 title: "Time-out",
  //   //                 text: "Re login or contact your administrator",
  //   //                 button: false,
  //   //                 timer: 2000,
  //   //               }).then(() => {
  //   //                 props.history.push("/hrverify");
  //   //                 window.location.reload();
  //   //               });
  //   //             }
  //   //             setLoading(false);
  //   //             setError({
  //   //               ...error,
  //   //               ["AddDoctorError"]: error.payload.message,
  //   //             });
  //   //           });
  //   //       }
  //   //     })
  //   //     .catch((error) => {
  //   //       const last3 = error.payload.message.slice(-3);
  //   //       if (last3 === "403") {
  //   //         swal({
  //   //           icon: "error",
  //   //           title: "Not Authorised",
  //   //           text: "contact Administration if this is a mistake!",
  //   //           button: false,
  //   //           timer: 3000,
  //   //         }).then(() => {
  //   //           props.history.push("/hrverify");
  //   //           window.location.reload();
  //   //         });
  //   //       } else if (last3 === "401") {
  //   //         swal({
  //   //           icon: "error",
  //   //           title: "Time-out",
  //   //           text: "Re login or contact your administrator",
  //   //           button: false,
  //   //           timer: 2000,
  //   //         }).then(() => {
  //   //           props.history.push("/hrverify");
  //   //           window.location.reload();
  //   //         });
  //   //       }
  //   //       setLoading(false);
  //   //       setError({
  //   //         ...error,
  //   //         ["AddDoctorError"]: error.payload.message,
  //   //       });
  //   //     });
  //   // } catch {}
  // };

  // const dataTable = () => {
  //   return (
  //     <DataTable
  //       columns={data.columns}
  //       // customStyles={{ cells: { style: { width: 250 } } }}
  //       data={data.matchdata}
  //       persistTableHead
  //       subHeaderComponent
  //     />
  //   );
  // };

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleAcceptancetrue = (e) => {
    e.preventDefault();

    const payload = {
      reason: value.reason === "Not accepted " ? "Accepted" : value.reason,
      accept: true,
    };
    var url = `advertisement/${id}/verify`;
    props
      .onsubmitAcceptance(payload, id, url)
      .then((response) => {
        swal({
          icon: "success",
          title: "Advertisement Verified",
          text: `${response.payload}`,
          confirmButtonText: "okay",
          button: true,
        }).then(() => {
          props.history.push("/advertisementverify");
        });
      })
      .catch((error) => {
        setLoading(false);
        const last3 = error.payload.message.slice(-3);
        const msg = error.payload.response.data.message;
        console.log(error);

        if (last3 === "422") {
          swal({
            icon: "info",
            title: "Already Registered",

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
          }).then(() => {
            props.history.push("/hrverify");
            window.location.reload();
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
          });
      });
  };
  const handleAcceptancefalse = (e) => {
    e.preventDefault();

    const payload = {
      reason: value.reason,
      accept: false,
    };
    var url = `advertisement/${id}/verify`;
    props
      .onsubmitAcceptance(payload, id, url)
      .then((response) => {
        swal({
          icon: "success",
          title: "Advertisement Rejected",
          text: `${response.payload}`,
          confirmButtonText: "okay",
          button: true,
        }).then((result) => {
          props.history.push("/advertisementverify");
        });
      })
      .catch((error) => {
        setLoading(false);
        const last3 = error.payload.message.slice(-3);
        const msg = error.payload.response.data.message;
        console.log(error);
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
          }).then(() => {
            props.history.push("/hrverify");
            window.location.reload();
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
              <td>country</td>
              <td className="lightgray">{values.country}</td>
            </tr>
            <tr>
              <td>Details</td>
              <td className="lightgray">{values.details}</td>
            </tr>
            <tr>
              <td>Manufacturer</td>
              <td className="lightgray">{values.manufacturer}</td>
            </tr>
            {/* <tr>
              <td>Degree</td>
              <td className="lightgray">{value.degree}</td>
            </tr>
            <tr>
              <td>Speciality</td>
              <td className="lightgray">{value.speciality}</td>
            </tr> */}
            <tr>
              <td>Reason</td>
              <td className="lightgray">
                {values.reason ? values.reason : "Null"}
              </td>
            </tr>
            <tr>
              <td>PaymentStatus</td>
              <td className="lightgray">{values.paymentStatus}</td>
            </tr>
            <tr>
              <td>referenceNumber</td>
              <td className="lightgray">{values.referenceNumber}</td>
            </tr>
            {/* <tr>
              <td>City</td>
              <td className="lightgray">{value.city}</td>
            </tr> */}
            <tr>
              <td>Country</td>
              <td className="lightgray">{values.country}</td>
            </tr>
            {value.checked ? (
              <>
                <tr>
                  <td>Previously Checked</td>
                  <td className="lightgray">{values.checked ? "Yes" : "NO"}</td>
                </tr>
                <tr>
                  <td>Reason</td>
                  <td className="lightgray">
                    {values.reason ? values.reason : "~Not Mentioned~"}
                  </td>
                </tr>
              </>
            ) : (
              <></>
            )}

            <tr>
              <td>Certificate</td>
              <td className="lightgray">
                <a
                  onClick={(e) => {
                    OpenCertificate(values.certificate);
                  }}
                >
                  Click to open
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <br />
      {/* <div>
        <div>{data ? dataTable() : "No HR to show"}</div>
      </div> */}

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

export default AdvertisementDetail;
