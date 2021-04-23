import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ConfigPage from "../pages/Config";
import HomePage from "../pages/Home";

export default function PrivateRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/configs" component={ConfigPage} />
      </Switch>
    </Router>
  );
}
