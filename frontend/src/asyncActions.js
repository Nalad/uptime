// @flow

import axios from "axios";
import { getAuthorizationHeader } from "./Utilities";
import {
  requestLogin,
  receiveLogin,
  loginError,
  requestSignUp,
  receiveSignUp,
  signUpError,
  receiveChecks
} from "./actionCreators";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const CHECKS_REQUEST = "CHECKS_REQUEST";
export const CHECKS_SUCCESS = "CHECKS_SUCCESS";

export function loginUser(creds: Credentials) {
  return (dispatch: Function) => {
    dispatch(requestLogin(creds));

    axios({
      method: "POST",
      url: "http://localhost:8080/login",
      headers: { "Content-Type": "application/json" },
      data: { ...creds }
    })
      .then(response => {
        if (response.headers) {
          const jwtToken = response.headers.authorization.split(" ")[1];

          localStorage.setItem("jwt_token", jwtToken);
          dispatch(receiveLogin(jwtToken));
        }
      })
      .catch(error => {
        dispatch(loginError(error.response.data.message));
      });
  };
}

export function signUpUser(creds: Credentials) {
  return (dispatch: Function) => {
    dispatch(requestSignUp);

    axios({
      method: "POST",
      url: "http://localhost:8080/users/sign-up",
      headers: { "Content-Type": "application/json" },
      data: { ...creds }
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveSignUp());
          dispatch(loginUser(creds));
        } else if (response.status === 409) {
          dispatch(signUpError("Username already exists"));
        }
      })
      .catch(error => {
        switch (error.response.status) {
          case 409:
            dispatch(signUpError("Username already exists"));
            break;
          default:
            dispatch(signUpError(error.toString()));
        }
      });
  };
}

export function getChecks() {
  return (dispatch: Dispatch) => {
    const headers = {
      "Content-Type": "application/json",
      ...getAuthorizationHeader()
    };

    axios({
      method: "GET",
      url: "http://localhost:8080/api/checks",
      headers
    }).then(response => {
      if (response.status === 200) {
        dispatch(receiveChecks(response.data));
      }
      // else if (response.status === 409) {
      //   dispatch(signUpError("Username already exists"));
      // }
    });
  };
}
