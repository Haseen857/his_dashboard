import { CSpinner } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { apiCallWithoutStore as api, getToken } from "src/service/api";
import swal from "sweetalert";

const ViewDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);

  useEffect(() => {
    getDocumentsList();
  }, []);

  const getDocumentsList = async () => {
    try {
      const token = await getToken();

      const { data, status } = await api.get(
        `hospital/${token.hospitalId}/documents`
      );

      if (status === 200) {
        const final = data.map((document) => ({
          imgUrl: document.documentUrl,
          id: document.id,
        }));
        setDocuments(final);
        setIsDocumentsLoading(false);
      } else {
        debugger;
        setIsDocumentsLoading(false);
      }
    } catch (error) {
      setIsDocumentsLoading(false);
      if (error === "resolved") return;

      swal({
        icon: "error",
        title: "Unknown Error Occoured",
        text: "Try refreshing the page",
        button: "Okay",
      });
    }
  };

  return (
    <div className="px-2">
      <h2>Your Documents</h2>

      {isDocumentsLoading && <CSpinner color="primary" />}

      <table id="customers" style={{ margin: "30px 0" }}>
        <thead>
          <tr>
            <td>Sr Number</td>
            <td>Document Image</td>
          </tr>
        </thead>

        <tbody>
          {documents.map(({ imgUrl, id }, index) => (
            <tr key={id}>
              <td>{index + 1}</td>

              <td>
                <img
                  className="border border-primary"
                  style={{ cursor: "pointer", maxHeight: '200px', width: "auto" }}
                  src={imgUrl}
                  alt="documents"
                  onClick={() => window.open(imgUrl)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDocuments;
