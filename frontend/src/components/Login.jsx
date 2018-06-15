// @flow

import React from "react";

class Login extends React.Component<
  { handleLoginClick: Function },
  { creds: Credentials }
> {
  state = { creds: { username: "", password: "" } };

  handleFormChange = (
    event: SyntheticEvent<HTMLInputElement> & {
      currentTarget: HTMLInputElement
    },
    input: "username" | "password"
  ) => {
    const creds = Object.assign({}, this.state.creds, {
      [input]: event.currentTarget.value
    });
    this.setState({ creds });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Username"
          value={this.state.creds.username}
          onChange={event => this.handleFormChange(event, "username")}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.creds.password}
          onChange={event => this.handleFormChange(event, "password")}
        />
        <button
          onClick={event =>
            this.props.handleLoginClick(event, this.state.creds)
          }
        >
          Login
        </button>
      </div>
    );
  }
}

export default Login;
