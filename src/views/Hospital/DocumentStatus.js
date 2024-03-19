import DataTable from "react-data-table-component";
import { MDBIcon } from "mdbreact";
import isLoggedIn from "src/common/auth";

const customStyles = {
  rows: {
    style: {
      color: "#213f9a",
      fontSize: "13px",
    },
  },
  headCells: {
    style: {
      color: "#213f9a",
      fontSize: "16px",
      fontWeight: 800,
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
};

const columns = [
  {
    name: "S.No.",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.title,
    sortable: true,
  },

  {
    name: "Actions",
    selector: (row) => row.Actions,
    sortable: true,
  },
];

console.log(
  isLoggedIn.submited,
  isLoggedIn.check,
  isLoggedIn.verified,
  isLoggedIn.updateddoc
);

const data = [
  {
    id: 1,
    title: "Document Submitted",
    // year: "1988",
    Actions: <h6> {isLoggedIn.submited ? "Yes (✔)" : "No (❌)"}</h6>,
  },
  {
    id: 2,
    title: "Document Checked",
    // year: "1984",
    Actions:
      isLoggedIn.check && isLoggedIn.updateddoc ? (
        <h6>{isLoggedIn.updateddoc ? "Pending (⏳)" : "No (❌)"}</h6>
      ) : (
        <h6>{isLoggedIn.check ? "Yes (✔)" : "No (❌)"}</h6>
      ),
  },

  isLoggedIn.updateddoc
    ? {
        id: 3,
        title: "Document Verified",
        // year: "1984",
        Actions: (
          <h6>
            {isLoggedIn.updateddoc || !isLoggedIn.verified
              ? "Updated Documents (✔)"
              : isLoggedIn.verified
              ? "Verified (✔ )"
              : "Rejected (❌) "}
          </h6>
        ),
      }
    : {
        id: 3,
        title: "Document Verified",
        // year: "1984",
        Actions: (
          <h6>
            {isLoggedIn.check == false || isLoggedIn.check == undefined
              ? "Not yet Checked"
              : isLoggedIn.verified
              ? "Verified (✔ )"
              : "Rejected (❌) "}
          </h6>
        ),
      },
  isLoggedIn.updateddoc
    ? {
        id: 4,
        title: "Documents Updated",
        // year: "1984",
        Actions: <h6>{isLoggedIn.updateddoc ? "Yes (✔)" : "No (❌)"}</h6>,
      }
    : "",
];

function DocumentStatus(props) {
  const handleChange = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);
  };

  const updatedoc = () => {
    props.history.push("/updatedocuments");
  };

  return (
    <>
      <div className="form-header">
        <h5 className="lineformtitle">Document Status</h5>
      </div>
      <DataTable
        columns={columns}
        data={data}
        // pagination

        // onSelectedRowsChange={handleChange}
        customStyles={customStyles}
        // persistTableHead
        subHeaderComponen
        subHeader
      />
      <br />

      <div
        style={{
          background: "#fff",
          height: "88px",
          padding: "20px",
          borderRadius: "30px",
          textAlign: "center",
        }}
      >
        <h4>Reason of Rejection</h4>
        <h5>
          {isLoggedIn.reason
            ? `${isLoggedIn.reason}`
            : "Reason Not Mentioned , Contact Administration"}
        </h5>
      </div>
      <br />
      <br />
      {!isLoggedIn.check ? (
        <div></div>
      ) : (
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <button
            className="correctionbutton"
            type="submit"
            onClick={updatedoc}
            disabled={!isLoggedIn.check ? true : false}
          >
            Update Documents
          </button>
        </div>
      )}
    </>
  );
}

export default DocumentStatus;
