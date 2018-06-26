// @flow

import { combineReducers } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CHECKS_SUCCESS,
  CHECK_ADD_REQUEST,
  CHECK_ADD_SUCCESS,
  CHECK_ADD_FAILURE
} from "./asyncActions";
import { LOGOUT_REQUEST, LOGOUT_SUCCESS, CLEAN_CHECKS } from "./actions";

const chks = (
  state = {
    checks: [],
    isFetching: false,
    errorMessage: "",
    lastRefresh: -1
  },
  action: Action
) => {
  switch (action.type) {
    case CHECKS_SUCCESS: {
      return {
        ...state,
        checks: action.payload,
        lastRefresh: new Date().getTime()
      };
    }
    case CHECK_ADD_REQUEST: {
      return {
        ...state,
        isFetching: true,
        errorMessage: ""
      };
    }
    case CHECK_ADD_SUCCESS: {
      return {
        ...state,
        isFetching: false
      };
    }
    case CHECK_ADD_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    }
    case CLEAN_CHECKS: {
      return {
        ...state,
        checks: []
      };
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
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: "",
        user: action.payload
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ""
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isFetching: true,
        errorMessage: ""
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        errorMessage: ""
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({ auth, chks });

export default rootReducer;
