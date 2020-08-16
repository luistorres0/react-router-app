import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./context/auth-context";
import MainNavigation from "./components/MainNavigation";
import UserListSelectionPage from "./pages/UserListSelectionPage";

function App() {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
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
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
