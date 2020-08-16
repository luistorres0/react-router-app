import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./context/auth-context";
import MainNavigation from "./components/MainNavigation";
import { CurrentUserContext } from "./context/current-user-context";
import UserListSelectionPage from "./pages/UserListSelectionPage";

function App() {
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const setCurrentUserEmail = useCallback((email) => {
    setLoggedInUserEmail(email);
  }, []);

  let routes;

  if (!isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/auth" exact>
          <LoginPage />
        </Route>
        <Redirect to="/auth" exact />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <UserListSelectionPage />
        </Route>
        <Route path="/list/:listId" exact>
          <UserListPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUserEmail: loggedInUserEmail, setCurrentUserEmail: setCurrentUserEmail }}
    >
      <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </AuthContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
