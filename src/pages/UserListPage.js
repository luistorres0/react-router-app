import React from "react";
import { useParams } from "react-router-dom";
import "./UserListPage.css";
import DUMMY_DATA from "./dummydata.js";

const UserListPage = () => {
  const { email } = useParams();
  const foundUser = DUMMY_DATA.find((user) => user.email === email);
  let listContent = <h2>User Not Found</h2>;
  if (foundUser) {
    listContent = foundUser.listItems.map((item, index) => {
      return (
        <li className="list-group-item" key={index}>
          {item}
        </li>
      );
    });
  }
  console.log(DUMMY_DATA);
  return (
    <div className="my-list-group-container">
      <h2>Today</h2>
      <ul className="list-group">
        {listContent}
        <li className="list-group-item">
          <input type="text" />
          <button className="btn btn-primary" type="submit">
            +
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserListPage;
