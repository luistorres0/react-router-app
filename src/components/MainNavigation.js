import React, { useContext, useState } from "react";
import Navbar from "react-bootstrap/Navbar";

import "./MainNavigation.css";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "./LoadingSpinner";
import ErrorModal from "./ErrorModal";
import { Nav, NavDropdown, Button } from "react-bootstrap";
import Logo from "../assets/logo.png";

const MainNavigation = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isExpanded, setIsExpanded] = useState(false);

  const onDeleteAccount = async () => {
    setIsExpanded(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_API}/users/${auth.userId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      auth.logout();
    } catch (err) {}
  };

  const onHomeClicked = () => {
    setIsExpanded(false);
    history.push("/");
  };

  const onLogoutClicked = () => {
    setIsExpanded(false);
    auth.logout();
  };

  return (
    <div>
      <ErrorModal error={error} hideModal={clearError} />

      <Navbar expanded={isExpanded} bg="light" expand="lg">
        <NavLink to="/" className="navbar-brand">
          {/* Todolist */}
          <img src={Logo} alt="logo" />
        </NavLink>
        {auth.isLoggedIn && (
          <React.Fragment>
            <Navbar.Toggle
              onClick={() => setIsExpanded((prevState) => !prevState)}
              aria-controls="responsive-navbar-nav"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Button variant="light" type="button" onClick={onHomeClicked}>
                  Home
                </Button>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#" onClick={onDeleteAccount}>
                    Close Account
                  </NavDropdown.Item>
                </NavDropdown>
                <Button variant="light" type="button" onClick={onLogoutClicked}>
                  Logout
                </Button>
              </Nav>
            </Navbar.Collapse>
          </React.Fragment>
        )}
      </Navbar>

      {isLoading && <LoadingSpinner asOverlay />}
    </div>
  );
};

export default MainNavigation;
