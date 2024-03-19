import React, { useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import { MDBIcon } from "mdbreact";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import example from "../../assets/images/hos.jpg";
import jwt from "jwt-decode";
import config from "../../config";

function HospitalDetail(props) {
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  // const { id } = useParams();
  const history = useHistory();
  let statused = value ? value.isVerified : "";
  let nothing = String(statused);

  const ided = props.location;
  const lastItem = ided.pathname.substring(ided.pathname.lastIndexOf("/") + 1);
  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;

  const redirect = () => {
    history.push("/viewhospital");
  };

  const JoinHospital = () => {
    let url = `doctors/${token.doctorId}`;
    props
      .ongetDoctorDetail(url)
      .then((response) => {
        // storeObjectData(config.AuthStorageKey, response.payload);
        response.payload["homeVisit"] = String(response.payload.homeVisit);
        response.payload["hospitalId"] = lastItem;

        const formData = new FormData();
        formData.append("firstName", response.payload.user.firstName);
        formData.append("lastName", response.payload.user.lastName);
        formData.append("position", response.payload.position);
        formData.append("speciality", response.payload.specialityIds);
        formData.append("experience", response.payload.experience);
        formData.append("phoneNo", response.payload.phoneNo);
        formData.append("mobile", response.payload.mobile);
        formData.append("city", response.payload.city);
        formData.append("state", response.payload.state);
        formData.append("degree", response.payload.degree);
        formData.append("address", response.payload.address);
        formData.append("about", response.payload.about);
        formData.append("country", response.payload.country);
        formData.append("homeVisit", String(response.payload.homeVisit));
        //formData.append("profile", value.profile, value.profile.name);
        formData.append("hospitalId", lastItem);

        url = `doctors/${token.doctorId}`;
        props
          .oneditDoctor(formData, url)
          .then((response) => {
            swal({
              icon: "success",
              title: "Joined Hospital Successfully",
            }).then(() => {
              if (type == "doctor") {
                props.history.push("/profile");
              } else {
                props.history.push("/viewdoctor");
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
                props.history.push("/viewdoctor");
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
            props.history.push("/hospitallist");
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
        setError({
          ...error,
          ["AddDoctorError"]: error.payload.message,
        });
      });

    //let url = "";
    // const payload = {
    //   vacancy: vacancy,
    //   candidateId: [id],
    //   searchedCandidate: true,
    // };
    url = `vacancy/shortlist-candidate`;
    // props
    //   .onAddSelectCandidate(payload, url)
    //   .then((response) => {
    //     swal({
    //       icon: "Success",
    //       title: "Success",
    //       text: "Candidate Shortlisted Successfully",
    //       confirmButtonText: "okay",
    //       button: true,
    //     });
    //     history.push("/alljob");
    //   })
    //   .catch((error) => {
    //     const last3 = error.payload.message.slice(-3);
    //     if (last3 === "403") {
    //       swal({
    //         icon: "error",
    //         title: "Not Authorised",
    //         text: "contact Administration if this is a mistake!",
    //         confirmButtonText: "okay",
    //         button: true,
    //       }).then(() => {
    //         props.history.push("/VacancyDetail");
    //         window.location.reload();
    //       });
    //     } else if (last3 === "422") {
    //       swal({
    //         icon: "error",
    //         title: "Already Shortlisted",
    //         text: "Candidate Already Shortlisted for the vacancy",
    //         confirmButtonText: "okay",
    //         button: true,
    //       });
    //     } else if (last3 === "401") {
    //       swal({
    //         icon: "error",
    //         title: "Time-out",
    //         text: "Re login or contact your administrator",
    //         confirmButtonText: "okay",
    //         button: true,
    //       });
    //     }
    //     setLoading(false);
    //     setError({
    //       ...error,
    //       ["AddDoctorError"]: error.payload.message,
    //     });
    //   });
  };

  useEffect(() => {
    if (type == "doctor") {
      const hospitals = JSON.parse(
        window.localStorage.getItem(config.HospitalList)
      );
      var selectedHospital = hospitals.filter((s) => s.id == lastItem)[0];
      setValue(selectedHospital);
    } else {
      props
        .onfindhospitalbyid(lastItem)
        .then((response) => {
          // storeObjectData(config.AuthStorageKey, response.payload);
          setValue(response.payload);
        })
        .catch((error) => {
          setLoading(false);
          const last3 = error.payload.message.slice(-3);
          if (last3 === "403") {
            swal({
              icon: "error",
              title: "Not Authorised to view",
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
              title: "Time-out",
              text: "Re login or contact your administrator",
              confirmButtonText: "okay",
              button: true,
            });
          }
          setLoading(false);
          setError({
            ...error,
            //   ["AddDoctorError"]: error.payload.message,
          });
        });
    }
  }, []);
  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">HOSPITAL DETAILS</h5>
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
            <MDBIcon fas icon="chevron-left" />
            &nbsp;
              Back
            </button>
            <pre> </pre>
            {type == "doctor" ? (
              <button className="doctort-back" onClick={JoinHospital}>
                Join Hospital
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <table id="customers">
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
            <td>ID</td>
            <td className="lightgray">{value.id}</td>
          </tr>

          <tr>
            <td>Hospital Name</td>
            <td className="lightgray">{value.hospitalName}</td>
          </tr>

          {/* <tr>
            <td>Phone</td>
            <td className="lightgray">{value.phoneNo}</td>
          </tr> */}
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
            <td>Status</td>
            <td className="lightgray">{nothing}</td>
          </tr>
          <tr>
            <td>User ID</td>
            <td className="lightgray">{value.userId}</td>
          </tr>
          <tr>
            <td>Date Added</td>
            <td className="lightgray">{value.created_at}</td>
          </tr>
          <tr>
            <td>Last Updated at</td>
            <td className="lightgray">{value.updated_at}</td>
          </tr>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          {/* <a href={"../editHospital/" + lastItem}>
            <button className="Submit-form-view-hospital" type="button">
              Update
            </button>
          </a> */}
        </div>
      </div>
    </>
  );
}

export default HospitalDetail;
