import React from "react";



function AddMedicalConsulation() {
  return (
    <>
      <div className="container-fluid">
        <div className="main-div">
          <div className="form-header">
            <h5 className="lineformtitle">Add Patient</h5>
          </div>
          <div className="form-container">

            <form className="row  d-flex justify-content-start ml-20" >
              <div className="col-md-6">
                <label for="inputEmail4" className="form-label  add-view-product-label-hospital">  User Name<span className="Mandatory">*</span></label>
                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter User Name" />
                <p style={{ color: 'red' }}></p>
              </div>

              <div className="col-md-6">
                <label for="inputPassword4" className="form-label   add-view-product-label-hospital">   Enter Password<span className="Mandatory">*</span></label>
                <input type="password" className="form-controls" id="inputPassword4" placeholder="Enter Password" />
                <p style={{ color: 'red' }}></p>
              </div>

              <div className="col-md-6">
                <label for="inputPassword4" className="form-label   add-view-product-label-hospital">  Full Name<span className="Mandatory">*</span></label>
                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Full Name" />
                <p style={{ color: 'red' }}></p>
              </div>


              <div className="col-md-6">
                <label for="inputPassword4" className="form-label   add-view-product-label-hospital">  Position/Occupation</label>
                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter   Position / Occupation" />
                <p style={{ color: 'red' }}></p>
              </div>



              <div className="col-md-6">
                <label for="inputPassword4" className="form-label   add-view-product-label-hospital">Department</label>
                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter  Department" />
                <p style={{ color: 'red' }}></p>
              </div>


              <div className="col-md-6">
                <label for="inputPassword4" className="form-label   add-view-product-label-hospital">Company </label>
                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Company/Hospital" />
                <p style={{ color: 'red' }}></p>
              </div>


              <div className="col-md-6">
                <label for="inputPassword4" className="form-label   add-view-product-label-hospital">Email <span className="Mandatory">*</span></label>
                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Email Address" />
                <p style={{ color: 'red' }}></p>
              </div>


              <div className="col-md-6">
                <label for="inputPassword4" className="form-label   add-view-product-label-hospital">Phone </label>
                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Phone" />
                <p style={{ color: 'red' }}></p>

              </div>
              <div className="col-md-6">
                <label for="inputPassword4" className="form-label   add-view-product-label-hospital">Mobile<span className="Mandatory">*</span> </label>
                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Mobile" />
                <p style={{ color: 'red' }}></p>
              </div>

              <div className="col-md-6">
                <label for="inputPassword4" className="form-label   add-view-product-label-hospital">Address <span className="Mandatory">*</span></label>
                <textarea type="text" className="form-controls" id="inputEmail4" placeholder="Enter your Address" />
                <p style={{ color: 'red' }}></p>
              </div>




              <div className="col-md-6">
                <label for="inputEmail4" className="form-label  add-view-product-label-hospital"> Status <span className="Mandatory">*</span></label>
                <select
                  className="form-multi-select"
                  id="single-select"
                  placeholder="Enter Status "
                  data-coreui-multiple="false"
                  className="form-controls">
                  <option>Active</option>
                  <option>Pending</option>
                  <option>In Active</option>
                </select>
                <p style={{ color: 'red' }}></p>
              </div>



              <div className="col-md-6">
                <label for="inputEmail4" className="form-label  add-view-product-label-hospital"> Registration Type
                  <span className="Mandatory">*</span></label>
                <select
                  className="form-multi-select"
                  id="single-select"
                  placeholder="Enter Status "
                  data-coreui-multiple="false"
                  className="form-controls">
                  <option>Patient</option>
                  <option>Purchaser</option>
                  <option>Doctor</option>
                  <option>Hospitial</option>
                  <option>HR Consulation</option>
                  <option>Conference Organizer</option>
                  <option>Technician</option>
                  <option>Medical Company</option>
                  <option>Medical Representative</option>
                </select>
                <p style={{ color: 'red' }}></p>
              </div>

              <div className="col-md-6">
                <label for="inputEmail4" className="form-label  add-view-product-label-hospital">  Country <span className="Mandatory">*</span></label>
                <select
                  className="form-multi-select"
                  id="single-select"
                  placeholder="Enter Country "
                  data-coreui-multiple="false"
                  className="form-controls">
                  <option>Choose one</option>
                  <option>Saudi Arabia</option>
                  <option>Egypt</option>
                  <option>Bahrain</option>
                  <option>Malaysia</option>
                  <option>Oman</option>
                  <option>Turkey</option>
                  <option>UAE</option>
                  <option>North Canada</option>
                  <option>Other</option>
                </select>
                <p style={{ color: 'red' }}></p>
              </div>

              <div className="col-md-6">
                <label for="inputEmail4" className="form-label  add-view-product-label-hospital">  Select City <span className="Mandatory">*</span></label>
                <select
                  className="form-multi-select"
                  id="single-select"
                  placeholder="Enter Status "
                  data-coreui-multiple="false"
                  className="form-controls">
                  <option>Choose one</option>
                  <option>Egypt</option>
                  <option>Bahrain</option>
                  <option>Malaysia</option>
                </select>
                <p style={{ color: 'red' }}></p>
              </div>

            </form>
            <hr className="horizontal-line" />
            <div style={{ textAlign: 'end', marginBottom: '50px' }}>
              <button className="rounded-0 Submit-form-view-hospital" type="button">
                Submit Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMedicalConsulation;
