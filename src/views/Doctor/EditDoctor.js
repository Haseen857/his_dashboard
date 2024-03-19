// import React, { useEffect, useState } from "react";
// import { Route, useParams } from "react-router-dom";
// import Joi from "joi-browser";
// import { validate, validateProperty } from "src/common/utils";
// import AddEditDoctorschema from "src/schemas/AddEditDoctorschema";
// import doctor from  "../../assets/images/doctor.png"


// function DoctorEdit(props) {
//     const [value, setValue] = useState({});
//     const [error, setError] = useState({});
//     const [loading, setLoading] = useState(false);
//     const { id } = useParams();
//     const type = "hospital";
//     if(!value.imagePreview)
//   value.imagePreview = doctor;

//   const onChange = (e) => {
//     if(e.target.type == "file"){
//       let file = e.target.files[0];
//       //setValue({ ...value, [e.target.name]: file });
//       let reader = new FileReader();
//       reader.onloadend = () => {
//       setValue({ ...value, imagePreview: reader.result,
//         file: file
//       });
//     };
//     reader.readAsDataURL(file);
//   }
//     else{
//     setValue({ ...value, [e.target.name]: e.target.value });
//   }

//     const errorMessage = validateProperty(e.target, AddEditDoctorschema);
//     if (errorMessage) {
//       setError({ ...error, [e.target.name]: errorMessage });
//     } else {
//       setError({ ...error, [e.target.name]: "" });
//     }
//   };

//   const handleEditDoctor = (e) => {
//     e.preventDefault();

//     value.status = value.status ? "true" : "false";
//     const data = {};    
//     if(type == "hospital"){
//       data["hospitalId"] = value.hospitalId;
//       data["firstName"] = value.firstName;
//       data["lastName"] = value.lastName;
//       data["password"] = value.password;
//     }
//       data["profile"] = value.profile;
//       data["position"]= value.position;
//       data["department"]= value.department;
//       data["email"]=value.email;
//       data["phoneNo"]= value.phoneNo;
//       data["mobile"]= value.mobile;
//       data["city"]= value.city;
//       data["degree"]= value.degree;
//       data["address"]= value.address;
//       data["country"]= value.country
//       // status: value.status,
//     const error = validate(data, AddEditDoctorschema);
//     if (error) return;

//     setLoading(true);

//     // if (checkBtn.current.context._errors.length === 0) {
//     // const payload = {
//     //   hospitalId: value.hospitalId,
//     //   firstName: value.firstName,
//     //   lastName: value.lastName,
//     //   position: value.position,
//     //   department: value.department,
//     //   email: value.email,
//     //   phoneNo: value.phoneNo,
//     //   mobile: value.mobile,
//     //   city: value.city,
//     //   degree: value.degree,
//     //   address: value.address,
//     //   country: value.country,
//     //   status: value.status == "true" ? true : false,
//     // };
//     let url = `doctors/${id}`;
//     const formData = new FormData();
//     if(type == "hospital"){
//         formData.append("hospitalId", value.hospitalId);
//         formData.append("firstName", value.firstName);
//         formData.append("lastName", value.lastName);
//         formData.append("password", value.password);
//         url=`hospital-doctors/${id}`
//       }
//     formData.append("position", value.position);
//     formData.append("department", value.department);
//     formData.append("email", value.email);
//     formData.append("phoneNo", value.phoneNo);
//     formData.append("mobile", value.mobile);
//     formData.append("city", value.city);
//     formData.append("degree", value.degree);
//     formData.append("address", value.address);
//     formData.append("country", value.country);
//     formData.append("profile", value.profile, value.profile.name);
//     formData.append("status", value.status == "true" ? true : false);

//     props
//       .oneditDoctor(formData, url)
//       .then((response) => {
//         alert("Updated Successfully");
//         // storeObjectData(config.AuthStorageKey, response.payload);
//         // props.history.push("../dashboard");
//         window.location.reload();
//       })
//       .catch((error) => {
//         setLoading(false);
//         setError({
//           ...error,
//           ["EditDoctorError"]: error.payload.message,
//         });
//       });
//     // } else {
//     //   setLoading(false);
//     // }
//   };

