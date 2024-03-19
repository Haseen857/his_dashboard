import React, { useEffect, useState } from "react";
import { Route, useParams, useHistory } from "react-router-dom";
import config from "src/config";
import swal from "sweetalert";

function AppliedCandidateDetail(props) {
  const history = useHistory();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const type = "hospital";

  const redirect = () => {
    if (fromCandidateList == true) {
      history.push("/CandidateList");
    } else {
      history.push("/alljob");
    }
  };

  const fromCandidateList = JSON.parse(
    localStorage.getItem(config.AllCandidate)
  );
  const vacancy = JSON.parse(localStorage.getItem(config.SelectedVacancy));
  const Filtercandidate = () => {
    let url = "";
    const payload = {
      vacancy: vacancy,
      candidateId: [id],
      searchedCandidate: true,
    };
    url = `vacancy/filtered-candidates`;
    props
      .onAddFilterCandidate(payload, url)
      .then((response) => {
        swal({
          icon: "Success",
          title: "Success",
          text: "Candidate Filtered Successfully",
          confirmButtonText: "okay",
          button: true,
        });
        history.push("/alljob");
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
        } else if (last3 === "422") {
          swal({
            icon: "error",
            title: "Already Filtered",
            text: "Candidate Already Filtered for the vacancy",
            confirmButtonText: "okay",
            button: true,
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
  };

  useEffect(() => {
    let url = `candidates/${id}`;
    // if(type == "hospital"){
    // url=`hospital-doctors/${id}`
    //   }
    props
      .onGetAppliedCandidateDetail(url)
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
        <h5 className="lineformtitle">CANDIDATE DETAILS</h5>
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
            <pre> </pre>
            {fromCandidateList == false && (
              <button className="doctort-back" onClick={Filtercandidate}>
                Filter Candidate
              </button>
            )}
          </div>
        </div>
        {/* <div className="order-detail">
          
          <button className="doctort-back" onClick={redirect} >Back</button>
        </div> */}
        <table id="customers">
          <tbody>
            <tr>
              <td>Name</td>
              <td className="lightgray">
                {value.users && value.users.firstName}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td className="lightgray">{value.users && value.users.email}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td className="lightgray">{value.address}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td className="lightgray">{value.countryOfWork}</td>
            </tr>
            <tr>
              <td>City</td>
              <td className="lightgray">{value.city}</td>
            </tr>
            <tr>
              <td>Education</td>
              <td className="lightgray">
                {value.educationDetail && value.educationDetail.name}
              </td>
            </tr>
            <tr>
              <td>ExpectedSalary</td>
              <td className="lightgray">{value.expectedSalary}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td className="lightgray">{value.gender}</td>
            </tr>
            <tr>
              <td>MobileNo</td>
              <td className="lightgray">{value.mobile}</td>
            </tr>
            <tr>
              <td>StatusOfAvailability</td>
              <td className="lightgray">{value.statusOfAvailability}</td>
            </tr>

            <tr>
              <td>Skills</td>
              <td className="lightgray">{value.skills}</td>
            </tr>
            {/* <tr>
              <td>UserType</td>
              <td className="lightgray">
                {value.userType && value.userType.type}
              </td>
            </tr> */}
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

export default AppliedCandidateDetail;
