// @flow

import { requestLogout, receiveLogout, cleanChecks } from "./actionCreators";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const CLEAN_CHECKS = "CLEAN_CHECKS";

export function logoutUser() {
  return (dispatch: Function) => {
    dispatch(requestLogout());
    dispatch(cleanChecks());
    localStorage.removeItem("jwt_token");
    dispatch(receiveLogout());
  };
}
