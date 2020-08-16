import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import "./UserListSelectionPage.css";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorModal from "../components/ErrorModal";
import AddList from "../components/AddList";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth-context";

const UserListSelectionPage = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [loadedLists, setLoadingLists] = useState([]);
  const [isAddListMode, setIsAddListMode] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchLists = useCallback(async () => {
    try {
      const responseData = await sendRequest(`http://localhost:5001/api/lists/all/${auth.userId}`);

      setLoadingLists(responseData);
    } catch (err) {
      setLoadingLists([]);
    }
  }, [sendRequest, auth.userId]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const onAdd = async (title) => {
    try {
      await sendRequest(
        "http://localhost:5001/api/lists",
        "POST",
        JSON.stringify({
          authorId: auth.userId,
          title,
          list: [],
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}

    fetchLists();
  };

  const onDelete = async (listId) => {
    try {
      await sendRequest(`http://localhost:5001/api/lists/${listId}`, "DELETE");
      fetchLists();
    } catch (err) {
      fetchLists();
    }
  };

  const onListSelect = async (listId) => {
    history.push(`/list/${listId}`);
  };

  const listItems = loadedLists.map((list) => (
    <ListGroup.Item key={list.id} className="text-left" onClick={() => onListSelect(list.id)}>
      <span className="row px-3">
        {list.title}
        <button
          type="button"
          onClick={() => onDelete(list.id)}
          variant="light"
          className="ml-auto list-selection-page-delete"
        >
          <span>x</span>
        </button>
      </span>
    </ListGroup.Item>
  ));

  let emptyListItem = (
    <ListGroup.Item>
      <em>Create a list.</em>
    </ListGroup.Item>
  );

  return (
    <div className="list-selection-page-container">
      <ErrorModal showModal={error} errorMessage={error} hideModal={clearError} />
      <Card className="list-selection-page-list">
        <Card.Header>
          <h3>Your Lists</h3>
        </Card.Header>
        <ListGroup variant="flush">
          {listItems}
          {listItems.length === 0 && emptyListItem}
          <AddList
            isAddListMode={isAddListMode}
            onSetAddModeOff={() => setIsAddListMode(false)}
            onSetAddModeOn={() => setIsAddListMode(true)}
            onAddList={onAdd}
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

export default UserListSelectionPage;
