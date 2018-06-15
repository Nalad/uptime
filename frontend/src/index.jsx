// @flow

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Root from "./Root";

const renderApp = () => {
  const app = document.getElementById("app");
  if (app === null) {
    throw new Error("Can't find 'app' in index.html");
  } else {
    render(
      <BrowserRouter>
        <Root />
      </BrowserRouter>,
      app
    );
  }
};

renderApp();
