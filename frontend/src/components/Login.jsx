// @flow

import React from "react";
import { Form, Input, Button, Icon } from "antd";

const FormItem = Form.Item;

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
      <Form
        onSubmit={e => this.props.handleLoginClick(e, this.state.creds)}
        className="login-form"
      >
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
            value={this.state.creds.username}
            onChange={event => this.handleFormChange(event, "username")}
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            value={this.state.creds.password}
            onChange={event => this.handleFormChange(event, "password")}
          />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Login;
