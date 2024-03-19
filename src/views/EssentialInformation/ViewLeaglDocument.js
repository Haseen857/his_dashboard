import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MDBIcon } from "mdbreact";
import {
  CButton,
  CModalHeader,
  CModal,
  CModalBody,
  CModalFooter,
  CModalTitle,
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
//     name: "Document List",
//     selector: (row) => row.name,
//     sortable: true,
//   },

//   {
//     name: "Actions",
//     selector: (row) => row.Actions,
//     sortable: false,
//   },
// ];

const ViewLegalDocument = (props) => {
  const handleChange = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);
  };

  const [visible, setVisible] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [documentName, setDocumentName] = useState("");
  const [selectedDocumentsId, setSelectedDocumentsId] = useState([]);
  const [user, setUser] = useState({ role: "", id: "" });
  const [adminCurrentlyViewing, setAdminCurrentlyViewing] =
    useState("hospital");

  useEffect(() => {
    checkHospitalOrAdmin();
    initialGetDocuments();
  }, []);

  useEffect(() => {
    if (user.role !== "admin") return;
    adminGetDocuments(adminCurrentlyViewing);
  }, [adminCurrentlyViewing]);

  const initialGetDocuments = async () => {
    try {
      const [admin, hospital] = await checkHospitalOrAdmin();

      let res;

      if (admin) {
        res = await api.get(`admin/documents?type=${adminCurrentlyViewing}`);
      }
      if (hospital) {
        res = await api.get(
          `hospital-doctors/hospital/${hospital.id}/documents`
        );
      }

      if (res.status === 200) {
        const final = res.data.map((data) => ({
          name: data.name,
          id: data.id,
        }));

        setDocuments(final);
      }
    } catch (error) {
      if (error === "resolved") return;

      swal({
        icon: "error",
        title: "Error Getting Documents",
        button: "okay",
      });
    }
  };

  /** @param {'hospital' | 'doctors' | 'all'} type */
  const adminGetDocuments = async (type = "hospital") => {
    try {
      const res = await api.get(`admin/documents?type=${type}`);

      if (res.status === 200) {
        const final = res.data.map((data) => ({
          name: data.name,
          id: data.id,
        }));
        setDocuments(final);
      }
    } catch (error) {
      if (error === "resolved") return;

      swal({
        icon: "error",
        title: "Error Getting Documents",
        button: "okay",
      });
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      if (user.role === "admin") {
        const res = await api.delete(`admin/documents/${documents[id].id}`);

        if (res.status === 200) {
          setSelectedDocumentsId(
            selectedDocumentsId.filter((elId) => elId !== id)
          );
          setDocuments(
            documents.filter((el, index) => el.id !== documents[id].id)
          );
        }
      }

      if (user.role === "hospital") {
        setSelectedDocumentsId(
          selectedDocumentsId.filter((elId) => elId !== id)
        );
        setDocuments(documents.filter((el, index) => index !== id));
      }
    } catch (error) {
      if (error === "resolved") return;

      swal({
        icon: "error",
        title: "An Unexpected Error Occoured",
        button: "okay",
      });
    }
  };

  const handleAddDocument = async () => {
    if (!documentName) return setVisible(false);
    if (documents.filter((el) => el.name === documentName).length) return false;

    try {
      if (user.role === "hospital") {
        documents.push({ name: documentName });
      }

      if (user.role === "admin") {
        const payload = {
          name: documentName,
          type: adminCurrentlyViewing,
        };

        const res = await api.post("admin/documents", payload);

        if (res.status === 201) {
          documents.push({ name: res.data.name, id: res.data.id });
        } else {
          debugger;
          swal({
            icon: "error",
            title: "An Unexpected Error Occoured",
            button: "okay",
          });
        }
      }

      setDocumentName("");
      setVisible(false);
    } catch (error) {
      setDocumentName("");
      setVisible(false);

      if (error === "resolved") return;

      swal({
        icon: "error",
        title: "An Unexpected Error Occoured",
        button: "okay",
      });
    }
  };

  const handleSelectAll = () => {
    if (selectedDocumentsId.length === documents.length) {
      setSelectedDocumentsId([]);
    } else {
      const final = documents.map((document, index) => index);
      setSelectedDocumentsId(final);
    }
  };

  const handleSelect = (id) => {
    if (selectedDocumentsId.includes(id)) {
      setSelectedDocumentsId(selectedDocumentsId.filter((elId) => elId !== id));
    } else {
      setSelectedDocumentsId([...selectedDocumentsId, id]);
    }
  };

  const checkHospitalOrAdmin = async () => {
    const token = await getToken();
    const data = await jwtDecode(token.accessToken);

    if (data.roles.includes("Super Admin")) {
      if (!(user.role.length > 0)) {
        setUser({ role: "admin", id: "" });
      }
      return [true, false];
    } else if (data.roles.includes("Hospital Admin")) {
      if (!(user.role.length > 0)) {
        setUser({ role: "hospital", id: token.hospitalId });
      }

      return [false, { id: token.hospitalId }];
    } else {
      swal({
        type: "error",
        title: "You are not allowed to access this resource",
        button: "okay",
      }).then(() => {
        props.history.goBack();
      });
    }
  };

  const handleSaveDocuments = async () => {
    try {
      let res;

      let DocumentsPayload = {
        documents: documents.map((document) => document.name),
      };

      if (documents.length > 0) {
        res = await api.put(
          `hospital-doctors/${user.id}/documents`,
          DocumentsPayload
        );
      } else {
        res = await api.post(`hospital-doctors/hospital/${user.id}/documents`);
      }

      if (res.status === 200) {
        const final = res.data.map((data) => data);
        console.log(final);
        setDocuments(final);
        setSelectedDocumentsId([]);

        swal({
          icon: "success",
          title: "Documents Updated Successfully",
          button: "okay",
        });
      }
    } catch (error) {
      if (error === "resolved") return;

      swal({
        icon: "error",
        title: "Error Saving Documents",
        button: "okay",
      });
    }
  };

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">
          {user.role === "admin"
            ? `Legal Documents of ${adminCurrentlyViewing}`
            : "Legal Documents"}
        </h5>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <form onSubmit={(e) => handleAddDocument(e)}>
          <CButton
            onClick={() => setVisible(!visible)}
            className="rounded-0 Submit-form-view-hospital"
          >
            Add Document to List
          </CButton>
          <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
              <CModalTitle>Documents</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <input
                type="text"
                className="form-controls"
                placeholder="Add Documents"
                name="discountPercent"
                id="discountPercent"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
              />
            </CModalBody>
            <CModalFooter>
              <button
                type="submit"
                className="rounded-0 Submit-form-view-hospital"
                onClick={(e) => handleAddDocument(e)}
              >
                Add Document
              </button>
            </CModalFooter>
          </CModal>
        </form>
        {user.role === "admin" && (
          <CButton
            className="rounded-0 Submit-form-view-hospital"
            onClick={() =>
              setAdminCurrentlyViewing(
                adminCurrentlyViewing === "hospital" ? "doctor" : "hospital"
              )
            }
          >
            {" "}
            switch to{" "}
            {adminCurrentlyViewing === "hospital" ? "doctors" : "hospital"}{" "}
          </CButton>
        )}
      </div>

      <div style={{ marginTop: "40px" }}>
        <table id="customers" style={{ marginBottom: "30px" }}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => (
              <tr key={index}>
                <td>{document.name}</td>

                <td>
                  <div style={{ display: "flex" }}>
                    <Tooltip title="Delete Document">
                      <a
                        data-toggle="tooltip"
                        title=""
                        className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger titletip"
                        title-tip="Delete"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        onClick={() => handleDeleteDocument(index)}
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
        {user.role !== "admin" && (
          <button
            onClick={() => handleSaveDocuments()}
            className="rounded-0 Submit-form-view-hospital"
          >
            Save All
          </button>
        )}
      </div>
    </>
  );
};
export default ViewLegalDocument;
