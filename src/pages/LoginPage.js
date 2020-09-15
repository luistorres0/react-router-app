import React, { useState, useContext } from "react";

import "./LoginPage.css";
import { AuthContext } from "../context/auth-context";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorModal from "../components/ErrorModal";
import { useHttpClient } from "../hooks/http-hook";
import { useReducer } from "react";
import {
  validate,
  VALIDATOR_REQUIRED,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../utils/validation";

const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      const currentInputIsValid = validate(action.value, action.validators);
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (inputId === action.id) {
          formIsValid = formIsValid && currentInputIsValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {
            ...state.inputs[action.id],
            value: action.value,
            isValid: currentInputIsValid,
          },
        },
        isValid: formIsValid,
      };

    case "TOUCH":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {
            ...state.inputs[action.id],
            isTouched: true,
          },
        },
      };

    default:
      return state;
  }
};

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, formDispatch] = useReducer(formReducer, {
    inputs: {
      name: {
        value: "",
        isValid: false,
        isTouched: false,
      },
      email: {
        value: "",
        isValid: false,
        isTouched: false,
      },
      password: {
        value: "",
        isValid: false,
        isTouched: false,
      },
    },
    isValid: false,
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5001/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.name, responseData.token);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5001/api/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.name, responseData.token);
      } catch (err) {}
    }
  };

  const changeHandler = (event) => {
    let inputValidators;
    let changedInput = event.target.id;

    if (changedInput === "name") {
      inputValidators = [VALIDATOR_REQUIRED()];
    } else if (changedInput === "email") {
      inputValidators = [VALIDATOR_EMAIL()];
    } else if (changedInput === "password") {
      inputValidators = [VALIDATOR_MINLENGTH(6)];
    }

    formDispatch({
      type: "CHANGE",
      id: event.target.id,
      value: event.target.value,
      validators: inputValidators,
    });
  };

  const touchHandler = (event) => {
    formDispatch({
      type: "TOUCH",
      id: event.target.id,
    });
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
          {!isLoginMode && (
            <React.Fragment>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`form-control ${
                  !formState.inputs.name.isValid && formState.inputs.name.isTouched && "not-valid"
                }`}
                placeholder="Name"
                required
                onBlur={touchHandler}
                onChange={changeHandler}
                value={formState.inputs.name.value}
              />
              {!formState.inputs.name.isValid && formState.inputs.name.isTouched && (
                <p className="errorText">Please enter a name.</p>
              )}
            </React.Fragment>
          )}

          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className={`form-control ${
              !isLoginMode && !formState.inputs.email.isValid && formState.inputs.email.isTouched && "not-valid"
            }`}
            placeholder="Email address"
            required
            autoFocus
            onBlur={touchHandler}
            onChange={changeHandler}
            value={formState.inputs.email.value}
          />
          {!isLoginMode && !formState.inputs.email.isValid && formState.inputs.email.isTouched && (
            <p className="errorText">Please enter a valid email.</p>
          )}

          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`form-control ${!isLoginMode &&
              !formState.inputs.password.isValid &&
              formState.inputs.password.isTouched &&
              "not-valid"
            }`}
            placeholder={"Password" + (!isLoginMode ? " (at least 6 characters)" : "")}
            required
            onBlur={touchHandler}
            onChange={changeHandler}
            value={formState.inputs.password.value}
          />
          {!isLoginMode &&
            !formState.inputs.password.isValid &&
            formState.inputs.password.isTouched && (
              <p className="errorText">Please enter a valid password. (At least 6 characters)</p>
            )}

          <button
            disabled={!isLoginMode && !formState.isValid}
            className="btn btn-lg btn-dark btn-block"
            type="submit"
          >
            {isLoginMode ? "Login" : "Register"}
          </button>

          <button
            className="btn btn-lg btn-outline-dark btn-block"
            type="button"
            onClick={switchModeHandler}
          >
            {isLoginMode ? "Create Account" : "Go to Login"}
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
        </form>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
