import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import swal from "sweetalert";
import jwt from "jwt-decode";
import config from "../../../config";
import { MDBIcon } from "mdbreact";
import DataTable from "react-data-table-component";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import isLoggedIn from "src/common/auth";
import { apiCallWithoutStore as api } from "src/service/api";

import { Redirect } from "react-router-dom";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: darkblue;
  position: relative;
  bottom: 250px;
`;

const AcceptMaxFilesupdate = (props) => {
  // console.log(isLoggedIn);

  var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
  const tokenDetails = jwt(token.accessToken);
  const type = tokenDetails.type;
  const roles = tokenDetails.roles;
  const history = useHistory();
  const [data, setData] = useState(null);
  const [tags, setTags] = React.useState([]);
  // const [tags1, setTags2] = React.useState([]);
  const [LegalDoc, setLegalDoc] = React.useState([]);
  const [visibleLegal, setVisiblelegal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documented, setdocuemnted] = useState([]);
  // const [documentName, setdocuemntedName] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  // const [select, setSelect] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const docRef = useRef();
  docRef.current = documented;
  let customData = {
    columns: [
      {
        name: "S.No.",
        selector: (row) => row.serial,
      },
      {
        name: "item Name",
        selector: (row) => row.name,
      },
      {
        name: "Delete Document",
        selector: (row) => row.doc,
      },
    ],
    rows: [],
  };

  // -----
  const [documentsList, setDocumentsList] = useState([]);
  const [selectedDocuments, setSelectedDocments] = useState({});

  useEffect(() => {
    getDocumentsList();
  }, []);

  const getDocumentsList = async () => {
    try {
      var url = "admin/documents?type=hospital";
      if (type == "hr") {
        url = "admin/documents?type=hr";
      }
      const { data, status } = await api.get(url);

      if (status === 200) {
        const final = data.map((data) => data.name);
        setDocumentsList(final);
      } else {
        swal({
          icon: "error",
          title: "error getting document list",
          button: "okay",
        });
      }
    } catch (error) {
      if (error === "resolved") return;

      swal({
        icon: "error",
        title: "error getting document list",
        button: "okay",
      });
    }
  };

  const handleSelectDocument = (event, documentName) => {
    const file = event.target.files[0];

    if (!file) return null;

    var sizee = file.size / 1048576;
    if (sizee > 2) {
      swal({
        icon: "warning",
        title: "File size exceeds 2MB",
        text: `${file.name} is of ${sizee} MB and exceeds 2MB`,
        timer: 5000,
        button: false,
      });

      if (selectedDocuments[documentName]) {
        delete selectedDocuments[documentName];
        setSelectedDocments(selectedDocuments);
      }

      event.target.value = null;
      return null;
    }

    selectedDocuments[documentName] = file;
    setSelectedDocments(selectedDocuments);
  };

  // -----

  function deleteDoctor(id) {
    // debugger;

    let newdocs = [...docRef.current];
    newdocs.splice(id, 1);
    setdocuemnted(newdocs);

    // debugger;
  }

  const redirect = () => {
    history.push("../");
    window.location.reload();
  };

  useEffect(() => {
    if (selectedFiles) {
      selectedFiles.forEach((file) => {
        var sizee = file.size / 1048576;
        if (sizee > 2) {
          swal({
            icon: "warning",
            title: "File size exceeds 2MB",
            text: `${file.name} \n \n Size: ${Math.round(
              sizee
            )} MB is greater than 2 MB`,
            timer: 5000,
            button: false,
          });
        } else if (
          file.type == "image/png" ||
          file.type == "image/jpeg" ||
          file.type == "image/jpg" ||
          file.type == "application/pdf"
        ) {
          documented.push(file);
        } else {
          swal({
            icon: "warning",
            title: "Not a Valid Type",
            text: `${file.type} is not a valid type only \n png, jpg, jpeg and pdf are allowed`,
            timer: 5000,
            button: false,
          });
        }
      });
    }
  }, [selectedFiles]);

  useEffect(() => {
    tableer();
  }, [selectedFiles, documented]);

  const tableer = () => {
    var items = documented;

    var rows = [];
    for (var i = 0; i < items.length; i++) {
      var row = {};
      row["serial"] = i + 1;
      row["name"] = items[i].name;
      row["doc"] = (
        <button
          data-toggle="tooltip"
          title=""
          className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
          title-tip="Delete"
          // data-id={items[i].id}
          id={i}
          onClick={(e) => {
            deleteDoctor(e.currentTarget.id);
          }}
        >
          <MDBIcon icon="trash-alt" />
        </button>
      );
      rows.push(row);
    }

    customData.rows = rows;

    setData(customData);
  };

  const [message, setMessage] = useState("");
  if (type == "hospital" || type == "hr") {
    const dataTable = () => {
      return (
        <DataTable
          columns={data.columns}
          data={data.rows}
          persistTableHead
          subHeaderComponent
        />
      );
    };

    const upload = (e) => {
      e.preventDefault();

      var formData = new FormData();
      var checker = false;

      documentsList.map((key) => {
        if (!selectedDocuments[key]) {
          checker = true;
          return swal({
            icon: "error",
            title: `Please select all documents`,
            text: `all documents listed below are required`,
            confirmButtonText: "okay",
            button: true,
          });
        }

        checker = false;
        formData.append("files", selectedDocuments[key]);
        formData.append("documentNames[]", key);
      });

      debugger;

      if (formData.getAll("documentNames[]").length === documentsList.length) {
        debugger;
        setCurrentFile(currentFile);
        setLoading(true);
        var url = `hospital/upload/${isLoggedIn.hospitalId}/documents`;
        if (type == "hr") {
          url = `hr-company/${isLoggedIn.hrId}/upload/documents`;
        }
        props
          .onupdatehospitaldocuments(formData, url)
          .then((response) => {
            setMessage(response.data.message);
            setLoading(false);
            swal({
              icon: "success",
              title: "Successfully Uploaded ",
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            setLoading(false);
            const newed = error.message;
            // console.log(newed);
            if (newed) {
              // console.log(newed);
              swal({
                icon: "success",
                title: "Successfully Uploaded ",
              }).then(() => {
                // localStorage.removeItem("accessToken");
                // localStorage.removeItem("refreshToken");
                // localStorage.removeItem("user");
                // localStorage.clear();
                // window.location.reload();
                localStorage.clear();
                // localStorage.AuthDetails.clear();
                // window.location.reload();
                props.history.push("/");
                // debugger;
                window.location.reload();
              });
            } else {
              const last3 = error.payload.response.data.statusCode;
              const message = error.payload.response.data.message;
              const Title = error.payload.response.data.error;
              // debugger;
              if (last3 === 403) {
                swal({
                  icon: "warning",
                  title: `${Title}`,
                  text: `${message}`,
                  confirmButtonText: "okay",
                  button: true,
                }).then(() => {
                  props.history.push("../");
                  window.location.reload();
                });
              } else if (last3 === 401) {
                swal({
                  icon: "error",
                  title: `${Title}`,
                  text: `${message}`,
                  confirmButtonText: "okay",
                  button: true,
                });
              } else if (last3 === 404) {
                swal({
                  icon: "info",
                  title: `${Title}`,
                  text: `${message}`,
                  confirmButtonText: "okay",
                  button: true,
                }).then(() => {
                  props.history.push("/addhospital");
                });
              } else if (last3 === 400) {
                swal({
                  icon: "error",
                  title: `${Title}`,
                  text: `${message}`,
                }).then(() => {
                  window.location.reload();
                });
              } else {
                swal({
                  icon: "error",
                  title: "Error",
                  text: "Try Again Later or Contact your administrator",
                });
              }
            }

            setMessage("Could not upload the file!");
            setCurrentFile(undefined);
          });

        setSelectedFiles(undefined);
      }
    };
    const onDrop = (files) => {
      if (files.length > 0) {
        setSelectedFiles(files);
      }
    };

    return (
      <>
        <div className="bg-light min-vh-100  align-items-center">
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
                textTransform: "uppercase",
              }}
            >
              <h5 className="lineformtitle">Update Your Documents</h5>
            </div>

            <section
              className={!loading ? "documentupload" : "setdocumentupload"}
              style={{ marginBottom: "12px" }}
            >
              <h4 className="acc">Accepted files</h4>

              <div>
                <div>
                  {/* <div>{data ? dataTable() : "No Document Chossen"}</div> */}
                  <table id="customers" style={{ marginBottom: "30px" }}>
                    <thead>
                      <tr>
                        <td>Document Type</td>
                        <td>Upload</td>
                      </tr>
                    </thead>

                    <tbody>
                      {documentsList.map((document, index) => (
                        <tr key={index}>
                          <td> {document} </td>
                          <td>
                            <input
                              type="file"
                              name="document"
                              id="document"
                              accept="image/*"
                              onChange={(event) =>
                                handleSelectDocument(event, document)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <button
                    className="Submit-form-view-hospital-document-upload"
                    // disabled={!selectedFiles}
                    onClick={upload}
                  >
                    Upload
                  </button>
                </div>
                <ClipLoader
                  // color={color}
                  loading={loading}
                  css={override}
                  size={100}
                />
              </div>
            </section>
          </div>
        </div>
      </>
    );
  } else {
    var errorText = "Re-Register as Hospital to submit your Hospital details";
    if (type == "hr") {
      errorText = "Re-Register as HR to submit your HR details";
    }
    swal({
      icon: "error",
      title: "You can Not upload Documents",
      text: errorText,
      confirmButtonText: "okay",
      button: true,
    }).then(() => {
      props.history.push("/dashboard");
      window.location.reload();
    });

    return (
      <>
        <div className="container-fluid">
          <div className="main-div">
            <div className="form-header"></div>
          </div>
        </div>
      </>
    );
  }
};

export default AcceptMaxFilesupdate;
