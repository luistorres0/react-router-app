import React, { useContext } from "react";
import "./MainNavigation.css";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "./LoadingSpinner";
import ErrorModal from "./ErrorModal";

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

  console.log(auth.name);

  return (
    <div>
      <ErrorModal error={error} hideModal={clearError} />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to="/" className="navbar-brand">
          {auth.name ? "Welcome " + auth.name : "Todolist"}
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
      </nav>
      {isLoading && <LoadingSpinner asOverlay />}
    </div>
  );
};

export default MainNavigation;
