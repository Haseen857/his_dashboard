import React, { lazy } from "react";

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
// import "./Dashboard.css";

import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilGroup,
} from "@coreui/icons";

const Dashboard = () => {
  // const random = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // };

  // const progressExample = [
  //   { title: "Visits", value: "29.703 Users", percent: 40, color: "success" },
  //   { title: "Unique", value: "24.093 Users", percent: 20, color: "info" },
  //   {
  //     title: "Pageviews",
  //     value: "78.706 Views",
  //     percent: 60,
  //     color: "warning",
  //   },
  //   { title: "New Users", value: "22.123 Users", percent: 80, color: "danger" },
  //   {
  //     title: "Bounce Rate",
  //     value: "Average Rate",
  //     percent: 40.15,
  //     color: "primary",
  //   },
  // ];

  // const progressGroupExample1 = [
  //   { title: "Monday", value1: 34, value2: 78 },
  //   { title: "Tuesday", value1: 56, value2: 94 },
  //   { title: "Wednesday", value1: 12, value2: 67 },
  //   { title: "Thursday", value1: 43, value2: 91 },
  //   { title: "Friday", value1: 22, value2: 73 },
  //   { title: "Saturday", value1: 53, value2: 82 },
  //   { title: "Sunday", value1: 9, value2: 69 },
  // ];

  // const progressGroupExample2 = [
  //   { title: "Male", icon: cilUser, value: 53 },
  //   { title: "Female", icon: cilUserFemale, value: 43 },
  // ];

  // const progressGroupExample3 = [
  //   { title: "Organic Search", icon: cibGoogle, percent: 56, value: "191,235" },
  //   { title: "Facebook", icon: cibFacebook, percent: 15, value: "51,223" },
  //   { title: "Twitter", icon: cibTwitter, percent: 11, value: "37,564" },
  //   { title: "LinkedIn", icon: cibLinkedin, percent: 8, value: "27,319" },
  // ];

  // const tableExample = [
  // {
  //   avatar: { src: avatar1, status: "success" },
  //   user: {
  //     name: "Yiorgos Avraamu",
  //     new: true,
  //     registered: "Jan 1, 2021",
  //   },
  //   country: { name: "USA", flag: cifUs },
  //   usage: {
  //     value: 50,
  //     period: "Jun 11, 2021 - Jul 10, 2021",
  //     color: "success",
  //   },
  //   payment: { name: "Mastercard", icon: cibCcMastercard },
  //   activity: "10 sec ago",
  // },
  // {
  //   avatar: { src: avatar2, status: "danger" },
  //   user: {
  //     name: "Avram Tarasios",
  //     new: false,
  //     registered: "Jan 1, 2021",
  //   },
  //   country: { name: "Brazil", flag: cifBr },
  //   usage: {
  //     value: 22,
  //     period: "Jun 11, 2021 - Jul 10, 2021",
  //     color: "info",
  //   },
  //   payment: { name: "Visa", icon: cibCcVisa },
  //   activity: "5 minutes ago",
  // },
  // {
  //   avatar: { src: avatar3, status: "warning" },
  //   user: { name: "Quintin Ed", new: true, registered: "Jan 1, 2021" },
  //   country: { name: "India", flag: cifIn },
  //   usage: {
  //     value: 74,
  //     period: "Jun 11, 2021 - Jul 10, 2021",
  //     color: "warning",
  //   },
  //   payment: { name: "Stripe", icon: cibCcStripe },
  //   activity: "1 hour ago",
  // },
  // {
  //   avatar: { src: avatar4, status: "secondary" },
  //   user: { name: "Enéas Kwadwo", new: true, registered: "Jan 1, 2021" },
  //   country: { name: "France", flag: cifFr },
  //   usage: {
  //     value: 98,
  //     period: "Jun 11, 2021 - Jul 10, 2021",
  //     color: "danger",
  //   },
  //   payment: { name: "PayPal", icon: cibCcPaypal },
  //   activity: "Last month",
  // },
  // {
  //   avatar: { src: avatar5, status: "success" },
  //   user: {
  //     name: "Agapetus Tadeáš",
  //     new: true,
  //     registered: "Jan 1, 2021",
  //   },
  //   country: { name: "Spain", flag: cifEs },
  //   usage: {
  //     value: 22,
  //     period: "Jun 11, 2021 - Jul 10, 2021",
  //     color: "primary",
  //   },
  //   payment: { name: "Google Wallet", icon: cibCcApplePay },
  //   activity: "Last week",
  // },
  // {
  //   avatar: { src: avatar6, status: "danger" },
  //   user: {
  //     name: "Friderik Dávid",
  //     new: true,
  //     registered: "Jan 1, 2021",
  //   },
  //   country: { name: "Poland", flag: cifPl },
  //   usage: {
  //     value: 43,
  //     period: "Jun 11, 2021 - Jul 10, 2021",
  //     color: "success",
  //   },
  //   payment: { name: "Amex", icon: cibCcAmex },
  //   activity: "Last week",
  // },
  // ];

  return (
    <>
      <div className="sl-page-title">
        <h5 style={{ textAlign: 'center', fontSize: '30px', marginTop: '-20px', marginBottom: '10px', textTransform: "uppercase" , color:"#ffff"}}>Welcome to the Administrator Page</h5>
      </div>
      <div className="container">
        <div className="row  mg-t-20">
          <div className="col-md-6 ">
            <div className="card pd-20 pd-sm-40 first-card mt-4">
              <h6 className="card-body-title">User Statistics</h6>
              <p>
                A bar chart or bar graph is a chart with rectangular bars with
                lengths proportional to the values that they represent.
              </p>

              <div className="d-flex align-items-center justify-content-between">
                <h6 className="tx-inverse mg-b-0">
                  Total No. of Registered Users
                </h6>
                <h3 className="mg-b-0 tx-danger tx-lato tx-bold">35</h3>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between mg-t-20 bd-t pd-t-15">
                <div>
                  <span className="tx-11">Active Users</span>
                  <h6 className="tx-inverse mg-b-0">27 </h6>
                </div>
                <div>
                  <span className="tx-11">Pending Users</span>
                  <h6 className="tx-danger mg-b-0">8 </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="card pd-20 pd-sm-40 second-card mt-4">
              <h6 className="card-body-title">Order Statistics</h6>
              <p>
                The stacked charts are used when data sets have to be broken down
                into their constituents.
              </p>

              <div className="d-flex align-items-center justify-content-between">
                <h6 className="tx-inverse mg-b-0">Total No. of Orders</h6>
                <h3 className="mg-b-0 tx-danger tx-lato tx-bold">6</h3>
              </div>
              <hr />

              <div className="d-flex align-items-center justify-content-between mg-t-20 bd-t pd-t-15">
                <div>
                  <span className="tx-11">Total Products Order</span>
                  <h6 className="tx-danger mg-b-0">8 </h6>
                </div>
                <div>
                  <span className="tx-11">New Orders</span>
                  <h6 className="tx-danger mg-b-0">5 </h6>
                </div>
                <div>
                  <span className="tx-11">On-Going Orders</span>
                  <h6 className="tx-inverse mg-b-0">1 </h6>
                </div>

                <div>
                  <span className="tx-11">Completed Orders</span>
                  <h6 className="tx-inverse mg-b-0">0 </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <h6 className="card-title tx-uppercase tx-12 mg-b-0">USER REGISTERATION HISTORY</h6>
      <h6 className="card-title tx-uppercase tx-12 mg-b-0">PRODUCT ORDERS</h6> */}

      <CContainer >
        <CRow  className="mt-3">
          <CCol
             
            className="col-lg-6 "
          >
            <h4  style={{fontSize:"18px" , color:'#fff'}}>USER REGISTRATION HISTORY</h4>
          
          
            <CTable align="middle"responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" className="w-25"></CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="w-25">USER NAME</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="w-25">TYPE</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="w-25">REGISTRATION DATE</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">
                    <CIcon icon={cilGroup} size="xl" />
                  </CTableHeaderCell>
                  <CTableDataCell>
                    <a link="#" className="name-bold">
                      Raza
                    </a>
                  </CTableDataCell>

                  <CTableDataCell>
                    <span className="dot dot-warning"></span> Pending
                  </CTableDataCell>
                  <CTableDataCell>2021-10-09</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">
                    <CIcon icon={cilGroup} size="xl" />
                  </CTableHeaderCell>
                  <CTableDataCell>
                    <a href="#" className="name-bold">
                      Muhammad Jamal
                    </a>
                  </CTableDataCell>
                  <CTableDataCell>
                    <span className="dot dot-success"></span> active
                  </CTableDataCell>
                  <CTableDataCell>2021-09-04</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">
                    <CIcon icon={cilGroup} size="xl" />
                  </CTableHeaderCell>
                  <CTableDataCell>
                    <a href="#" className="name-bold">
                      Raza
                    </a>
                  </CTableDataCell>
                  <CTableDataCell>
                    <span className="dot dot-success"></span> active
                  </CTableDataCell>
                  <CTableDataCell>2021-08-31</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">
                    <CIcon icon={cilGroup} size="xl" />
                  </CTableHeaderCell>
                  <CTableDataCell>
                    <a href="#" className="name-bold">
                      dsfadffdsf
                    </a>
                  </CTableDataCell>
                  <CTableDataCell>
                    <span className="dot dot-warning"></span> Pending
                  </CTableDataCell>
                  <CTableDataCell>2021-07-31</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">
                    <CIcon icon={cilGroup} size="xl" />
                  </CTableHeaderCell>
                  <CTableDataCell>
                    <a href="#" className="name-bold">
                      Muhammad Jamal
                    </a>
                  </CTableDataCell>
                  <CTableDataCell>
                    <span className="dot dot-success"></span> active
                  </CTableDataCell>
                  <CTableDataCell>2021-07-31</CTableDataCell>
                </CTableRow>
               
              </CTableBody>
            </CTable>
            
          </CCol>
            
          
          
          <CCol  className="col-lg-6 ">
            <h4 style={{fontSize:"18px" , color:'#fff'}}>PRODUCT ORDERS</h4>
         
          <CTable align="middle"responsive >
     <CTableHead>
       <CTableRow>
                 <CTableHeaderCell scope="col" className="w-20">ORDER ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="w-20">ITEM DETAILS</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="w-20">USER</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="w-20">QUANTITY</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="w-20">DATE ORDER</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    <CTableRow>
      <CTableHeaderCell scope="row">1620726690</CTableHeaderCell>
      <CTableDataCell><span className="dot dot-warning"></span>New Order</CTableDataCell>
      <CTableDataCell>user</CTableDataCell>
      <CTableDataCell>1</CTableDataCell>
      <CTableDataCell>2021-05-11</CTableDataCell>
    </CTableRow>
    <CTableRow>
    <CTableHeaderCell scope="row">1620726690</CTableHeaderCell>
      <CTableDataCell><span className="dot dot-warning"></span>New Order</CTableDataCell>
      <CTableDataCell>user</CTableDataCell>
      <CTableDataCell>2</CTableDataCell>
      <CTableDataCell>2021-05-11</CTableDataCell>
    </CTableRow>
    <CTableRow>
    <CTableHeaderCell scope="row">1611431718</CTableHeaderCell>
      <CTableDataCell><span className="dot dot-warning"></span>New Order</CTableDataCell>
      <CTableDataCell>user</CTableDataCell>
      <CTableDataCell>2500</CTableDataCell>
      <CTableDataCell>2021-01-23</CTableDataCell>
    </CTableRow>
    <CTableRow>
    <CTableHeaderCell scope="row">1611430640</CTableHeaderCell>
      <CTableDataCell><span className="dot dot-warning"></span>New Order</CTableDataCell>
      <CTableDataCell>user</CTableDataCell>
      <CTableDataCell>50</CTableDataCell>
      <CTableDataCell>2021-01-23</CTableDataCell>
    </CTableRow>
    <CTableRow>
    <CTableHeaderCell scope="row">1611149176</CTableHeaderCell>
      <CTableDataCell><span className="dot dot-warning"></span>New Order</CTableDataCell>
      <CTableDataCell>user</CTableDataCell>
      <CTableDataCell>255</CTableDataCell>
      <CTableDataCell>2021-01-20</CTableDataCell>
    </CTableRow>
  </CTableBody>
 </CTable>
 </CCol>
  </CRow>
  <CRow>
    <CCol className="col-lg-6">
    <a href="#" className="line" style={{color:"#fff"}}>
              <i className="fa fa-angle-down mg-r-5" style={{color:"#fff"}}></i>View All Users</a>
    
    </CCol>
    <CCol className="col-lg-6">
    <div style={{ display: 'flex', justifyContent: 'end' }}>
              <a href="#" className="line" style={{color:"#fff"}}>
                <i className="fa fa-angle-down mg-r-5" ></i>View All Orders
              </a>
            </div>
    </CCol>
  </CRow>
  </CContainer>
     
           
          
        
          
         
      
    </>
  );
};

export default Dashboard;
