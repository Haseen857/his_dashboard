import React, { useEffect, useState } from "react";
import { Route, useParams, useHistory } from "react-router-dom";
import swal from "sweetalert";

function VacancyDetail(props) {
  const history = useHistory();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const type = "hospital";

  const redirect = () => {
    history.push("/alljob");
  };

  useEffect(() => {
    let url = `vacancy/${id}`;
    // if(type == "hospital"){
    // url=`hospital-doctors/${id}`
    //   }
    props
      .ongethrvacancyDetail(url)
      .then((response) => {
        // storeObjectData(config.AuthStorageKey, response.payload);
        // response.payload["firstName"] = response.payload.user.firstName;
        // response.payload["lastName"] = response.payload.user.lastName;
        setValue(response.payload);
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
            props.history.push("/VacancyDetail");
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
  }, []);
  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">VACANCY DETAILS</h5>
      </div>
      <div
        className="tablewidth"
        style={{ marginTop: "-53px", marginBottom: "30px" }}
      >
        <div className="row">
          <div className="col-md-6"> </div>
          <div
            className="col-md-6"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <button className="doctort-back" onClick={redirect}>
              Back
            </button>
          </div>
        </div>
        {/* <div className="order-detail">
          
          <button className="doctort-back" onClick={redirect} >Back</button>
        </div> */}
        <table id="customers">
          <tbody>
            {/* <tr>
              <td>Profile Photo</td>
              <td className="lightgray">
                <img width="200" src={value.profileUrl}></img>
              </td>
            </tr> */}
            {/* <tr>
            <td className="col-md-2">ID</td>
            <td className="lightgray col-md-4">{value.id}</td>
          </tr>
          <tr>
            <td>User ID</td>
            <td className="lightgray">{value.userId}</td>
          </tr> */}

            {/* <tr>
              <td>Name</td>
              <td className="lightgray">
                {value.firstName + " " + value.lastName}
              </td>
            </tr> */}
            <tr>
              <td>Company Name</td>
              <td className="lightgray">{value.companyName}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td className="lightgray">{value.country}</td>
            </tr>
            <tr>
              <td>City</td>
              <td className="lightgray">{value.city}</td>
            </tr>
            <tr>
              <td>Employment Type</td>
              <td className="lightgray">{value.employmentType}</td>
            </tr>
            <tr>
              <td>Headquarter</td>
              <td className="lightgray">{value.headquarter}</td>
            </tr>
            <tr>
              <td>Currency</td>
              <td className="lightgray">{value.currency}</td>
            </tr>
            <tr>
              <td>Experience</td>
              <td className="lightgray">{value.experience}</td>
            </tr>
            <tr>
              <td>Min. Age</td>
              <td className="lightgray">{value.minAge}</td>
            </tr>
            <tr>
              <td>Max. Age</td>
              <td className="lightgray">{value.maxAge}</td>
            </tr>
            <tr>
              <td>Nationality</td>
              <td className="lightgray">{value.nationality}</td>
            </tr>
            <tr>
              <td>Skills</td>
              <td className="lightgray">{value.skills}</td>
            </tr>
            <tr>
              <td>Job Description</td>
              <td className="lightgray">{value.jobDescription}</td>
            </tr>
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
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          {/* <a
            href={"../../doctor/edit/" + id}>
            <button className="Submit-form-view-hospital" type="button">
              Update
            </button>
          </a> */}
        </div>
      </div>
    </>
  );
}

export default VacancyDetail;
