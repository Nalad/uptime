// @flow

import React from "react";
// import { Link } from "react-router-dom";
import { Layout, Row, Col, Menu, Button } from "antd";

type Props = {
  handleLogout: Function
};

const Header = (props: Props) => (
  <Layout.Header>
    <Row>
      <Col span={22}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["checks"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="checks">Checks</Menu.Item>
        </Menu>
      </Col>
      <Col span={2}>
        <Button type="primary" onClick={props.handleLogout}>
          Logout
        </Button>
      </Col>
    </Row>
  </Layout.Header>
);

export default Header;
