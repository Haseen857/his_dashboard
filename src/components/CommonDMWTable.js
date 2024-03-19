import React from "react";
import { MDBDataTable } from "mdbreact";

const DatatablePregistrationtype = (prop) => {
  return <MDBDataTable striped bordered hover data={prop.data} searching={prop.searchOff ? false : true} displayEntries={prop.entriesOff ? false : true} />;
};

export default DatatablePregistrationtype;
