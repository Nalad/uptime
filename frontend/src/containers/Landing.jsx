// @flow

import React from "react";
import { connect } from "react-redux";
import type { RouterHistory } from "react-router-dom";
import { logoutUser } from "../actions";
import { loginUser, signUpUser } from "../asyncActions";
import Login from "../components/Login";
import Logout from "../components/Logout";
import SignUp from "../components/SignUp";

type Props = {
  isFetching: boolean,
  isAuthenticated: boolean,
  errorMessage: string,
  login: Function,
  logout: Function,
  signUp: Function,
  history: RouterHistory
};

class Landing extends React.Component<Props> {
  componentDidUpdate() {
    if (this.props.isAuthenticated) this.props.history.push("/checks");
  }

  handleLoginClick = (
    event: SyntheticEvent<HTMLButtonElement>,
    creds: Credentials
  ) => {
    event.preventDefault();

    this.props.login(creds);
  };

  handleLogoutClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();

    this.props.logout();
  };

  handleSignUpClick = (
    event: SyntheticEvent<HTMLButtonElement>,
    creds: Credentials
  ) => {
    event.preventDefault();

    this.props.signUp(creds);
  };

  render() {
    return (
      <div>
        {!this.props.isAuthenticated && (
          <Login handleLoginClick={this.handleLoginClick} />
        )}
        {this.props.isAuthenticated && (
          <Logout handleLogoutClick={this.handleLogoutClick} />
        )}
        {!this.props.isAuthenticated && (
          <SignUp handleSignUpClick={this.handleSignUpClick} />
        )}
        <p>{this.props.isFetching ? "fetching" : "not fetching"}</p>
        <p>{this.props.errorMessage}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  const { isFetching, isAuthenticated, errorMessage } = auth;

  return {
    isFetching,
    isAuthenticated,
    errorMessage
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login(creds) {
    dispatch(loginUser(creds));
  },
  logout() {
    dispatch(logoutUser());
  },
  signUp(creds) {
    dispatch(signUpUser(creds));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
