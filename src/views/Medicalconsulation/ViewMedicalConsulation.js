
import DataTable from 'react-data-table-component';
import { MDBIcon } from 'mdbreact';


const customStyles = {
  rows: {
    style: {
      color: '#213f9a',
      fontSize: '13px',
    },
  },
  headCells: {
    style: {
      color: '#213f9a',
      fontSize: '16px',
      fontWeight: 800,
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
};



const columns = [
  {
    name: 'Hospital',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Degree',
    selector: row => row.year,
    sortable: true,
  },
  {
    name: 'Position',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Department',
    selector: row => row.year,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Mobile',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Phone',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Address',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Country',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'City',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Actions',
    selector: row => row.Actions,
    sortable: true,
  },
];


const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
    Actions: (
      <div style={{ display: "flex" }}>
        <a
          data-toggle="tooltip"
          title=""
          className="btn btn-xs btn-info tbl-btn-common tbl-btn-success titletip"
          title-tip="Edit"
        >
          <MDBIcon icon="edit" />
        </a>

        <a
          data-toggle="tooltip"
          title=""
          className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger titletip"
          title-tip="Delete"
          data-toggle="modal" data-target="#exampleModalCenter"
        >
          <MDBIcon icon="trash-alt" />
        </a>

      </div>
    )
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
    Actions: (
      <div style={{ display: "flex" }}>
        <a

          data-toggle="tooltip"
          title=""
          className="btn btn-xs btn-info tbl-btn-common tbl-btn-success titletip"
          title-tip="Edit"
        // onClick={redirect}
        >
          <MDBIcon icon="edit" />
        </a>

        <a
          data-toggle="tooltip"
          title=""
          className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger titletip"
          title-tip="Delete"
        // onClick={}
        >
          <MDBIcon icon="trash-alt" />
        </a>

      </div>
    )
  },

  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
    Actions: (
      <div style={{ display: "flex" }}>
        <a

          data-toggle="tooltip"
          title=""
          className="btn btn-xs btn-info tbl-btn-common tbl-btn-success titletip"
          title-tip="Edit"
        // onClick={redirect}
        >
          <MDBIcon icon="edit" />
        </a>

        <a
          data-toggle="tooltip"
          title=""
          className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger titletip"
          title-tip="Delete"
        // onClick={}
        >
          <MDBIcon icon="trash-alt" />
        </a>

      </div>
    )
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
    Actions: (
      <div style={{ display: "flex" }}>
        <a

          data-toggle="tooltip"
          title=""
          className="btn btn-xs btn-info tbl-btn-common tbl-btn-success titletip"
          title-tip="Edit"
        // onClick={redirect}
        >
          <MDBIcon icon="edit" />
        </a>

        <a
          data-toggle="tooltip"
          title=""
          className="btn btn-xs btn-info tbl-btn-common tbl-btn-danger titletip"
          title-tip="Delete"
        >
          <MDBIcon icon="trash-alt" />
        </a>

      </div>
    )
  },
]

function ViewMedicalConsulation() {
  const handleChange = ({ selectedRows }) => {
    console.log('Selected Rows: ', selectedRows);
  };


  return (
    <>
      <div className='row'>
        <div className='col-md-4'>
          <div class="wrap">
            <div class="search">
              <input type="text" class="searchTerm" placeholder="Search" />
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        pagination
        selectableRows
        onSelectedRowsChange={handleChange}
        customStyles={customStyles}
        persistTableHead
        subHeaderComponen
        subHeader
      />
    </>

  );
};


export default ViewMedicalConsulation