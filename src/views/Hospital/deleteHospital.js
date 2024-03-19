import React, { useEffect, useState, useRef } from "react";
import { Route, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

//validation

function Hospitaldelete(props) {
  var [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [Hospital, setHospital] = useState([]);
  const hospitalsRef = useRef();
  hospitalsRef.current = Hospital;
  let history = useHistory();
  // const { id } = useParams();
  // useEffect((id) => {
  //   // props
  //   //   .onfindhospitalbyid(id)
  //   //   .then((response) => {
  //   //     setValue(response.payload[0]);
  //   //   })
  //   //   .catch((error) => {
  //   //     setLoading(false);
  //   //     setError({
  //   //       ...error,
  //   //       ["AddHospitalError"]: error.payload.message,
  //   //     });
  //   //   });

  //   openHospital(id);
  // }, []);

  const redirect = () => {
    history.push("/viewhospital");
    window.location.reload();
  };
  const ided = props.location;
  const lastItem = ided.pathname.substring(ided.pathname.lastIndexOf("/") + 1);
  console.log(lastItem);

  // props
  //   .onfindhospitalbyid(lastItem)
  //   .then((response) => {
  //     // storeObjectData(config.AuthStorageKey, response.payload);
  //     console.log(response.payload);
  //     setValue(response.payload.hospitalName);
  //   })
  //   .catch((error) => {
  //     setLoading(false);
  //     setError({
  //       ...error,
  //       ["AddDoctorError"]: error.payload.message,
  //     });
  //   });

  // function click(params) {
  //   document.querySelector("#hospitalName").value = params.hospitalName;
  //   document.querySelector("#city").value = params.city;
  //   document.querySelector("#address").value = params.address;
  //   document.querySelector("#country").value = params.country;
  //   document.querySelector("#mobileNo").value = params.mobileNo;
  //   document.querySelector("#phoneNo").value = params.phoneNo;

  //   setValue({
  //     hospitalName: params.hospitalName,
  //     country: params.city,
  //     city: params.address,
  //     address: params.country,
  //     mobileNo: params.mobileNo,
  //     phoneNo: params.phoneNo,
  //   });

  // const openHospital = (id) => {
  //   props
  //     .onfindhospitalbyid(id)
  //     .then((response) => {
  //       // setHospital(response.payload.items);
  //       console.log(response);
  //       click(response.payload[0]);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       setError({
  //         ...error,
  //         ["AddHospitalError"]: error.payload.message,
  //       });
  //     });
  // };

  // document.querySelector("#hospitalName").value = id.hospitalName;
  // document.querySelector("#city").value = id.city;
  // document.querySelector("#address").value = id.address;
  // document.querySelector("#country").value = id.country;
  // document.querySelector("#mobileNo").value = id.mobileNo;
  // document.querySelector("#phoneNo").value = id.phoneNo;

  // setValue({
  //   hospitalName: id.hospitalName,
  //   country: id.city,
  //   city: id.address,
  //   address: id.country,
  //   mobileNo: id.mobileNo,
  //   phoneNo: id.phoneNo,
  // });
  // console.log(value);
  // const hospname = ` you will delete data for ${value}`;
  // console.log(hospname);
  swal({
    icon: "warning",
    title: "Are you sure?",
    text: "You can Not Undo change once Deleted",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Delete",
    cancelButtonText: "No",
    buttons: true,
  }).then((result) => {
    if (result) {
      handleDeleteHospital();
    } else {
      redirect();
    }
  });

  const handleDeleteHospital = (e) => {
    // e.preventDefault();
    // value.status = value.status ? "true" : "false";
    // const data = {
    //   hospitalName: value.hospitalName,
    //   country: value.country,
    //   city: value.city,
    //   address: value.address,
    //   mobileNo: value.mobileNo,
    //   phoneNo: value.phoneNo,
    // };
    // const error = validate(data, AddHospitalschema);
    // if (error) return;
    // setLoading(true);
    // if (checkBtn.current.context._errors.length === 0) {
    // const payload = {
    //   hospitalId: value.hospitalId,
    //   firstName: value.firstName,
    //   lastName: value.lastName,
    //   position: value.position,
    //   department: value.department,
    //   email: value.email,
    //   phoneNo: value.phoneNo,
    //   mobile: value.mobile,
    //   city: value.city,
    //   degree: value.degree,
    //   address: value.address,
    //   country: value.country,
    //   status: value.status == "true" ? true : false,
    // };
    // } else {
    //   setLoading(false);
    // }
  };
}

export default Hospitaldelete;
