// @flow

import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import type { RouterHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import { logoutUser } from "../actions";
import { getChecks } from "../asyncActions";
import EditCheck from "../components/EditCheck";
import Header from "../components/Header";
import CheckInfo from "../components/CheckInfo";
import { getAuthorizationHeader } from "../Utilities";

const { Sider, Content } = Layout;

const postCheck = (check: Check) => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthorizationHeader()
  };

  axios({
    method: "POST",
    url: "http://localhost:8080/api/checks",
    data: check,
    headers
  });
};

const deleteCheck = (check: Check) => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthorizationHeader()
  };

  axios({
    method: "DELETE",
    url: "http://localhost:8080/api/checks",
    data: check,
    headers
  });
};

export type EditWindow = {
  name: string,
  uri: string,
  interval: number
};

type Props = {
  getData: Function,
  logout: Function,
  checks: Array<Check>,
  history: RouterHistory
};

type State = {
  selectedCheck: string
};

class ChecksContainer extends React.Component<Props, State> {
  state = {
    selectedCheck: ""
  };

  componentDidMount() {
    this.props.getData();
  }

  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  handleSelectCheck = (item: { key: string }) => {
    this.setState({ selectedCheck: item.key });
  };

  render() {
    const defaultCheck = this.props.checks.find(
      x => x.name === this.state.selectedCheck
    );

    return (
      <Layout>
        <Header handleLogout={this.handleLogout} />
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              style={{ height: "100%", borderRight: 0 }}
              onSelect={this.handleSelectCheck}
            >
              {this.props.checks.map(check => (
                <Menu.Item key={check.name}>{check.name}</Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout style={{ padding: "24px 24px" }}>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {defaultCheck ? (
                <CheckInfo
                  {...defaultCheck}
                  saveCheck={postCheck}
                  deleteCheck={deleteCheck}
                />
              ) : (
                ""
              )}
            </Content>
          </Layout>
        </Layout>
        <EditCheck
          mainVerb="Add"
          check={{ name: "", uri: "", interval: 30000 }}
          saveCheck={postCheck}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { chks } = state;
  const { checks } = chks;

  return {
    checks
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getData() {
    dispatch(getChecks());
  },
  logout() {
    dispatch(logoutUser());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChecksContainer);