//   useEffect(() => {
//     let url = `doctors/${id}`; 
//     if(type == "hospital"){
//     url=`hospital-doctors/${id}`
//       }
//     props
//       .ongetDoctorDetail(url)
//       .then((response) => {
//         // storeObjectData(config.AuthStorageKey, response.payload);

//         setValue(response.payload);
//       })
//       .catch((error) => {
//         setLoading(false);
//         setError({
//           ...error,
//           ["AddDoctorError"]: error.payload.message,
//         });
//       });
//   }, []);
//     return (
//         <form className='show12 container-fluid' onSubmit={handleEditDoctor}>
//             <br />
//             <div className="profile-pic-wrapper">
//           <div className="pic-holder">

//             <img id="profilePic" className="pic" src={value.imagePreview} />

//               <label className="upload-file-block">
//                 <div className="text-center">
//                   <div className="mb-2">
//                     <i className="fa fa-camera fa-2x"></i>
//                   </div>
//                   <div className="text-uppercase">
//                     <input type="file"
//                     name="profile"
//                     accept="image/*"
//                     onChange={onChange}>
//                     </input>
//                   </div>
//                 </div>
//               </label>
           
//           </div>

//     </div>
//             <br />
//             <br />
//             <div className="container-fluid">
//                 <div className="main-div">
//                     <div className="form-container">
//                         <form className="row g-3 d-flex justify-content-start ml-20" >
//                             <div className="col-md-6">
//                                 <label className="form-label add-view-product-label">  Hospital Name <span className="Mandatory">*</span></label>
//                                 <select
//                                     className="form-multi-select"
//                                     id="single-select"
//                                     placeholder="Enter Hospital Name"
//                                     name="hospitalname"
//                                     data-coreui-multiple="false"
//                                     value={value.hospitalId}
//                                     onChange={onChange}
//                                     className="form-controls">
//                                     <option>Choose One</option>
//                                     <option>1</option>
//                                     <option>2</option>
//                                 </select> 
//                                 {error.hospitalId && (
//                     <p style={{ color: 'red' }}>{error.hospitalId}</p>
//                 )}
//                             </div>
//                             <div className="col-md-6">
//                                 <label className="form-label  add-view-product-label">Degree <span className="Mandatory">*</span></label>
//                                 <input type="text" className="form-controls" name="degree"
//                       value={value.degree} onChange={onChange} placeholder="Enter Degree" /> 
//                                 {error.degree && (
//                     <p style={{ color: 'red' }}>{error.degree}</p>
//                 )}
//                             </div>

//                             <div className="col-md-6">
//                                 <label className="form-label  add-view-product-label">First Name <span className="Mandatory">*</span></label>
//                                 <input type="text" className="form-controls" name="firstName"
//                       value={value.firstName} onChange={onChange} placeholder="Enter First Name" /> 
//                                 {error.firstName && (
//                     <p style={{ color: 'red' }}>{error.firstName}</p>
//                 )}
//                             </div>

//                             <div className="col-md-6">
//                                 <label className="form-label  add-view-product-label">Last Name  <span className="Mandatory">*</span></label>
//                                 <input type="text" className="form-controls" name="degree"
//                       value={value.lastName} onChange={onChange} placeholder="Enter Last Name " /> 
//                                 {error.lastName && (
//                     <p style={{ color: 'red' }}>{error.lastName}</p>
//                 )}
//                             </div>

//                             <div className="col-md-6">
//                                 <label className="form-label  add-view-product-label"> Position / Occupation <span className="Mandatory">*</span></label>
//                                 <input type="text" name="position" value={value.position} onChange={onChange} className="form-controls" placeholder="Enter  Position / Occupation" /> 
//                                 {error.position && (
//                     <p style={{ color: 'red' }}>{error.position}</p>
//                 )}
//                             </div>


//                             <div className="col-md-6">
//                                 <label className="form-label  add-view-product-label">Department <span className="Mandatory">*</span></label>
//                                 <input type="text" name="department"
//                       value={value.department} onChange={onChange} className="form-controls" placeholder="Enter  Department" />
//                                 {error.department && (
//                     <p style={{ color: 'red' }}>{error.department}</p>
//                 )}
//                             </div>


