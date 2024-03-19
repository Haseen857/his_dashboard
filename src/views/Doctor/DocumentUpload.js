// // import { useHistory } from "react-router-dom";
// // import React, { useState } from "react";
// // import { useDropzone } from "react-dropzone";
// // import Dropzone from "react-dropzone";
// // import swal from "sweetalert";
// // const AcceptMaxFiles = (props) => {
// //   // const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
// //   //     useDropzone({
// //   //         maxFiles: 2,
// //   //     });

// //   // const acceptedFileItems = acceptedFiles.map((file) => (
// //   //     <li key={file.path}>
// //   //         {file.path} - {file.size} bytes
// //   //     </li>
// //   // ));

// //   // const fileRejectionItems = fileRejections.map(({ file, errors }) => {
// //   //     return (
// //   //         <li key={file.path}>
// //   //             {file.path} - {file.size} bytes
// //   //             <ul>
// //   //                 {errors.map((e) => (
// //   //                     <li key={e.code}>{e.message}</li>
// //   //                 ))}
// //   //             </ul>
// //   //         </li>
// //   //     );
// //   // });

// //   const history = useHistory();

// //   const redirect = () => {
// //     history.push("../");
// //     window.location.reload();
// //   };

// //   const [selectedFiles, setSelectedFiles] = useState(undefined);
// //   const [currentFile, setCurrentFile] = useState(undefined);

// //   const [message, setMessage] = useState("");

// //   const upload = (e) => {
// //     e.preventDefault();
// //     let currentFile = selectedFiles;
// //     var formData = new FormData();
// //     currentFile.forEach((item) => {
// //       formData.append("files", item);
// //     });

// //     setCurrentFile(currentFile);

// //     console.log(formData);
// //     props
// //       .onuploaddoctor(formData)
// //       .then((response) => {
// //         swal({
// //           icon: "success",
// //           title: "Successfully Uploaded ",
// //         }).then(() => {
// //           props.history.push("../");
// //         });
// //       })
// //       .catch((e) => {
// //         // debugger;
// //         // console.log(e.payload.message);
// //         const last3 = e.message.slice(26, 35);

// //         if (last3 === "undefined") {
// //           swal({
// //             icon: "error",
// //             title: "Type error",
// //             text: "only upload pdf or image file",
// //           });
// //         } else {
// //           swal({
// //             icon: "error",
// //             title: "Error",
// //             text: "Try Again Later or Contact your administrator",
// //           });
// //         }

// //         setMessage("Could not upload the file!");
// //         setCurrentFile(undefined);
// //       });

// //     setSelectedFiles(undefined);
// //   };

// //   const onDrop = (files) => {
// //     if (files.length > 0) {
// //       setSelectedFiles(files);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Dropzone onDrop={onDrop} multiple={true}>
// //         {({ getRootProps, getInputProps }) => (
// //           <section>
// //             <div {...getRootProps({ className: "dropzone" })}>
// //               <input {...getInputProps()} accept="image/* , .pdf" />
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "center",
// //                   marginBottom: "40px",
// //                   textTransform: "uppercase",
// //                 }}
// //               >
// //                 <h5 className="lineformtitle">
// //                   Upload Documents To Get Verified
// //                 </h5>
// //               </div>
// //               <div className="uploader">
// //                 <label>
// //                   <div id="start">
// //                     <i className="fa fa-download" aria-hidden="true"></i>
// //                     <div>
// //                       <h3>Browse files to Upload</h3>
// //                     </div>
// //                   </div>
// //                 </label>
// //               </div>
// //             </div>

// //             <h4 className="acc">Accepted files</h4>

// //             <ul className="Accepted">
// //               {selectedFiles &&
// //                 selectedFiles.map((file) => <li>{file.name}</li>)}
// //             </ul>

// //             <div style={{ display: "flex", justifyContent: "end" }}>
// //               <button
// //                 className="Submit-form-view-hospital-document-upload"
// //                 disabled={!selectedFiles}
// //                 onClick={upload}
// //               >
// //                 Upload
// //               </button>
// //             </div>
// //           </section>
// //         )}
// //       </Dropzone>
// //     </div>
// //   );
// // };

