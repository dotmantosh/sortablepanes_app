import React, { useState, useEffect } from "react";
import { SortablePane, Pane } from "react-sortable-pane";
import {
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import AddModal from "./Modals/AddModal";
import DeleteModal from "./Modals/DeleteModal";
import EditModal from "./Modals/EditModal";
import DataService from "../services/DataService";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import FileDownload from "js-file-download";

function Example() {
  const [downloading, setDownloading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [clickedPaneId, setClickedPaneId] = useState("");
  const [clickedOrderIndex, setClickedOrderIndex] = useState(0);

  const [initialContent, setInitialContent] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await DataService.getData();
    setData(res.data);
  };

  const load = () => {
    getData();
    alert("Data Loaded Successfully");
  };

  const paneStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    textAlign: "center",
    padding: "0px 0px",
  };
  const textStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff",
  };

  // Function takes in array of Object.keys() of pane in group and index of the group
  // Returns a list of Pane components
  const getPanes = (pane) => {
    const paneObjArr = Object.keys(pane);
    const orderIndex = paneObjArr.indexOf("order");
    const idIndex = paneObjArr.indexOf("id");
    paneObjArr.splice(orderIndex);
    paneObjArr.splice(idIndex);

    return paneObjArr.map((item, indexOfOrder) => (
      <Pane
        key={indexOfOrder}
        size={{
          width: pane[item].width + "%",
          height: "100%",
        }}
        style={{
          ...paneStyle,
          backgroundColor: pane[item].color,
        }}
        resizable={{ x: true, y: false, xy: false }}
      >
        <div>
          <div className="pane-div">
            <UncontrolledDropdown>
              <DropdownToggle caret color="dark"></DropdownToggle>
              <DropdownMenu dark>
                <DropdownItem
                  onClick={() => {
                    duplicate(pane.id, item, pane[item].content);
                  }}
                >
                  Duplicate
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    handleEditClick(
                      pane.id,
                      indexOfOrder,
                      pane[indexOfOrder].content
                    );
                  }}
                >
                  Edit
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    handleDeleteClick(pane.id, indexOfOrder);
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>

          <p className="mb-0" style={textStyle}>
            {pane[item].content}
          </p>
        </div>
      </Pane>
    ));
  };

  // function runs when the order of the panes is changed
  const onOrderChange = (order, index) => {
    let newData = data;
    newData = newData.map((item, i) => {
      if (index === i) {
        item.order = order;
      }
      return item;
    });
    setData(newData);
  };

  const save = async () => {
    const res = await DataService.addNewPaneGroup(data);
    setData(res.data);
    alert("Data saved succfully");
  };

  const handleAddClick = () => {
    setAddModal(!addModal);
  };

  const duplicate = async (paneId, indexOfOrder) => {
    const res = await DataService.duplicatePane(paneId, indexOfOrder);
    setData(res.data);
  };
  const handleEditClick = (paneId, indexOfOrder, payload) => {
    setClickedPaneId(paneId);
    setClickedOrderIndex(indexOfOrder);
    setEditModal(!editModal);
    setInitialContent(payload);
  };
  const handleDeleteClick = (paneId, indexOfOrder) => {
    setClickedPaneId(paneId);
    setClickedOrderIndex(indexOfOrder);
    setDeleteModal(!deleteModal);
  };

  const onDeletClick = () => {
    const newData = data;
    const pane = newData.find((item) => item.id === clickedPaneId);
    const key = pane.order.splice(clickedOrderIndex, 1);
    delete pane[key[0]];
    setDeleteModal(!deleteModal);
  };
  const onEditClick = (content) => {
    const newData = data;
    const pane = newData.find((item) => item.id === clickedPaneId);
    pane[clickedOrderIndex].content = content;
    setEditModal(!editModal);
  };
  const onAddClick = (group) => {
    const groupOrder = group.map((item, i) => i.toString());
    const groupPanes = {};
    group.forEach((item, i) => {
      groupPanes[i] = item;
    });
    groupPanes.order = groupOrder;
    groupPanes.id = uuidv4();
    setAddModal(!addModal);
    data.push(groupPanes);
    window.scrollTo(0, document.body.scrollHeight);
  };

  const onCloseClick = () => {
    setDeleteModal(!deleteModal);
  };

  const download = async () => {
    try {
      /* const baseUrl = process.env.REACT_APP_BASE_URL */
      const baseUrl = process.env.REACT_APP_BASE_URL_PROD;
      setDownloading(true);
      const response = await axios({
        url: `${baseUrl}/api/data/download`,
        method: "GET",
        responseType: "blob", // Important
      });
      await FileDownload(response.data, "pane.json");
      setDownloading(false);
    } catch (error) {
      console.log(error);
      setDownloading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end align-items-center gap-3 me-4">
        <Button
          onClick={download}
          disabled={downloading}
          className="btn btn-lg btn-dark"
        >
          Download JSON
        </Button>
        <Button onClick={save} className="btn btn-lg btn-success">
          Save
        </Button>
        <Button onClick={load} className="btn btn-lg btn-light">
          Load
        </Button>
        <Button onClick={handleAddClick} className="btn btn-lg btn-info">
          Add
        </Button>
      </div>
      <div
        className="pane-div d-flex align-items-center justfy-content-between"
        style={{ padding: "50px 20px" }}
      >
        {data.map((pane, index) => (
          <div
            key={index}
            style={{
              width: "300px",
              height: "300px",
            }}
          >
            <p className="text-center" style={textStyle}>
              Group {index + 1}
            </p>
            <SortablePane
              direction="horizontal"
              margin={20}
              order={pane.order}
              onOrderChange={(item) => {
                onOrderChange(item, index);
              }}
              onResizeStop={(e, key, dir, ref, d) => {
                const newState = data;
                newState[index][key.toString()].width =
                  newState[index][key.toString()].width + d.width;
                console.log(d);
                /* setData(newState); */
              }}
            >
              {getPanes(pane)}
            </SortablePane>
          </div>

          /* <Col key={index} md={4}>
              </Col> */
        ))}
      </div>
      <DeleteModal
        onDeleteClick={onDeletClick}
        onCloseClick={onCloseClick}
        show={deleteModal}
      />
      <EditModal
        show={editModal}
        onEditClick={onEditClick}
        onCloseClick={() => {
          setEditModal(!editModal);
        }}
        initial_content={initialContent}
      />
      <AddModal
        show={addModal}
        onAddClick={onAddClick}
        onCloseClick={() => {
          setAddModal(!addModal);
        }}
      />
    </>
  );
}

export default Example;
