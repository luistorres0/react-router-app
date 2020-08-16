import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {v4 as uuidv4} from "uuid";

import "./UserListPage.css";
import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/ErrorModal";
import LoadingSpinner from "../components/LoadingSpinner";
import AddItem from "../components/AddItem";

const UserListPage = () => {
  const { listId } = useParams();
  const [todoList, setTodoList] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isAddMode, setIsAddMode] = useState(false);

  const fetchList = useCallback(async () => {
    try {
      const responseData = await sendRequest(`http://localhost:5001/api/lists/${listId}`);

      setTodoList(responseData);
    } catch (err) {
      setTodoList(null);
    }
  }, [sendRequest, listId]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  let listItems = [];
  if (todoList) {
    listItems = todoList.list.map((item, index) => (
      <ListGroup.Item key={uuidv4()} className="text-left">
      <span className="row px-3">
        {item}
        <button
          type="button"
          // onClick={() => onDelete(item)}
          variant="light"
          className="ml-auto list-selection-page-delete"
        >
          <span>x</span>
        </button>
      </span>
    </ListGroup.Item>
    ));

    if (listItems.length === 0) {
      listItems = (
        <ListGroup.Item>
          <em>Create task.</em>
        </ListGroup.Item>
      );
    }
  }

  const onAdd = async (newItem) => {
    const newList = [...todoList.list, newItem];

    try {
      await sendRequest(
        `http://localhost:5001/api/lists/${listId}`,
        "PATCH",
        JSON.stringify({
          newList,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}

    fetchList();
  };

  return (
    <div className="list-page-container">
      <ErrorModal showModal={error} errorMessage={error} hideModal={clearError} />
      <Card className="list-page-list">
        <Card.Header>
          <h3>{todoList ? todoList.title : "Title"}</h3>
        </Card.Header>
        <ListGroup variant="flush">
          {listItems}
          <AddItem
            isAddMode={isAddMode}
            onSetAddModeOff={() => setIsAddMode(false)}
            onSetAddModeOn={() => setIsAddMode(true)}
            onAddItem={onAdd}
            buttonText="New Todo"
            placeholderText="Enter a new Todo."
          />
        </ListGroup>
        {isLoading && (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserListPage;
