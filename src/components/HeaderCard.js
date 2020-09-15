import React, { useContext } from "react";

import "./HeaderCard.css";
import { AuthContext } from "../context/auth-context";
import Card from "react-bootstrap/Card";

const HeaderCard = (props) => {
  const auth = useContext(AuthContext);
  const date = new Date().toLocaleDateString();

  return (
    <div className="header-card-container">
      <Card className="header-card">
      <h3>Hi, {auth.name}</h3>
      <p>{date}</p>
      </Card>
    </div>
  );
};

export default HeaderCard;
