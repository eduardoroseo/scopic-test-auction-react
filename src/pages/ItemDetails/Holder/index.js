import React from "react";
import { Row } from "reactstrap";

const Holder = ({ holder }) => {
  return holder ? (
    <Row className="justify-content-center mt-1"><small>Current buyer: {holder.name}</small></Row>
  ) : (
    ""
  );
};

export default Holder;
