import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="/:email/list" exact>
            <UserListPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
