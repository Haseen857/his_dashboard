import React, { useEffect, useState } from "react";
import { MDBIcon } from "mdbreact";
import {
  CButton,
  CModalHeader,
  CModal,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
} from "@coreui/react";
import { apiCallWithoutStore as api, getToken } from "src/service/api";
import swal from "sweetalert";
import jwtDecode from "jwt-decode";
import Tooltip from "src/components/Tooltip";

// const customStyles = {
//   rows: {
//     style: {
//       color: "#213f9a",
//       fontSize: "13px",
//     },
//   },
//   headCells: {
//     style: {
//       color: "#213f9a",
//       fontSize: "16px",
//       fontWeight: 800,
//       paddingLeft: "8px",
//       paddingRight: "8px",
//     },
//   },
//   cells: {
//     style: {
//       paddingLeft: "8px",
//       paddingRight: "8px",
//     },
//   },
// };

// const columns = [
//   {
//     name: "Name",
//     selector: (row) => row.name,
//     sortable: true,
//   },
//   {
//     name: "Image",
//     selector: (row) => row.Image,
//     sortable: false,
//   },

//   {
//     name: "Actions",
//     selector: (row) => row.Actions,
//     sortable: false,
//   },
// ];

const ViewSpeciality = (props) => {
  var token = JSON.parse(localStorage.getItem("AuthDetails"));
  if (token == null) token = localStorage.getItem("token");
  if (token == null) token = localStorage.getItem("admintoken");

  /** @param {React.ChangeEvent<HTMLInputElement>} event */
  const handleSelect = (event, specialityId) => {
    if (event.target.checked) {
      setSelectedSpecialitiesId([...selectedSpecialitiesId, specialityId]);
    } else {
      const final = selectedSpecialitiesId.filter((id) => id !== specialityId);
      setSelectedSpecialitiesId(final);
    }
  };

  const handleSelectAll = () => {
    if (selectedSpecialitiesId.length === specialities.length) {
      setSelectedSpecialitiesId([]);
    } else {
      const final = specialities.map((speciality) => speciality.id);
      setSelectedSpecialitiesId(final);
    }
  };

  const [visible, setVisible] = useState(false);
  const [specialityName, setSpecialityName] = useState("");
  const [specialityImg, setSpecialityImg] = useState({});
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpecialitiesId, setSelectedSpecialitiesId] = useState([]);
  const [savedSpecialities, setSavedSpecialities] = useState(0);
  const [isSpecialityUploading, setIsSpecialityUploading] = useState(false);
  const [addSpecialityError, setAddSpecialityError] = useState(false);

  useEffect(() => {
    isUserDoctor().then(() => {
      getSpecialityList();
      getSavedSpecialities();
    });
  }, []);

  const isUserDoctor = async () => {
    const data = await jwtDecode(token.accessToken);
    if (
      data.roles.includes("Super Admin") ||
      data.roles.includes("Hospital Admin")
    )
      return;
    else {
      swal({
        type: "error",
        title: "You are not allowed to access this resource",
        button: "okay",
      }).then(() => {
        props.history.goBack();
      });
    }
  };

  const getSpecialityList = async () => {
    try {
      const { data } = await api.get("specialities");

      const final = data.map((speciality) => ({
        id: speciality.id,
        name: speciality.name,
        image: speciality.imageUrl,
      }));
      setSpecialities(final);
    } catch (error) {
      if (error === "resolved") return;
      swal({
        icon: "error",
        title: "Error fetching specialities",
        button: "okay",
      });
    }
  };

  /** @param {React.FormEvent<HTMLFormElement>} e */
  const handleAddSpeciality = async (e) => {
    e.preventDefault();

    if (!specialityName) return setAddSpecialityError(true);
    if (!specialityImg.name) return setAddSpecialityError(true);

    setAddSpecialityError(false);
    setIsSpecialityUploading(true);

    const token = await getToken();

    const formData = new FormData();
    formData.append("file", specialityImg);
    formData.append("name", specialityName);

    try {
      let res;

      if (token.hospitalId) {
        res = await api.post("specialities/custom", formData);
      } else {
        res = await api.post("specialities", formData);
      }

      const { status, data } = res;

      if (status === 201) {
        setSpecialities([
          ...specialities,
          {
            id: data.id,
            name: data.name,
            image: data.imageUrl,
          },
        ]);
        setVisible(false);
        swal({
          icon: "success",
          title: "Speciality Added Successfully",
          text: "Speciality for hospital added Successfully",
          button: "okay",
        });
        setSpecialityName("");
        setSpecialityImg({});
        setIsSpecialityUploading(false);
      } else {
        setIsSpecialityUploading(false);
      }
    } catch (error) {
      if (error === "resolved") return;
      debugger;
      swal({
        icon: "error",
        title: "Error Adding Speciality",
        button: "okay",
      });
      setIsSpecialityUploading(false);
    }
  };

  /** @param {string} id */
  const addToSavedSpecialities = async (id) => {
    if (selectedSpecialitiesId.includes(id)) {
      return;
    } else {
      saveSpeciality([...selectedSpecialitiesId, id]);
    }
  };

  /** @param {string} id */
  const deleteFromSavedSpecialities = async (id) => {
    if (!token.hospitalId)
      return swal({
        icon: "error",
        title: "You are not allowerd to access this resource",
        button: "okay",
      });

    if (selectedSpecialitiesId.includes(id)) {
      const final = selectedSpecialitiesId.filter((sId) => sId !== id);
      saveSpeciality(final, false);
    } else {
      return;
    }
  };

  /** @param {string | string[]} id */
  const saveSpeciality = async (id, save = true) => {
    const token = await getToken();
    if (!token.hospitalId)
      return swal({
        icon: "error",
        title: "You are not allowerd to access this resource",
        button: "okay",
      });

    let payload = {
      specialities: [],
    };

    if (Array.isArray(id)) payload.specialities = id;
    else payload.specialities = [id];

    try {
      let res;

      if (!!payload.length) {
        res = await api.put("hospital/specialities", payload);
      } else {
        const token = await getToken();

        res = await api.put(
          `hospital/${token.hospitalId}/specialities`,
          payload
        );
      }

      if (res.status === 201 || 200) {
        const final = res.data.map((data) => data.specialities);
        setSelectedSpecialitiesId(final);
        setSavedSpecialities(final.length);
        swal({
          icon: "success",
          title: save
            ? "Speciality Added Successfully"
            : "Speciality Removed Successfully",
          text: save
            ? "Speciality for hospital added Successfully"
            : "Speciality for hospital removed Successfully",
          button: "okay",
        });
      }
    } catch (error) {
      if (error === "resolved") return;
      debugger;
      swal({
        icon: "error",
        title: save ? "Error adding speciality" : "Error removing speciality",
        text: "Speciality for hospital can not be added",
        button: "okay",
      });
    }
  };

  const getSavedSpecialities = async () => {
    const AuthDetails = await getToken();
    if (!AuthDetails.hospitalId) return;

    try {
      const { data, status } = await api.get(
        `hospital/${AuthDetails.hospitalId}/specialities`
      );
      if (status === 200) {
        const final = [
          ...new Set(data.map((hospital) => hospital.specialities.id)),
        ];
        setSavedSpecialities(final.length);
        setSelectedSpecialitiesId(final);
      }
    } catch (error) {
      if (error === "resolved") return;
      swal({
        icon: "error",
        title: "Error fetching specialities",
        button: "okay",
      });
    }
  };

  function openModel() {
    setSpecialityName("");
    setSpecialityImg({});
    setAddSpecialityError(false);
    setIsSpecialityUploading(false);
    setVisible(true);
  }

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">Add Specialities</h5>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CButton 
          onClick={openModel}
          className="rounded-0 Submit-form-view-hospital"
        >
          Add Custom Speciality
        </CButton>

        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Custom Speciality</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {addSpecialityError && (
              <p className="text-danger">
                *Both speciality name and image are required*
              </p>
            )}

            <input
              type="text"
              className="form-controls"
              placeholder="Speciality Name*"
              name="discountPercent"
              id="discountPercent"
              value={specialityName}
              onChange={(e) => setSpecialityName(e.target.value)}
            />

            <form onSubmit={(e) => handleAddSpeciality(e)} id="form-upload">
              <div class="form-group mt-5">
                <label for="">Choose Images*</label>
                <input
                  type="file"
                  class="form-control"
                  name="images[]"
                  multiple
                  id="upload-img"
                  accept="image/*"
                  onChange={(e) => setSpecialityImg(e.target.files[0])}
                />
              </div>
              <div class="img-thumbs img-thumbs-hidden" id="img-preview"></div>
            </form>
          </CModalBody>
          <CModalFooter>
            <button
              type="submit"
              onClick={handleAddSpeciality}
              className="rounded-0 Submit-form-view-hospital"
              disabled={isSpecialityUploading}
            >
              {isSpecialityUploading ? "Loading..." : "Upload"}
            </button>
          </CModalFooter>
        </CModal>

        {savedSpecialities > 0 ? (
          <div>
            <h5 style={{ textAlign: "right" }}>
              Saved {savedSpecialities} of {specialities.length} specialities.
            </h5>
          </div>
        ) : (
          <div>
            <h5 style={{ textAlign: "right" }}>
              Total {specialities.length} specialities.
            </h5>
          </div>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        {/* <DataTable
          columns={columns}
          data={specialities}
          pagination
          selectableRows
          onSelectedRowsChange={(e) => handleSelect(e)}
          customStyles={customStyles}
          persistTableHead
          subHeaderComponent
          subHeader
          selectableRowSelected={(row) => savedSpecialities.includes(row.id)}
        /> */}
        
       {/*  <table id="customers" style={{ marginBottom: "30px" }}>
          <thead>
            <tr>
              <td>
                <input
                  checked={
                    selectedSpecialitiesId.length === specialities.length
                  }
                  onChange={(e) => handleSelectAll()}
                  type="checkbox"
                />
              </td>
              <td>Name</td>
              <td>Image</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {specialities.map((speciality) => (
              <tr key={speciality.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedSpecialitiesId.includes(speciality.id)}
                    onChange={(e) => handleSelect(e, speciality.id)}
                  />
                </td>
                <td>{speciality.name}</td>
                <td>
                  <img
                    src={speciality.image}
                    height="60px"
                    style={{ margin: "5px 0" }}
                    alt="speciality"
                  />
                </td>
                <td>
                  {" "}
                  <div style={{ display: "flex" }}>
                    <Tooltip title="Add Speciality">
                      <a
                        className="btn btn-xs btn-info tbl-btn-common tbl-btn-success titletip"
                        onClick={() => addToSavedSpecialities(speciality.id)}
                      >
                        <MDBIcon icon="save" />
                      </a>
                    </Tooltip>

                    <Tooltip title="Remove Speciality">
                      <a
                        className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger titletip"
                        onClick={() =>
                          deleteFromSavedSpecialities(speciality.id)
                        }
                      >
                        <MDBIcon icon="trash" />
                      </a>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
                      </table>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {selectedSpecialitiesId.length > 0 && (
            <button
              style={{ marginBottom: "30px" }}
              className="rounded-0 Submit-form-view-hospital"
              onClick={() => saveSpeciality(selectedSpecialitiesId)}
            >
              Save Selected
            </button>
          )}
        </div>
      </div>*/}
     <CContainer >
        <CRow>
         <CCol  className="col-12 ">
           
          <CTable align="middle"responsive  id="customers" style={{ marginBottom: "30px" }} >
     <CTableHead>
     
       <CTableRow >
                 <CTableHeaderCell scope="col" className="w-10" ><input
                  checked={
                    selectedSpecialitiesId.length === specialities.length
                  }
                  onChange={(e) => handleSelectAll()}
                  type="checkbox"
                /></CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="w-50">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="w-30">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="w-20">Actions</CTableHeaderCell>
                  
    </CTableRow>
  </CTableHead>
 
  <CTableBody>
  {specialities.map((speciality) => (
    <CTableRow key={speciality.id}>
      <CTableHeaderCell scope="row"> <input
                    type="checkbox"
                    checked={selectedSpecialitiesId.includes(speciality.id)}
                    onChange={(e) => handleSelect(e, speciality.id)}
                  /></CTableHeaderCell>
      <CTableDataCell><span>{speciality.name}</span></CTableDataCell>
      <CTableDataCell> <img
                    src={speciality.image}
                    height="60px"
                    style={{ margin: "5px 0" }}
                    alt="speciality"
                  /></CTableDataCell>
      <CTableDataCell>{" "}
                  <div style={{ display: "flex" }}>
                    <Tooltip title="Add Speciality">
                      <a
                        className="btn btn-xs btn-info tbl-btn-common tbl-btn-success titletip" style={{margin:'6px'}}
                        onClick={() => addToSavedSpecialities(speciality.id)}
                      >
                        <MDBIcon icon="save" />
                      </a>
                    </Tooltip>

                    <Tooltip title="Remove Speciality">
                      <a
                        className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger  titletip"style={{margin:'6px'}}
                        onClick={() =>
                          deleteFromSavedSpecialities(speciality.id)
                        }
                      >
                        <MDBIcon  icon="trash" />
                      </a>
                    </Tooltip>
                  </div></CTableDataCell>
         </CTableRow>
   ))}
    
  </CTableBody>
 </CTable>

 </CCol>
  </CRow>
</CContainer>
<div style={{ display: "flex", justifyContent: "flex-end" }}>
          {selectedSpecialitiesId.length > 0 && (
            <button
              style={{ marginBottom: "30px" }}
              className="rounded-0 Submit-form-view-hospital"
              onClick={() => saveSpeciality(selectedSpecialitiesId)}
            >
              Save Selected
            </button>
          )}
        </div>
      </div>

    </>
   );
};
export default ViewSpeciality;
