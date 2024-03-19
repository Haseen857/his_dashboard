import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import swal from "sweetalert";
import jwt from "jwt-decode";
import config from "../../config";
import { MDBIcon } from "mdbreact";
import DataTable from "react-data-table-component";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import isLoggedIn from "src/common/auth";

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
  const [selectedRows, setSelectedRows] = React.useState([]);
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

  function deleteDoctor(id) {
    // debugger;
    swal({
      icon: "info",
      title: "Are You Sure?",
      text: ` Document will be Deleted`,
      confirmButtonText: "okay",
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((result) => {
      if (result) {
        let newdocs = [...docRef.current];
        newdocs.splice(id, 1);
        setdocuemnted(newdocs);
      }
    });

    // debugger;
  }

  function deletemultiple() {
    var selectid = [];
    selectedRows.forEach((element) => {
      selectid.push(element.serial - 1);
    });
    // console.log(selectid);

    swal({
      icon: "info",
      title: "You Are Deleting Multiple Documents",
      text: `${selectid.length} Documents will be Deleted`,
      confirmButtonText: "okay",
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((result) => {
      if (result) {
        let newdocs = [...docRef.current];
        if (selectid.length === newdocs.length) {
          newdocs.splice(0, selectid.length);
        } else {
          for (var i = 0; i < selectid.length; i++) {
            newdocs.splice(selectid[i], 1);
          }
        }
        setdocuemnted(newdocs);
        selectedRows.splice(0, selectedRows.length);
      }
    });

    // selectid = [];
  }

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
    // debugger;
  }, []);

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

      // documented.forEach((item) => {
      //   documentName.push(item.name);
      // });
      documented.forEach((item) => {
        formData.append("files", item);
        formData.append(`documentNames[]`, item.name);
      });

      var checker = false;
      documented.forEach((item) => {
        var sizee = item.size / 1048576;
        if (sizee > 2) {
          swal({
            icon: "warning",
            title: "File size exceeds 2MB",
            text: `${item.name} is of ${sizee} MB and exceeds 2MB`,
            timer: 5000,
            button: false,
          });
          checker = true;
        }
      });
      if (!checker) {
        setCurrentFile(currentFile);
        setLoading(true);
        props
          .onupdatehospitaldocuments(formData, isLoggedIn.hospitalId)
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
        <div>
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

          <Dropzone onDrop={onDrop} multiple={true}>
            {({ getRootProps, getInputProps }) => (
              <section
                className={!loading ? "documentupload" : "setdocumentupload"}
                style={{ marginBottom: "12px" }}
              >
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} accept="image/* , .pdf" />

                  <div class="uploader">
                    <label>
                      <div id="start">
                        <i class="fa fa-download" aria-hidden="true"></i>
                        <div>
                          <h3>Browse files to Upload</h3>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <h4 className="acc">Accepted files</h4>

                <div>
                  <div>
                    <div>{data ? dataTable() : "No Document Chossen"}</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                      className="Submit-form-view-hospital-document-upload"
                      onClick={upload}
                      disabled={!isLoggedIn.check || !selectedFiles}
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
            )}
          </Dropzone>
          {selectedRows.length > 0 ? (
            <div>
              <button onClick={() => deletemultiple()}>
                Delete selectedFiles
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  } else {
    var errorText = "Re-Register as Hospital to submit your Hospital details";
    if (props.location.pathname.indexOf("hr") > -1) {
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
