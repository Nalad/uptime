// @flow

import { requestLogout, receiveLogout } from "./actionCreators";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export function logoutUser() {
  return (dispatch: Function) => {
    dispatch(requestLogout());
    localStorage.removeItem("jwt_token");
    dispatch(receiveLogout());
  };
}