//                             <div className="col-md-6">
//                                 <label className="form-label  add-view-product-label">Email <span className="Mandatory">*</span></label>
//                                 <input type="text" className="form-controls" name="email" value={value.email} onChange={onChange} placeholder="Enter Email" /> 
//                                 {error.email && (
//                     <p style={{ color: 'red' }}>{error.email}</p>
//                 )}
//                             </div>

//                             <div className="col-md-6">
//                                 <label className="form-label  add-view-product-label">Password <span className="Mandatory">*</span></label>
//                                 <input type="password" className="form-controls" name="password" value={value.password} onChange={onChange} placeholder="Enter Password" /> 
//                                 {error.password && (
//                     <p style={{ color: 'red' }}>{error.password}</p>
//                 )}
//                             </div>


//                             <div className="col-md-6">
//                                 <label className="form-label  add-view-product-label">Phone <span className="Mandatory">*</span></label>
//                                 <input type="text" className="form-controls" name="phoneNo"
//                       value={value.phoneNo}
//                       onChange={onChange} placeholder="Enter Phone" /> 
//                                 {error.phoneNo && (
//                     <p style={{ color: 'red' }}>{error.phoneNo}</p>
//                     )}
//                     </div>
//                             <div className="col-md-6">
//                                 <label className="form-label  add-view-product-label">Mobile <span className="Mandatory">*</span></label>
//                                 <input type="text" className="form-controls" name="mobile"
//                       value={value.mobile} onChange={onChange} placeholder="Enter Mobile" /> 
//                                 {error.mobile && (
//                     <p style={{ color: 'red' }}>{error.mobile}</p>
//                     )}
//                             </div>

//                             <div className="col-md-6">
//                                 <label className="form-label  add-view-product-label">Address <span className="Mandatory">*</span></label>
//                                 <textarea type="text" className="form-controls" name="address"
//                       value={value.address} onChange={onChange} placeholder="Enter your Address" /> 
//                                 {error.address && (
//                     <p style={{ color: 'red' }}>{error.address}</p>
//                     )}
//                             </div> 


//                             <div className="col-md-6">
//                                 <label className="form-label add-view-product-label">  Country <span className="Mandatory">*</span></label>
//                                 <select
//                                     className="form-multi-select"
//                                     id="single-select"
//                                     name="country"
//                                     placeholder="Enter Country "
//                                     onChange={onChange}
//                                     value={value.country}
//                                     data-coreui-multiple="false"
//                                     className="form-controls">
//                                     <option>Choose one</option>
//                                     <option>Saudi Arabia</option>
//                                     <option>Egypt</option>
//                                     <option>Bahrain</option>
//                                     <option>Malaysia</option>
//                                     <option>Oman</option>
//                                     <option>Turkey</option>
//                                     <option>UAE</option>
//                                     <option>North Canada</option>
//                                     <option>Other</option>
//                                 </select>
//                                 {error.country && (
//                     <p style={{ color: 'red' }}>{error.country}</p>
//                     )}
//                             </div>

//                             <div className="col-md-6">
//                                 <label className="form-label add-view-product-label">  Select City <span className="Mandatory">*</span></label>
//                                 <select
//                                     className="form-multi-select"
//                                     name="city"
//                                     id="single-select"
//                                     onChange={onChange}
//                                     value={value.city}
//                                     placeholder="Enter Status "
//                                     data-coreui-multiple="false"
//                                     className="form-controls">
//                                     <option>Choose one</option>
//                                     <option>Egypt</option>
//                                     <option>Bahrain</option>
//                                     <option>Malaysia</option>
//                                 </select> 
//                                 {error.city && (
//                     <p style={{ color: 'red' }}>{error.city}</p>
//                     )}
//                             </div>



//                         </form>  
//                         <hr className="horizontal-line" />
//                         <div style={{ textAlign: 'end', marginBottom: '50px' }}>
//                             <button className="rounded-0 Submit-form-view-hospital" type="Submit">
//                                 Submit Form
//                             </button>  
//                             </div>
//                     </div>
//                 </div>
//             </div>
//         </form>
//     )
// }

// export default DoctorEdit

