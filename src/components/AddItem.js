import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./AddItem.css";
import { useState } from "react";

const AddItem = (props) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onCancel = () => {
    setInputValue("");
    props.onSetAddModeOff();
  };

  const onAdd = () => {
    props.onAddItem(inputValue);
    setInputValue("");
    props.onSetAddModeOff();
  };

  let renderedContent = (
    <ListGroup.Item className="border-0">
      <Button onClick={props.onSetAddModeOn} variant="light">
        {props.buttonText || "New"}
      </Button>
    </ListGroup.Item>
  );

  if (props.isAddMode) {
    renderedContent = (
      <div>
        <ListGroup.Item className="border-0">
          <Form.Control
            className="border-0 bg-light"
            type="text"
            placeholder={props.placeholderText || "Enter item name."}
            onChange={onInputChange}
            value={inputValue}
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

export default AddItem;
