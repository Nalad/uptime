// @flow

import React from "react";

const Logout = (props: { handleLogoutClick: Function }) => (
  <button onClick={props.handleLogoutClick}>Logout</button>
);

export default Logout;
