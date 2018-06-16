// @flow

import React from "react";
import { Link } from "react-router-dom";

type Props = {
  handleLogout: Function
};

const Header = (props: Props) => (
  <div>
    <Link to="/checks">Checks</Link>
    <button onClick={() => props.handleLogout()}>Logout</button>
  </div>
);

export default Header;
