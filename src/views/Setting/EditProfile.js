import doctor from "../../assets/images/doctor.png";
import React, { useState, useRef, useEffect } from "react";


function EditProfile(props) {



  return (
    <form className="show12 container-fluid" >
      <div className="cover-image">
        <div className="profile-pic-wrapper">
          <div className="pic-holder">
            <img id="profilePic" className="pic" src={doctor} />

            <label className="upload-file-block">
              <div className="text-center">
                <div className="mb-2">
                  <i className="fa fa-camera fa-2x"></i>
                </div>
                <div className="text-uppercase">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    name="profile"
                    accept="image/jpeg, image/png, image/jpg "
                    // onChange={onChange}
                  ></input>
                  
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      {/* end */}
      <br />
      <br />
      <br />
      <div className="main-div">
        <div className="form-container">
          <div className="row  d-flex justify-content-start ml-20">
              <div className="col-md-6">
                <label className="form-label  add-view-product-label">  
                  First Name <span className="Mandatory">*</span>
                </label>
                <input
                  type="text"
                  className="form-controls"  
                  name="firstName"
                  placeholder="Enter First Name"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label  add-view-product-label">
                Enter Last Name <span className="Mandatory">*</span>
                </label>
                <input
                  type="text"
                  className="form-controls"
                  name="firstName"
                  placeholder="Enter First Name"
                />
              </div> 

              <div className="col-md-6">
                <label className="form-label  add-view-product-label">
                  Position<span className="Mandatory">*</span>
                </label>
                <input
                  type="text"
                  className="form-controls"
                  name="firstName"
                  placeholder="Enter Last Name"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label  add-view-product-label">
                  Speciality<span className="Mandatory">*</span>
                </label>
                <input
                  type="text"
                  className="form-controls"
                  name="firstName"
                  placeholder="Position"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label  add-view-product-label">
                  Qualification<span className="Mandatory">*</span>
                </label>
                <input
                  type="text"
                  className="form-controls"
                  name="firstName"
                  placeholder=" Qualification"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label  add-view-product-label">
                 Phone Number 
                </label>
                <input
                  type="text"
                  className="form-controls"
                  name="firstName"
                  placeholder="Phone Number"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label  add-view-product-label">
                 Mobile Number <span className="Mandatory">*</span>
                </label>
                <input
                  type="text"
                  className="form-controls"
                  name="firstName"
                  placeholder="Mobile Number"
                />
              </div> 

              <div className="col-md-6">
                <label className="form-label  add-view-product-label">
               Experience <span className="Mandatory">*</span>
                </label>
                <input
                  type="text"
                  className="form-controls"
                  name="firstName"
                  placeholder="Experience"
                />
              </div>
         
              <div className="col-md-6">
                <label className="form-label  add-view-product-label">
             Country <span className="Mandatory">*</span>
                </label>
                <select    className="form-controls">
                <option value="volvo">India</option>
                 <option value="saab">USA</option>
                <option value="opel">abc</option>
                    <option value="audi">Audi</option>
                 </select>
              </div>

              <div className="col-md-6">
                <label className="form-label  add-view-product-label">
             City <span className="Mandatory">*</span>
                </label>
                <select    className="form-controls">
    <option value="volvo">Roorkee</option>
    <option value="saab">Najibabd</option>
    <option value="opel">Bijnor</option>
    <option value="audi">Audi</option>
  </select>
              </div>




              <div className="col-md-6">
                <label className="form-label  add-view-product-label">
              Address <span className="Mandatory">*</span>
                </label>
                <input 
                
                  type="text"
                  className="form-controls"
                  name="firstName"
                  placeholder="Address"
                />
              </div> 

              <div className="col-md-6">
              <label className="form-label  add-view-product-label">
                About 
              </label>
              <textarea
                type="text"
                className="form-controls"
                name="address"  
                id="inputEmail4"
                placeholder="About"
              />
             
            </div>
          
           
          </div>
          <hr className="horizontal-line" />

          
          <div style={{ textAlign: "end", marginBottom: "50px" }}>
            <button
              className="rounded-0 Submit-form-view-hospital"
              type="Submit" 
              onClick={() => {
                  props.history.push('./profile')
              }}
            >
             Back 
            </button> 
           &nbsp; &nbsp; &nbsp; &nbsp;  
            <button
              className="rounded-0 Submit-form-view-hospital"
              type="Submit"
            >
              Submit
            </button>

            
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
