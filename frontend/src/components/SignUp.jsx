// @flow

import React from "react";

class SignUp extends React.Component<
  { handleSignUpClick: Function },
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
            this.props.handleSignUpClick(event, this.state.creds)
          }
        >
          Sign Up
        </button>
      </div>
    );
  }
}

export default SignUp;
