import React, { useContext } from "react";
import "./MainNavigation.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to="/" className="navbar-brand">
          Todolist
        </NavLink>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            {auth.isLoggedIn && (
              <button onClick={auth.logout} className="nav-link" href="#">
                Logout
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
