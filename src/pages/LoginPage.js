import React, { useState, useContext } from "react";
import "./LoginPage.css";
import { AuthContext } from "../context/auth-context";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorModal from "../components/ErrorModal";

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (isLoginMode) {
      try {
        const response = await fetch("http://localhost:5001/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        console.log(responseData);

        setIsLoading(false);

        // auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Please try again.");
        setShowErrorModal(true);
        console.log(err);
      }
    } else {
      try {
        const response = await fetch("http://localhost:5001/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);

        // auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Please try again.");
        setShowErrorModal(true);
        console.log(err);
      }
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
      <ErrorModal
        showModal={showErrorModal}
        errorMessage={error}
        hideModal={() => setShowErrorModal(false)}
      />
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
        {/* {toListPage && isAuthenticated && <Redirect to={`/${email}/list`} />} */}
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
