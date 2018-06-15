// @flow

import { combineReducers } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CHECKS_SUCCESS
} from "./asyncActions";
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./actions";

const chks = (state = { checks: [] }, action: Action) => {
  switch (action.type) {
    case CHECKS_SUCCESS: {
      return Object.assign({}, state, {
        checks: action.payload
      });
    }
    default:
      return state;
  }
};

const auth = (
  state = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem("jwt_token")
  },
  action: Action
) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.payload
      });
    }
    case LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ""
      });
    }
    case LOGIN_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload
      });
    }
    case LOGOUT_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      });
    }
    case SIGN_UP_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }
    case SIGN_UP_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: ""
      });
    }
    case SIGN_UP_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.payload
      });
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({ auth, chks });

export default rootReducer;
