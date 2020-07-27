import React, { useState } from "react";
import "./LoginPage.css";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toListPage, setToListPage] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const userLogin = {
        email,
        password
    }
    console.log(userLogin);
    setToListPage(true);
  };

  const onEmailChangehandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangehandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="my-login-container">
      <form className="form-signin" onSubmit={onSubmitHandler}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
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
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
      </form>
      {toListPage && <Redirect to={`/${email}/list`} />}
    </div>
  );
};

export default LoginPage;
