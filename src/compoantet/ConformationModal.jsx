import React from "react";
import "./ConformationModal.css";

const ConformationModal = ({
  title,
  disc,
  onConfirm,
  onClose,
  confirmBtnText = "Confirm",
}) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <p>{disc}</p>

        <div className="modal-actions">
          <button type="button" className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>

          <button type="button" className="btn btn-delete" onClick={onConfirm}>
            {confirmBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConformationModal;
