import React from "react";
import "./UserListPage.css";

const DUMMY_DATA = [
  {
    id: "1",
    email: "luffy@email.com",
    password: "meat",
    listItems: ["eat", "eat more", "make trouble"],
  },
  {
    id: "2",
    email: "nami@email.com",
    password: "money",
    listItems: ["read", "treasure hunt", "navigate"],
  },
  {
    id: "3",
    email: "zoro@email.com",
    password: "sleep",
    listItems: ["sleep", "train", "more sleep"],
  },
];

const UserListPage = () => {
  return (
    <div className="my-list-group-container">
      <h2>Today</h2>
      <ul className="list-group">
        {DUMMY_DATA[0].listItems.map((item, index) => {
          return (
            <li className="list-group-item" key={index}>
              {item}
            </li>
          );
        })}
        <li className="list-group-item">
          <input type="text" />
          <button className="btn btn-primary" type="submit">+</button>
        </li>
      </ul>
    </div>
  );
};

export default UserListPage;
