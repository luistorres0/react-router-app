import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./context/auth-context";
import MainNavigation from "./components/MainNavigation";
import UserListSelectionPage from "./pages/UserListSelectionPage";
import { useEffect } from "react";

let logoutTimer;

function App() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setUserId(uid);
    setToken(token);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate.toISOString() })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  let routes;

  if (!token) {
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
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
