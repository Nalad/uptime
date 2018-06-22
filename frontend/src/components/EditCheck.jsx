// @flow

import React from "react";
import { Modal, Button, Input, Form } from "antd";

type FormData = {
  name: string,
  uri: string,
  interval: number
};

type Props = {
  mainVerb: string,
  check: FormData,
  saveCheck: Function
};

type State = {
  visible: boolean,
  check: FormData
};

class EditCheck extends React.Component<Props, State> {
  state = {
    visible: false,
    check: this.props.check
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleOk = () => {
    this.props.saveCheck(this.state.check);
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleChange = (
    event: SyntheticEvent<HTMLInputElement> & {
      currentTarget: HTMLInputElement
    },
    field: string
  ) => {
    const chk = Object.assign({}, this.state.check, {
      [field]: event.currentTarget.value
    });
    this.setState({ check: chk });
  };

  render() {
    return (
      <div style={{ display: "inline" }}>
        <Button onClick={this.showModal}>{this.props.mainVerb}</Button>
        <Modal
          title={`${this.props.mainVerb} Check`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="Name">
              <Input
                value={this.state.check.name}
                onChange={event => this.handleChange(event, "name")}
              />
            </Form.Item>
            <Form.Item label="URI">
              <Input
                value={this.state.check.uri}
                onChange={event => this.handleChange(event, "uri")}
              />
            </Form.Item>
            <Form.Item label="Interval">
              <Input
                value={this.state.check.interval}
                onChange={event => this.handleChange(event, "interval")}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default EditCheck;
