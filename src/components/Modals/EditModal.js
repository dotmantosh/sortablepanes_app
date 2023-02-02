import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const EditModal = ({ show, onEditClick, onCloseClick, initial_content }) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    setContent(initial_content);
  }, [initial_content]);
  return (
    <Modal isOpen={show} toggle={onCloseClick} className="fs-3" centered={true}>
      <ModalHeader toggle={onCloseClick}>Edit Resource</ModalHeader>
      <ModalBody className="py-3 px-5">
        <h3>Enter Content</h3>
        <div className="mt-2 text-center">
          <input
            type="text"
            className="form-control py-2 fs-4"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
          />
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-primary"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Close
          </button>
          <button
            type="button"
            className="btn w-sm btn-success"
            id="delete-record"
            onClick={() => {
              onEditClick(content);
            }}
          >
            Edit
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EditModal;
