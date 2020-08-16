import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import "./LoginPage.css";
import { AuthContext } from "../context/auth-context";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorModal from "../components/ErrorModal";
import { useHttpClient } from "../hooks/http-hook";

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [toListSelectionPage, setToListSelectionPage] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        await sendRequest(
          "http://localhost:5001/api/users/login",
          "POST",
          JSON.stringify({
            email: email,
            password: password,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        setToListSelectionPage(true);
        auth.login();
      } catch (err) {}
    } else {
      try {
        await sendRequest(
          "http://localhost:5001/api/users/signup",
          "POST",
          JSON.stringify({
            email: email,
            password: password,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        setToListSelectionPage(true);
        auth.login();
      } catch (err) {}
    }
  };

  const onEmailChangehandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangehandler = (event) => {
    setPassword(event.target.value);
  };

  const switchModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  const prompt = isLoginMode ? "in" : "up";

  return (
    <React.Fragment>
      <ErrorModal error={error} hideModal={clearError} />
      <div className="my-login-container">
        {isLoading && <LoadingSpinner asOverlay />}

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
            {isLoginMode ? "Login" : "Register"}
          </button>

          <button
            className="btn btn-lg btn-outline-primary btn-block"
            type="button"
            onClick={switchModeHandler}
          >
            {isLoginMode ? "Create Account" : "Go to Login"}
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
        </form>
        {toListSelectionPage && <Redirect to={"/"} />}
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
