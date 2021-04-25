import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const FeedbackMessage = ({ message, type, show, onConfirm }) => {

  return (
    <SweetAlert
      show={show}
      title={type === "success" ? "Success" : "Warning"}
      type={type === "" ? "default" : type}
      onConfirm={onConfirm}
    >
      {message}
    </SweetAlert>
  );
};

export default FeedbackMessage;
