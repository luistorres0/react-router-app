import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";

import "./MainNavigation.css";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "./LoadingSpinner";
import ErrorModal from "./ErrorModal";
import { Nav, NavDropdown, Button } from "react-bootstrap";

const MainNavigation = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const onDeleteAccount = async () => {
    try {
      await sendRequest(`http://localhost:5001/api/users/${auth.userId}`, "DELETE", null, {
        Authorization: "Bearer " + auth.token,
      });

      auth.logout();
    } catch (err) {}
  };

  return (
    <div>
      <ErrorModal error={error} hideModal={clearError} />
      <Navbar bg="light" expand="lg">
        <NavLink to="/" className="navbar-brand">
          Todolist
        </NavLink>
        {auth.isLoggedIn && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
        {auth.isLoggedIn && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button variant="light" type="button" onClick={() => history.push("/")}>
                Home
              </Button>
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="#" onClick={onDeleteAccount}>
                  Close Account
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="light" type="button" onClick={auth.logout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to="/" className="navbar-brand">
          Todolist
        </NavLink>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mx-1">
            {auth.isLoggedIn && (
              <button onClick={() => history.push("/")} className="btn btn-light">
                Home
              </button>
            )}
          </li>
          <li className="nav-item mx-1">
            {auth.isLoggedIn && (
              <button onClick={onDeleteAccount} className="btn btn-light">
                Delete Account
              </button>
            )}
          </li>
          <li className="nav-item mx-1">
            {auth.isLoggedIn && (
              <button onClick={auth.logout} className="btn btn-light">
                Logout
              </button>
            )}
          </li>
        </ul>
      </nav> */}
      {isLoading && <LoadingSpinner asOverlay />}
    </div>
  );
};

export default MainNavigation;
