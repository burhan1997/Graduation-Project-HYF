import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>Terms and Conditions</h1>
        <p>
          Welcome to our Terms and Conditions page. Please read these terms and
          conditions carefully before using our service.
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
