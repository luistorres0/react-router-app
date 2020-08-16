import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./UserListSelectionPage.css";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorModal from "../components/ErrorModal";
import AddList from "../components/AddList";

const UserListSelectionPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedLists, setLoadingLists] = useState([]);
  const [error, setError] = useState("");
  const [isAddListMode, setIsAddListMode] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          "http://localhost:5001/api/lists/all/5f32c2104a1bb0580479b433" //3
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadingLists(responseData);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };

    sendRequest();
  }, []);

  const loadLists = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/lists/all/5f32c2104a1bb0580479b433" //3
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setLoadingLists(responseData);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  const onAdd = async (title) => {
    try {
      const response = await fetch("http://localhost:5001/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authorId: "5f32c2104a1bb0580479b433",
          title,
          list: [],
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      console.log(responseData);
    } catch (err) {
      console.log(err.message);
    }

    loadLists();
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
      <ErrorModal showModal={error} errorMessage={error} hideModal={() => setError("")} />
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
