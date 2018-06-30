// @flow
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CHECKS_REQUEST,
  CHECKS_SUCCESS,
  CHECK_ADD_REQUEST,
  CHECK_ADD_SUCCESS,
  CHECK_ADD_FAILURE,
  CHECK_DELETE_REQUEST,
  CHECK_DELETE_SUCCESS,
  CHECK_DELETE_FAILURE
} from "./asyncActions";

import { LOGOUT_REQUEST, LOGOUT_SUCCESS, CLEAN_CHECKS } from "./actions";

export function requestLogin(creds: Credentials) {
  return {
    type: LOGIN_REQUEST,
    payload: creds
  };
}

export function receiveLogin(jwtToken: string) {
  return {
    type: LOGIN_SUCCESS,
    payload: jwtToken
  };
}

export function loginError(message: string) {
  return {
    type: LOGIN_FAILURE,
    payload: message
  };
}

export function requestLogout() {
  return {
    type: LOGOUT_REQUEST
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function requestSignUp() {
  return {
    type: SIGN_UP_REQUEST
  };
}

export function receiveSignUp() {
  return {
    type: SIGN_UP_SUCCESS
  };
}

export function signUpError(message: string) {
  return {
    type: SIGN_UP_FAILURE,
    payload: message
  };
}

export function requestChecks() {
  return {
    type: CHECKS_REQUEST
  };
}

export function receiveChecks(checksData: Array<Check>) {
  return {
    type: CHECKS_SUCCESS,
    payload: checksData
  };
}

export function cleanChecks() {
  return {
    type: CLEAN_CHECKS
  };
}

export function requestAddCheck() {
  return {
    type: CHECK_ADD_REQUEST
  };
}

export function successAddCheck() {
  return {
    type: CHECK_ADD_SUCCESS
  };
}

export function failureAddCheck(message: string) {
  return {
    type: CHECK_ADD_FAILURE,
    payload: message
  };
}

export function requestDeleteCheck() {
  return {
    type: CHECK_DELETE_REQUEST
  };
}

export function successDeleteCheck(checkName: string) {
  return {
    type: CHECK_DELETE_SUCCESS,
    payload: checkName
  };
}

export function failureDeleteCheck(message: string) {
  return {
    type: CHECK_DELETE_FAILURE,
    payload: message
  };
}
