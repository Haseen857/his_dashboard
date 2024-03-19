import React from 'react'


function Edit() {
    return (

        <div className='show12 container-fluid'>
            <br />
            <div className="row d-flex justify-content-center">
                <div className="text-center"> <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" className="rounded-circle" /> </div>
            </div>
            <br />
            <br />
                <div className="main-div">
                    <div className="form-container-editpage">
                        <form className="row g-3 d-flex justify-content-start ml-20" >
                            <div className="col-md-6">
                                <label for="inputEmail4" className="form-label add-view-product-label"> User Name <span className="Mandatory">*</span></label>
                                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter User Name" />
                            </div>

                            <div className="col-md-6">
                                <label for="inputPassword4" className="form-label  add-view-product-label">Enter Password<span className="Mandatory">*</span></label>
                                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Password" />
                            </div>

                            <div className="col-md-6">
                            <label for="inputPassword4" className="form-label  add-view-product-label">Full Name <span className="Mandatory">*</span></label>
                                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Full Name" />
                            </div>

                            <div className="col-md-6">
                            <label for="inputPassword4" className="form-label  add-view-product-label">Position <span className="Mandatory">*</span></label>
                                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Position" />
                            </div>

                            <div className="col-md-6">
                            <label for="inputPassword4" className="form-label  add-view-product-label">Department <span className="Mandatory">*</span></label>
                                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Department" />
                            </div>


                            <div className="col-md-6">
                            <label for="inputPassword4" className="form-label  add-view-product-label">Company/Hospital  <span className="Mandatory">*</span> </label>
                            <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Company/Hospital"/>
                            </div>


                            <div className="col-md-6">
                            <label for="inputPassword4" className="form-label  add-view-product-label">Email <span className="Mandatory">*</span></label>
                                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Email" />
                            </div>


                            <div className="col-md-6">
                                <label for="inputPassword4" className="form-label  add-view-product-label">Phone</label>
                                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Phone" />
                            </div>


                            <div className="col-md-6">
                            <label for="inputPassword4" className="form-label  add-view-product-label">Mobile <span className="Mandatory">*</span> </label>
                                <input type="text" className="form-controls" id="inputPassword4" placeholder="Enter Mobile" />
                            </div>

                            <div className="col-md-6">
                            <label for="inputPassword4" className="form-label  add-view-product-label">Address <span className="Mandatory">*</span></label>
                                <textarea type="text" className="form-controls" id="inputEmail4" placeholder="Enter your Address" />
                            </div>




                            <div className="col-md-6">
                                <label for="inputEmail4" className="form-label add-view-product-label"> Status <span className="Mandatory">*</span></label>
                                <select
                                    className="form-multi-select"
                                    id="single-select"
                                    placeholder="Enter Status "
                                    data-coreui-multiple="false"
                                    className="form-controls">
                                    <option>Pending</option>
                                    <option>Active</option>
                                    <option>InActive</option>
                                </select>
                            </div>



                         

                        </form>
                    </div>
                </div>


                <hr className="horizontal-line" />
                <div className="d-flex justify-content-end">
                    <button className="btn9  rounded-0 Submit-form-view-hospital" type="button">
                       update Form
                    </button>
                </div>
                <br />
                <br />
                <br />

           
        </div>





    )
}

export default Edit

