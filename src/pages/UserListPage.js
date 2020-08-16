import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import "./UserListPage.css";
import { useState } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../components/ErrorModal";
import LoadingSpinner from "../components/LoadingSpinner";

const UserListPage = () => {
  const { listId } = useParams();
  const [todoList, setTodoList] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
      <ListGroup.Item key={index}>{item}</ListGroup.Item>
    ));
    if (listItems.length === 0) {
      listItems = (
        <ListGroup.Item>
          <em>Create task.</em>
        </ListGroup.Item>
      );
    }
  }

  return (
    <div className="list-page-container">
      <ErrorModal showModal={error} errorMessage={error} hideModal={clearError} />
      <Card className="list-page-list">
        <Card.Header>
          <h3>{todoList ? todoList.title : "Title"}</h3>
        </Card.Header>
        <ListGroup variant="flush">
          {listItems}
          <ListGroup.Item>
            <Button variant="light">Add</Button>
          </ListGroup.Item>
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