// // export default AcceptMaxFiles;

// import { useHistory } from "react-router-dom";
// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import Dropzone from "react-dropzone";
// import swal from "sweetalert";
// import jwt from "jwt-decode";
// import config from "../../config";
// import { MDBIcon } from 'mdbreact';

// const DocumetUpload = (props) => {
//   var token = JSON.parse(localStorage.getItem(config.AuthStorageKey));
//   const tokenDetails = jwt(token.accessToken);
//   const type = tokenDetails.type;
//   const roles = tokenDetails.roles;
//   const history = useHistory();

//   const redirect = () => {
//     history.push("../");
//     window.location.reload();
//   };
//   ////////////////////////////////////////////////////////////////////////////////////////////Files
//   const [selectedFiles, setSelectedFiles] = useState(undefined);
//   const [currentFile, setCurrentFile] = useState(undefined);

//   const [message, setMessage] = useState("");
//   if (type == "hospital") {
//     // || roles.includes("Super Admin")
//     const upload = (e) => {
//       e.preventDefault();
//       let currentFile = selectedFiles;
//       var formData = new FormData();
//       currentFile.forEach((item) => {
//         formData.append("files", item);
//       });

//       setCurrentFile(currentFile);

//       console.log(formData);
//       props
//         .onuploadhospital(formData)
//         .then((response) => {
//           setMessage(response.data.message);
//           debugger;
//           swal({
//             icon: "success",
//             title: "Successfully Uploaded ",
//           }).then(() => {
//             props.history.push("../");
//           });
//         })
//         .catch((error) => {
//           // console.log(e.payload.message);\
//           // debugger;
//           const newed = error.message;
//           // console.log(newed);
//           if (newed) {
//             // console.log(newed);
//             swal({
//               icon: "success",
//               title: "Successfully Uploaded ",
//             }).then(() => {
//               props.history.push("../");
//             });
//           } else {
//             const last3 = error.payload.message.slice(-3);
//             if (last3 === "403") {
//               swal({
//                 icon: "warning",
//                 title: "Not Authorised",
//                 text: "contact Administration if this is a mistake!",
//                 confirmButtonText: "okay",
//                 button: true,
//               }).then(() => {
//                 props.history.push("../");
//                 window.location.reload();
//               });
//             } else if (last3 === "401") {
//               swal({
//                 icon: "error",
//                 title: "Time-out",
//                 text: "Re login or contact your administrator",
//                 confirmButtonText: "okay",
//                 button: true,
//               });
//             } else if (last3 === "404") {
//               swal({
//                 icon: "info",
//                 title: "Not yet Registered",
//                 text: "Add your Hospital before submitting documents.",
//                 confirmButtonText: "okay",
//                 button: true,
//               }).then(() => {
//                 props.history.push("/addhospital");
//               });
//             } else if (last3 === "400") {
//               swal({
//                 icon: "error",
//                 title: "Type error",
//                 text: "only upload pdf or image file",
//               });
//             } else {
//               swal({
//                 icon: "error",
//                 title: "Error",
//                 text: "Try Again Later or Contact your administrator",
//               });
//             }
//           }

//           setMessage("Could not upload the file!");
//           setCurrentFile(undefined);
//         });

//       setSelectedFiles(undefined);
//     };
//     const onDrop = (files) => {
//       if (files.length > 0) {
//         setSelectedFiles(files);
//       }
//     };

//     return (
//       <>
//         <div>
//           <Dropzone onDrop={onDrop} multiple={true}>
//             {({ getRootProps, getInputProps }) => (
//               <section style={{ marginBottom: "12pc" }}>
//                 <div {...getRootProps({ className: "dropzone" })}>
//                   <input {...getInputProps()} accept="image/* , .pdf" />
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       marginBottom: "40px",
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     <h5 className="lineformtitle">Upload Documents To Get Verified</h5>
//                   </div>
//                   <div class="uploader">
//                     <label>
//                       <div id="start">
//                         <i class="fa fa-download" aria-hidden="true"></i>
//                         <div>
//                           <h3>Browse files to Upload</h3>
//                         </div>
//                       </div>
//                     </label>
//                   </div>
//                 </div>

