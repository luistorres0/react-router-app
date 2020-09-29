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
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth-context";
import AddItem from "../components/AddItem";
import HeaderCard from "../components/HeaderCard";

const UserListSelectionPage = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [loadedLists, setLoadingLists] = useState([]);
  const [isAddListMode, setIsAddListMode] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchLists = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API}/lists/all/${auth.userId}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      setLoadingLists(responseData);
    } catch (err) {
      setLoadingLists([]);
    }
  }, [sendRequest, auth.userId, auth.token]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const onAdd = async (title) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_API}/lists`,
        "POST",
        JSON.stringify({
          authorId: auth.userId,
          title,
          list: [],
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}

    fetchLists();
  };

  const onDelete = async (listId) => {
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_API}/lists/${listId}`, "DELETE", null, {
        Authorization: "Bearer " + auth.token,
      });
      fetchLists();
    } catch (err) {
      fetchLists();
    }
  };

  const onListSelect = async (listId) => {
    history.push(`/list/${listId}`);
  };

  const listItems = loadedLists.map((list) => (
    <ListGroup.Item key={list.id} className="text-left">
      <div className="row px-3">
        <div className="col-10" onClick={() => onListSelect(list.id)}>
          {list.title}
        </div>
        <div className="col">
          <button
            type="button"
            onClick={() => onDelete(list.id)}
            variant="light"
            className="ml-auto border-0"
          >
            x
          </button>
        </div>
      </div>
    </ListGroup.Item>
  ));

  return (
    <div className="list-selection-page-container">
      <ErrorModal showModal={error} errorMessage={error} hideModal={clearError} />
      <HeaderCard />
      <Card className="list-selection-page-list">
        <Card.Header>
          <h4>Your Lists</h4>
        </Card.Header>
        <ListGroup variant="flush">
          {listItems}
          <AddItem
            isAddMode={isAddListMode}
            onSetAddModeOff={() => setIsAddListMode(false)}
            onSetAddModeOn={() => setIsAddListMode(true)}
            onAddItem={onAdd}
            buttonText="Create List"
            placeholderText="Enter the list's title."
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
