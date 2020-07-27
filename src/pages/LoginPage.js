import React, { useState } from "react";
import "./LoginPage.css";
import { Route, Redirect } from "react-router-dom";
import DUMMY_DATA from "./dummydata";
import UserListPage from "./UserListPage";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toListPage, setToListPage] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!isSigningUp) {
      let foundUser = DUMMY_DATA.find((user) => user.email === email);
      if(foundUser) {
          setIsAuthenticated(true);
          setToListPage(true);
      } else {
          setIsSigningUp(true);
      }
    } else {
        let newAccount = {
            id: Math.random().toString(),
            email: email,
            password: password,
            listItems: []
        }
        DUMMY_DATA.push(newAccount);
        setIsAuthenticated(true);
        setToListPage(true);
    }
  };

  const onEmailChangehandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangehandler = (event) => {
    setPassword(event.target.value);
  };

  const prompt = isSigningUp ? "up" : "in";

  return (
    <div className="my-login-container">
      <form className="form-signin" onSubmit={onSubmitHandler}>
        <h1 className="h3 mb-3 font-weight-normal">{"Please Sign " + prompt}</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
          onChange={onEmailChangehandler}
          value={email}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          onChange={onPasswordChangehandler}
          value={password}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
        {"Sign " + prompt}
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
      </form>
      {toListPage && isAuthenticated && <Redirect to={`/${email}/list`} />}
    </div>
  );
};

export default LoginPage;
