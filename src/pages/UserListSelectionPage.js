import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useContext } from "react";
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
  const [loadedLists, setLoadingLists] = useState([]);
  const [isAddListMode, setIsAddListMode] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchLists = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5001/api/lists/all/${auth.userId}`
      );

      setLoadingLists(responseData);
    } catch (err) {}
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

  let listItems = <ListGroup.Item>Please create a list</ListGroup.Item>;
  if (!isLoading && loadedLists.length !== 0)
    listItems = loadedLists.map((list, index) => (
      <ListGroup.Item key={index} className="text-left">
        <span className="row px-3">
          {list.title}
          <button variant="light" className="ml-auto list-selection-page-delete">
            <span>x</span>
          </button>
        </span>
      </ListGroup.Item>
    ));

  return (
    <div className="list-selection-page-container">
      <ErrorModal showModal={error} errorMessage={error} hideModal={clearError} />
      {isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      <Card className="list-selection-page-list">
        <Card.Header>
          <h3>Your Lists</h3>
        </Card.Header>
        <ListGroup variant="flush">
          {listItems}
          <AddList
            isAddListMode={isAddListMode}
            onSetAddModeOff={() => setIsAddListMode(false)}
            onSetAddModeOn={() => setIsAddListMode(true)}
            onAddList={onAdd}
          />
        </ListGroup>
      </Card>{" "}
    </div>
  );
};

export default UserListSelectionPage;
