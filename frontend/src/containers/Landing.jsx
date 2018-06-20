// @flow

import React from "react";
import { connect } from "react-redux";
import type { RouterHistory } from "react-router-dom";
import { Row, Col, Menu, Spin, Alert } from "antd";
import { logoutUser } from "../actions";
import { loginUser, signUpUser } from "../asyncActions";
import Login from "../components/Login";
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

type State = {
  isLoginWindowVisible: boolean
};

class Landing extends React.Component<Props, State> {
  state = {
    isLoginWindowVisible: true
  };

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

  handleSelectClick = item => {
    if (item.key === "login") {
      this.setState({ isLoginWindowVisible: true });
    } else if (item.key === "signup") {
      this.setState({ isLoginWindowVisible: false });
    }
  };

  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="middle">
          <Col span={4}>
            <Menu
              mode="horizontal"
              onSelect={this.handleSelectClick}
              defaultSelectedKeys={["login"]}
            >
              <Menu.Item key="login">Log in</Menu.Item>
              <Menu.Item key="signup">Sign Up</Menu.Item>
            </Menu>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={4}>
            {this.state.isLoginWindowVisible && (
              <Login
                handleLoginClick={this.handleLoginClick}
                isFetching={this.props.isFetching}
              />
            )}
            {!this.state.isLoginWindowVisible && (
              <SignUp handleSignUpClick={this.handleSignUpClick} />
            )}
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={4}>
            <Row type="flex" justify="center" align="middle">
              {this.props.isFetching ? <Spin /> : ""}
              {this.props.errorMessage && (
                <Alert
                  message={this.props.errorMessage}
                  type="error"
                  showIcon
                />
              )}
            </Row>
          </Col>
        </Row>
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
