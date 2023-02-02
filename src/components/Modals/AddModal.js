import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const AddModal = ({ show, onAddClick, onCloseClick }) => {
  const [content, setContent] = useState("");
  const [height, setHeight] = useState(100);

  const [contentArr, setContentArr] = useState([
    {
      content: "001",
      width: 33.333,
      height: 100,
    },
    {
      content: "002",
      width: 33.333,
      height: 100,
    },
    {
      content: "003",
      width: 33.333,
      height: 100,
    },
  ]);

  const add = () => {
    if (!content.length) {
      return alert("Pls add content");
    }
    contentArr.push({
      height,
      width: 33.333,
      content,
    });
    setContent("");
    setHeight(100);
  };
  return (
    <Modal isOpen={show} toggle={onCloseClick} className="fs-3" centered={true}>
      <ModalHeader toggle={onCloseClick}>Edit Resource</ModalHeader>
      <ModalBody className="py-3 px-5">
        <h3>Enter Content</h3>
        {/* <div className="my-4 pb-4 text-center">
          <div className="form-group">
            <label style={{ color: "#000" }} htmlFor="">
              Content
            </label>
            <input
              type="text"
              className="form-control py-2 fs-4"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              value={content}
            />
          </div>
          <div className="form-group mt-4">
            <label style={{ color: "#000" }} htmlFor="">
              Width
            </label>
            <input
              type="number"
              className="form-control py-2 fs-4"
              onChange={(e) => {
                setHeight(e.target.value);
              }}
              value={height}
            />
          </div>
          <button className="btn btn-sm btn-success" onClick={add}>
            Add
          </button>
        </div> */}
        <div className="list text-center">
          {contentArr.map((item, i) => (
            <p key={i} style={{ color: "#000" }}>
              {i}. {item.content}, width: {item.width}
            </p>
          ))}
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn btn-success btn-lg"
            id="delete-record"
            onClick={() => {
              onAddClick(contentArr);
            }}
          >
            Add Pane Group
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddModal;
