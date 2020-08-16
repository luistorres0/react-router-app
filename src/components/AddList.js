import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./AddList.css";
import { useState } from "react";

const AddList = (props) => {
  const [title, setTitle] = useState("");

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onCancel = () => {
    setTitle("");
    props.onSetAddModeOff();
  };

  const onAdd = () => {
    props.onAddList(title);
    setTitle("");
    props.onSetAddModeOff();
  };

  let renderedContent = (
    <ListGroup.Item className="border-0">
      <Button onClick={props.onSetAddModeOn} variant="light">
        New List
      </Button>
    </ListGroup.Item>
  );

  if (props.isAddListMode) {
    renderedContent = (
      <div>
        <ListGroup.Item className="border-0">
          <Form.Control
            className="border-0 bg-light"
            type="text"
            placeholder="Enter a title"
            onChange={onTitleChange}
            value={title}
          ></Form.Control>
        </ListGroup.Item>
        <ListGroup.Item className="border-0">
          <Button onClick={onCancel} className="mx-1" variant="light">
            Cancel
          </Button>
          <Button onClick={onAdd} className="mx-1" variant="light">
            Add
          </Button>
        </ListGroup.Item>
      </div>
    );
  }

  return <div>{renderedContent}</div>;
};

export default AddList;
