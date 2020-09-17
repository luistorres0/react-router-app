import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { AuthContext } from "./context/auth-context";
import MainNavigation from "./components/MainNavigation";
import { useAuth } from "./hooks/auth-hook";
import LoadingSpinner from "./components/LoadingSpinner";

const UserListPage = React.lazy(() => import("./pages/UserListPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const UserListSelectionPage = React.lazy(() => import("./pages/UserListSelectionPage"));

function App() {
  const { token, login, logout, userId, name } = useAuth();

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
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        name: name,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense fallback={<LoadingSpinner />}>{routes}</Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
