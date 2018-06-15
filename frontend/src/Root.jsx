// @flow

import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import store from "./store";
import Landing from "./containers/Landing";
import ChecksContainer from "./containers/ChecksContainer";

const FourOhFour = () => <h1>404</h1>;

const Root = () => (
  <Provider store={store}>
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/checks" component={ChecksContainer} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </Provider>
);

export default hot(module)(Root);