//                 {/* <ul className="Accepted">
//               {selectedFiles &&
//                 selectedFiles.map((file) => <li>{file.name}</li>)}
//             </ul> */}

//                 <div>
//                   {/* <ul className="Accepted">
//                   {selectedFiles &&
//                     selectedFiles.map((file) => <li>{file.name}</li>)}
//                 </ul> */}
//                   {/* <div style={{ display: "flex", justifyContent: "end" }}>
//                   <button
//                     className="Submit-form-view-hospital-document-upload"
//                     disabled={!selectedFiles}
//                     onClick={upload}
//                   >
//                     Upload
//                   </button>
//                 </div> */}
//                 </div>
//               </section>
//             )}
//           </Dropzone>
//         </div>
//         <br />
//         <br />
//         <br />
//         <table className='document-upload'>
//           <tr>
//             <th>S.NO</th>
//             <th>DOCUMENT NAME</th>
//             <th>ACTION</th>
//           </tr>
//           <tr>
//             <td>1</td>
//             <td>wishlist.svg</td>
//             <td>
//               <div>
//                 <a
//                   data-toggle="tooltip"
//                   title=""
//                   className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
//                   title-tip="Delete"
//                 // onClick={}
//                 >
//                   <MDBIcon icon="trash-alt" />
//                 </a>

//               </div>
//             </td>
//           </tr>
//           <tr>
//             <td>2</td>
//             <td>wishlist.svg</td>
//             <td>
//               <div >
//                 <a
//                   data-toggle="tooltip"
//                   title=""
//                   className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
//                   title-tip="Delete"
//                 // onClick={}
//                 >
//                   <MDBIcon icon="trash-alt" />
//                 </a>

//               </div>
//             </td>
//           </tr>
//           <tr>
//             <td>3</td>
//             <td>wishlist.svg</td>
//             <td>
//               <div >
//                 <a
//                   data-toggle="tooltip"
//                   title=""
//                   className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
//                   title-tip="Delete"
//                 // onClick={}
//                 >
//                   <MDBIcon icon="trash-alt" />
//                 </a>

//               </div>
//             </td>
//           </tr>
//           <tr>
//             <td>4</td>
//             <td>wishlist.svg</td>
//             <td>
//               <div>
//                 <a
//                   data-toggle="tooltip"
//                   title=""
//                   className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
//                   title-tip="Delete"
//                 // onClick={}
//                 >
//                   <MDBIcon icon="trash-alt" />
//                 </a>

//               </div>
//             </td>
//           </tr>
//           <tr>
//             <td>5</td>
//             <td>wishlist.svg</td>
//             <td>
//               <div >
//                 <a
//                   data-toggle="tooltip"
//                   title=""
//                   className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
//                   title-tip="Delete"
//                 // onClick={}
//                 >
//                   <MDBIcon icon="trash-alt" />
//                 </a>

//               </div>
//             </td>
//           </tr>
//           <tr>
//             <td>6</td>
//             <td>wishlist.svg</td>
//             <td>
//               <div >
//                 <a
//                   data-toggle="tooltip"
//                   title=""
//                   className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger"
//                   title-tip="Delete"
//                 // onClick={}
//                 >
//                   <MDBIcon icon="trash-alt" />
//                 </a>

//               </div>
//             </td>
//           </tr>
//         </table>
//         <br />

//         <div style={{ textAlign: 'end', marginBottom: '50px' }}>
//           <button className="rounded-0 Submit-form-view-hospital" type="button">
//             Upload
//           </button>
//         </div>
//       </>

//     );
//   } else {
//     swal({
//       icon: "error",
//       title: "You can Not upload Documents",
//       text: "Re-Register as Hospital to submit your Hospital details",
//       confirmButtonText: "okay",
//       button: true,
//     }).then(() => {
//       props.history.push("/dashboard");
//       window.location.reload();
//     });

//     return (
//       <>
//         <div className="container-fluid">
//           <div className="main-div">
//             <div className="form-header"></div>
//           </div>
//         </div>
//       </>
//     );
//   }
// };

// export default DocumetUpload;
